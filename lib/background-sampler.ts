/**
 * Utility functions for sampling background colors behind elements
 * to determine appropriate text colors for contrast
 */

/**
 * Calculate relative luminance of a color (WCAG formula)
 * Returns a value between 0 (dark) and 1 (light)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parse RGB color string to [r, g, b] array
 */
function parseRgb(color: string): [number, number, number] | null {
  // Handle rgb/rgba format
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
    ];
  }
  
  // Handle hex format
  const hexMatch = color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
  if (hexMatch) {
    return [
      parseInt(hexMatch[1], 16),
      parseInt(hexMatch[2], 16),
      parseInt(hexMatch[3], 16),
    ];
  }
  
  // Handle short hex
  const shortHexMatch = color.match(/#([0-9a-f])([0-9a-f])([0-9a-f])/i);
  if (shortHexMatch) {
    return [
      parseInt(shortHexMatch[1] + shortHexMatch[1], 16),
      parseInt(shortHexMatch[2] + shortHexMatch[2], 16),
      parseInt(shortHexMatch[3] + shortHexMatch[3], 16),
    ];
  }
  
  return null;
}

/**
 * Get background color of an element, traversing up the DOM tree
 */
function getBackgroundColor(element: Element | null): string | null {
  if (!element) return null;
  
  const style = window.getComputedStyle(element);
  let bgColor = style.backgroundColor;
  const bgImage = style.backgroundImage;
  
  // Check for background image
  if (bgImage && bgImage !== 'none' && bgImage !== 'initial' && bgImage !== 'inherit') {
    const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (urlMatch) {
      return `__IMAGE__:${urlMatch[1]}`;
    }
  }
  
  // If transparent, check parent
  if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
    const parent = element.parentElement;
    if (parent && parent !== document.body) {
      return getBackgroundColor(parent);
    }
    return window.getComputedStyle(document.body).backgroundColor;
  }
  
  // Check if rgba has low opacity
  const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
    if (alpha < 0.5 && element.parentElement && element.parentElement !== document.body) {
      return getBackgroundColor(element.parentElement);
    }
  }
  
  return bgColor;
}

/**
 * Sample pixel color from canvas at a specific point
 */
function sampleCanvasColor(
  canvas: HTMLCanvasElement,
  x: number,
  y: number
): [number, number, number] | null {
  try {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    
    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    return [r, g, b];
  } catch (e) {
    console.error('Error sampling canvas color:', e);
    return null;
  }
}

/**
 * Sample background color behind an element using canvas
 * This captures what's actually visible behind the element
 */
export async function sampleBackgroundColor(
  element: HTMLElement
): Promise<'light' | 'dark'> {
  return new Promise((resolve) => {
    // Get element position
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Sample multiple points for better accuracy
    const samplePoints = [
      [centerX, centerY],
      [rect.left + rect.width * 0.25, centerY],
      [rect.left + rect.width * 0.75, centerY],
      [centerX, rect.top + rect.height * 0.25],
      [centerX, rect.top + rect.height * 0.75],
    ];
    
    // Try to get color from element behind this position
    // First, try using elementFromPoint to find what's behind
    const elementBehind = document.elementFromPoint(centerX, centerY);
    
    if (elementBehind && elementBehind !== element) {
      // Get the background color of the element behind
      const bgColor = getBackgroundColor(elementBehind);
      
      if (bgColor && !bgColor.startsWith('__IMAGE__')) {
        const rgb = parseRgb(bgColor);
        if (rgb) {
          const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
          resolve(luminance > 0.5 ? 'light' : 'dark');
          return;
        }
      }
      
      // If it's an image, we need to sample it
      if (bgColor && bgColor.startsWith('__IMAGE__:')) {
        const imageUrl = bgColor.replace('__IMAGE__:', '');
        sampleImageColor(imageUrl, centerX, centerY, rect).then((rgb) => {
          if (rgb) {
            const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
            resolve(luminance > 0.5 ? 'light' : 'dark');
          } else {
            // Fallback to canvas sampling
            sampleWithCanvas(samplePoints).then(resolve);
          }
        });
        return;
      }
    }
    
    // Fallback: use canvas to capture what's behind
    sampleWithCanvas(samplePoints).then(resolve);
  });
}

/**
 * Sample color from an image at a specific position
 */
function sampleImageColor(
  imageUrl: string,
  x: number,
  y: number,
  elementRect: DOMRect
): Promise<[number, number, number] | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Calculate relative position
        const relX = (x - elementRect.left) / elementRect.width;
        const relY = (y - elementRect.top) / elementRect.height;
        
        // Map to image coordinates
        let sampleX = Math.floor(relX * img.width);
        let sampleY = Math.floor(relY * img.height);
        
        sampleX = Math.max(0, Math.min(img.width - 1, sampleX));
        sampleY = Math.max(0, Math.min(img.height - 1, sampleY));
        
        const rgb = sampleCanvasColor(canvas, sampleX, sampleY);
        resolve(rgb);
      } catch (e) {
        console.error('Error sampling image:', e);
        resolve(null);
      }
    };
    
    img.onerror = () => {
      resolve(null);
    };
    
    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      img.src = window.location.origin + imageUrl;
    } else {
      img.src = imageUrl;
    }
  });
}

/**
 * Sample background using canvas to capture what's actually rendered
 */
function sampleWithCanvas(samplePoints: number[][]): Promise<'light' | 'dark'> {
  return new Promise((resolve) => {
    // Use html2canvas-like approach: create a canvas and draw the page
    // For performance, we'll use a simpler approach: sample from a hidden canvas
    // that captures the viewport
    
    try {
      // Create a temporary canvas
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve('light'); // Fallback
        return;
      }
      
      // This is a simplified approach - in production you might use html2canvas
      // For now, we'll sample from the actual rendered page using a different method
      
      // Alternative: Use getComputedStyle on elements at those points
      const colors: [number, number, number][] = [];
      
      for (const [x, y] of samplePoints) {
        const elementAtPoint = document.elementFromPoint(x, y);
        if (elementAtPoint) {
          const bgColor = getBackgroundColor(elementAtPoint);
          if (bgColor && !bgColor.startsWith('__IMAGE__')) {
            const rgb = parseRgb(bgColor);
            if (rgb) {
              colors.push(rgb);
            }
          }
        }
      }
      
      if (colors.length > 0) {
        // Average the colors
        const avgR = Math.round(colors.reduce((sum, [r]) => sum + r, 0) / colors.length);
        const avgG = Math.round(colors.reduce((sum, [, g]) => sum + g, 0) / colors.length);
        const avgB = Math.round(colors.reduce((sum, [, , b]) => sum + b, 0) / colors.length);
        
        const luminance = getLuminance(avgR, avgG, avgB);
        resolve(luminance > 0.5 ? 'light' : 'dark');
      } else {
        // Fallback: check if we can use a screenshot approach
        // For now, default to light
        resolve('light');
      }
    } catch (e) {
      console.error('Error sampling with canvas:', e);
      resolve('light'); // Fallback
    }
  });
}

/**
 * Get the appropriate text color theme based on background
 */
export function getTextTheme(luminance: number): 'light' | 'dark' {
  return luminance > 0.5 ? 'dark' : 'light';
}


