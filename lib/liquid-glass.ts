/**
 * Liquid Glass Effect Library
 * Based on Snell's Law refraction physics
 * Credit: Chris @ kube.io/blog/liquid-glass-css-svg/
 */

// Surface function definitions
export type SurfaceFnDef = {
  title: string;
  fn: (x: number) => number;
};

export const CONVEX_CIRCLE: SurfaceFnDef = {
  title: 'Convex Circle',
  fn: (x) => Math.sqrt(1 - (1 - x) ** 2),
};

export const CONVEX: SurfaceFnDef = {
  title: 'Convex Squircle',
  fn: (x) => Math.pow(1 - Math.pow(1 - x, 4), 1 / 4),
};

export const CONCAVE: SurfaceFnDef = {
  title: 'Concave',
  fn: (x) => 1 - CONVEX_CIRCLE.fn(x),
};

export const LIP: SurfaceFnDef = {
  title: 'Lip',
  fn: (x) => {
    const convex = CONVEX.fn(x * 2);
    const concave = CONCAVE.fn(x) + 0.1;
    const smootherstep = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    return convex * (1 - smootherstep) + concave * smootherstep;
  },
};

/**
 * Calculate the refraction profile using Snell's Law
 */
function calculateRefractionProfile(
  glassThickness: number = 200,
  bezelWidth: number = 50,
  bezelHeightFn: (x: number) => number = (x) => x,
  refractiveIndex: number = 1.5,
  samples: number = 128
): number[] {
  const eta = 1 / refractiveIndex;

  // Simplified refraction for vertical incident ray [0, 1]
  function refract(normalX: number, normalY: number): [number, number] | null {
    const dot = normalY;
    const k = 1 - eta * eta * (1 - dot * dot);
    if (k < 0) {
      // Total internal reflection
      return null;
    }
    const kSqrt = Math.sqrt(k);
    return [-(eta * dot + kSqrt) * normalX, eta - (eta * dot + kSqrt) * normalY];
  }

  return Array.from({ length: samples }, (_, i) => {
    const x = i / samples;
    const y = bezelHeightFn(x);

    // Calculate derivative
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = bezelHeightFn(x + dx);
    const derivative = (y2 - y) / dx;

    const magnitude = Math.sqrt(derivative * derivative + 1);
    const normal: [number, number] = [-derivative / magnitude, -1 / magnitude];

    const refracted = refract(normal[0], normal[1]);

    if (!refracted) {
      return 0;
    } else {
      const remainingHeightOnBezel = y * bezelWidth;
      const remainingHeight = remainingHeightOnBezel + glassThickness;
      return refracted[0] * (remainingHeight / refracted[1]);
    }
  });
}

/**
 * Generate the displacement map image data
 */
function generateDisplacementImageData(
  canvasWidth: number,
  canvasHeight: number,
  objectWidth: number,
  objectHeight: number,
  radius: number,
  bezelWidth: number,
  maximumDisplacement: number,
  refractionProfile: number[] = [],
  dpr: number = 1
): ImageData {
  const bufferWidth = Math.floor(canvasWidth * dpr);
  const bufferHeight = Math.floor(canvasHeight * dpr);

  const imageData = new ImageData(bufferWidth, bufferHeight);

  // Fill with neutral color (128, 128, 0, 255)
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = 128;     // R
    imageData.data[i + 1] = 128; // G
    imageData.data[i + 2] = 0;   // B
    imageData.data[i + 3] = 255; // A
  }

  const radius_ = radius * dpr;
  const bezel = bezelWidth * dpr;
  const radiusSquared = radius_ ** 2;
  const radiusPlusOneSquared = (radius_ + 1) ** 2;
  const radiusMinusBezelSquared = Math.max(0, (radius_ - bezel) ** 2);

  const objectWidth_ = objectWidth * dpr;
  const objectHeight_ = objectHeight * dpr;
  const widthBetweenRadiuses = objectWidth_ - radius_ * 2;
  const heightBetweenRadiuses = objectHeight_ - radius_ * 2;

  const objectX = (bufferWidth - objectWidth_) / 2;
  const objectY = (bufferHeight - objectHeight_) / 2;

  for (let y1 = 0; y1 < objectHeight_; y1++) {
    for (let x1 = 0; x1 < objectWidth_; x1++) {
      const idx = ((Math.floor(objectY + y1)) * bufferWidth + Math.floor(objectX + x1)) * 4;

      const isOnLeftSide = x1 < radius_;
      const isOnRightSide = x1 >= objectWidth_ - radius_;
      const isOnTopSide = y1 < radius_;
      const isOnBottomSide = y1 >= objectHeight_ - radius_;

      const x = isOnLeftSide ? x1 - radius_ : isOnRightSide ? x1 - radius_ - widthBetweenRadiuses : 0;
      const y = isOnTopSide ? y1 - radius_ : isOnBottomSide ? y1 - radius_ - heightBetweenRadiuses : 0;

      const distanceToCenterSquared = x * x + y * y;

      const isInBezel =
        distanceToCenterSquared <= radiusPlusOneSquared &&
        distanceToCenterSquared >= radiusMinusBezelSquared;

      if (isInBezel) {
        const opacity =
          distanceToCenterSquared < radiusSquared
            ? 1
            : 1 -
              (Math.sqrt(distanceToCenterSquared) - Math.sqrt(radiusSquared)) /
                (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));

        const distanceFromCenter = Math.sqrt(distanceToCenterSquared);
        const distanceFromSide = radius_ - distanceFromCenter;

        const cos = distanceFromCenter > 0 ? x / distanceFromCenter : 0;
        const sin = distanceFromCenter > 0 ? y / distanceFromCenter : 0;

        const bezelIndex = Math.min(
          refractionProfile.length - 1,
          Math.max(0, Math.floor((distanceFromSide / bezel) * refractionProfile.length))
        );
        const distance = refractionProfile[bezelIndex] ?? 0;

        const dX = maximumDisplacement > 0 ? (-cos * distance) / maximumDisplacement : 0;
        const dY = maximumDisplacement > 0 ? (-sin * distance) / maximumDisplacement : 0;

        imageData.data[idx] = Math.round(128 + dX * 127 * opacity);
        imageData.data[idx + 1] = Math.round(128 + dY * 127 * opacity);
        imageData.data[idx + 2] = 0;
        imageData.data[idx + 3] = 255;
      }
    }
  }

  return imageData;
}

/**
 * Calculate specular highlight layer
 */
export function calculateRefractionSpecular(
  objectWidth: number,
  objectHeight: number,
  radius: number,
  bezelWidth: number,
  specularAngle = Math.PI / 3,
  dpr: number = 1
): ImageData {
  const bufferWidth = Math.floor(objectWidth * dpr);
  const bufferHeight = Math.floor(objectHeight * dpr);

  const imageData = new ImageData(bufferWidth, bufferHeight);

  const radius_ = radius * dpr;
  const bezel_ = bezelWidth * dpr;

  const specular_vector = [Math.cos(specularAngle), Math.sin(specularAngle)];

  const radiusSquared = radius_ ** 2;
  const radiusPlusOneSquared = (radius_ + dpr) ** 2;
  const radiusMinusBezelSquared = Math.max(0, (radius_ - bezel_) ** 2);

  const widthBetweenRadiuses = bufferWidth - radius_ * 2;
  const heightBetweenRadiuses = bufferHeight - radius_ * 2;

  for (let y1 = 0; y1 < bufferHeight; y1++) {
    for (let x1 = 0; x1 < bufferWidth; x1++) {
      const idx = (y1 * bufferWidth + x1) * 4;

      const isOnLeftSide = x1 < radius_;
      const isOnRightSide = x1 >= bufferWidth - radius_;
      const isOnTopSide = y1 < radius_;
      const isOnBottomSide = y1 >= bufferHeight - radius_;

      const x = isOnLeftSide ? x1 - radius_ : isOnRightSide ? x1 - radius_ - widthBetweenRadiuses : 0;
      const y = isOnTopSide ? y1 - radius_ : isOnBottomSide ? y1 - radius_ - heightBetweenRadiuses : 0;

      const distanceToCenterSquared = x * x + y * y;

      const isInBezel =
        distanceToCenterSquared <= radiusPlusOneSquared &&
        distanceToCenterSquared >= radiusMinusBezelSquared;

      if (isInBezel) {
        const distanceFromCenter = Math.sqrt(distanceToCenterSquared);
        const distanceFromSide = radius_ - distanceFromCenter;

        const opacity =
          distanceToCenterSquared < radiusSquared
            ? 1
            : 1 -
              (distanceFromCenter - Math.sqrt(radiusSquared)) /
                (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));

        const cos = distanceFromCenter > 0 ? x / distanceFromCenter : 0;
        const sin = distanceFromCenter > 0 ? -y / distanceFromCenter : 0;

        const dotProduct = Math.abs(cos * specular_vector[0]! + sin * specular_vector[1]!);
        const coefficient = dotProduct * Math.sqrt(Math.max(0, 1 - (1 - distanceFromSide / dpr) ** 2));

        const color = Math.round(255 * coefficient);
        const finalOpacity = Math.round(color * coefficient * opacity);

        imageData.data[idx] = color;
        imageData.data[idx + 1] = color;
        imageData.data[idx + 2] = color;
        imageData.data[idx + 3] = finalOpacity;
      }
    }
  }

  return imageData;
}

/**
 * Get complete displacement data
 */
export function getDisplacementData({
  glassThickness = 40,
  bezelWidth = 20,
  bezelHeightFn = CONVEX.fn,
  refractiveIndex = 1.5,
  samples = 128,
  canvasWidth,
  canvasHeight,
  objectWidth,
  objectHeight,
  radius,
  dpr = 1,
}: {
  glassThickness?: number;
  bezelWidth?: number;
  bezelHeightFn?: (x: number) => number;
  refractiveIndex?: number;
  samples?: number;
  canvasWidth: number;
  canvasHeight: number;
  objectWidth: number;
  objectHeight: number;
  radius: number;
  dpr?: number;
}) {
  const refractionProfile = calculateRefractionProfile(
    glassThickness,
    bezelWidth,
    bezelHeightFn,
    refractiveIndex,
    samples
  );

  const maximumDisplacement = Math.max(...refractionProfile.map((v) => Math.abs(v)), 1);

  const displacementMap = generateDisplacementImageData(
    canvasWidth,
    canvasHeight,
    objectWidth,
    objectHeight,
    radius,
    bezelWidth,
    maximumDisplacement,
    refractionProfile,
    dpr
  );

  return {
    displacementMap,
    maximumDisplacement,
  };
}

/**
 * Convert ImageData to data URL
 */
export function imageDataToUrl(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}







