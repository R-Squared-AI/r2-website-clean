'use client';

import { useState, useEffect, useRef, useMemo, useId, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getDisplacementData,
  calculateRefractionSpecular,
  imageDataToUrl,
  CONVEX,
} from '@/lib/liquid-glass';

type DropdownItem = { href: string; label: string; description?: string };
type NavLink = { href: string; label: string; dropdownItems?: DropdownItem[]; external?: boolean };

// Navigation links matching section order on homepage
const navLinks: NavLink[] = [
  { href: '#about', label: 'Approach' },
  { href: '#services', label: 'Capabilities' },
  { href: '#industries', label: 'Industries' },
  { href: '#edge', label: 'Edge' },
  { href: '#process', label: 'Delivery' },
  { href: '#team', label: 'Founders' },
  { href: 'https://form.typeform.com/to/XPforiEB', label: 'Contact', external: true },
];

// ============================================
// LIQUID GLASS HEADER - Collapsible Pills
// Using SVG Displacement Maps with Snell's Law
// ============================================

interface LiquidGlassConfig {
  glassThickness: number;
  bezelWidth: number;
  blur: number;
  refractiveIndex: number;
  specularOpacity: number;
  specularSaturation: number;
  brightness: number;
}

const defaultConfig: LiquidGlassConfig = {
  glassThickness: 120,
  bezelWidth: 24,
  blur: 3.0,
  refractiveIndex: 1.5,
  specularOpacity: 0.8,
  specularSaturation: 1.4,
  brightness: 1.1,
};

// Helper to generate liquid glass filter data
function generateLiquidGlassFilter(
  width: number,
  height: number,
  cornerRadius: number,
  dpr: number,
  config: LiquidGlassConfig = defaultConfig
) {
  if (width < 10 || height < 10) {
    return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
  }

  try {
    const clampedBezelWidth = Math.max(
      Math.min(config.bezelWidth, 2 * cornerRadius - 1),
      0
    );

    const { displacementMap, maximumDisplacement } = getDisplacementData({
      glassThickness: config.glassThickness,
      bezelWidth: clampedBezelWidth,
      bezelHeightFn: CONVEX.fn,
      refractiveIndex: config.refractiveIndex,
      canvasWidth: width,
      canvasHeight: height,
      objectWidth: width,
      objectHeight: height,
      radius: cornerRadius,
      dpr,
    });

    const specularData = calculateRefractionSpecular(
      width,
      height,
      cornerRadius,
      clampedBezelWidth,
      Math.PI / 3,
      dpr
    );

    return {
      displacementMapUrl: imageDataToUrl(displacementMap),
      specularMapUrl: imageDataToUrl(specularData),
      maxDisplacement: maximumDisplacement,
    };
  } catch (e) {
    console.error('Error generating liquid glass maps:', e);
    return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
  }
}

// SVG Filter Component
function LiquidGlassFilter({
  filterId,
  width,
  height,
  displacementMapUrl,
  specularMapUrl,
  maxDisplacement,
  config = defaultConfig,
}: {
  filterId: string;
  width: number;
  height: number;
  displacementMapUrl: string;
  specularMapUrl: string;
  maxDisplacement: number;
  config?: LiquidGlassConfig;
}) {
  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
      colorInterpolationFilters="sRGB"
    >
      <defs>
        <filter id={filterId}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={config.blur}
            result="blurred_source"
          />
          <feImage
            href={displacementMapUrl}
            x="0"
            y="0"
            width={width}
            height={height}
            result="displacement_map"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="displacement_map"
            scale={maxDisplacement}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="matrix"
            values={`${config.brightness} 0 0 0 0 0 ${config.brightness} 0 0 0 0 0 ${config.brightness} 0 0 0 0 0 1 0`}
            result="displaced_bright"
          />
          <feColorMatrix
            in="displaced_bright"
            type="saturate"
            values={String(config.specularSaturation)}
            result="displaced_saturated"
          />
          <feImage
            href={specularMapUrl}
            x="0"
            y="0"
            width={width}
            height={height}
            result="specular_layer"
            preserveAspectRatio="none"
          />
          <feComposite
            in="displaced_saturated"
            in2="specular_layer"
            operator="in"
            result="specular_saturated"
          />
          <feComponentTransfer in="specular_layer" result="specular_faded">
            <feFuncA type="linear" slope={config.specularOpacity} />
          </feComponentTransfer>
          <feBlend
            in="specular_saturated"
            in2="displaced_bright"
            mode="normal"
            result="withSaturation"
          />
          <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
}

// Liquid Glass Pill Component
function LiquidGlassPill({
  filterId,
  width,
  height,
  children,
  supportsLiquid,
  displacementMapUrl,
  specularMapUrl,
  maxDisplacement,
  mounted,
  noShadow = false,
}: {
  filterId: string;
  width: number;
  height: number;
  children: React.ReactNode;
  supportsLiquid: boolean;
  displacementMapUrl: string;
  specularMapUrl: string;
  maxDisplacement: number;
  mounted: boolean;
  noShadow?: boolean;
}) {
  const cornerRadius = 24; // Match other image corner radius

  return (
    <>
      {displacementMapUrl && specularMapUrl && (
        <LiquidGlassFilter
          filterId={filterId}
          width={width}
          height={height}
          displacementMapUrl={displacementMapUrl}
          specularMapUrl={specularMapUrl}
          maxDisplacement={maxDisplacement}
        />
      )}
      <motion.div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
          height: height,
          borderRadius: cornerRadius,
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter:
            mounted && supportsLiquid && displacementMapUrl && displacementMapUrl.length > 0
              ? `url(#${filterId})`
              : 'blur(20px) saturate(180%)',
          WebkitBackdropFilter:
            mounted && supportsLiquid && displacementMapUrl && displacementMapUrl.length > 0
              ? `url(#${filterId})`
              : 'blur(20px) saturate(180%)',
          boxShadow: noShadow ? 'none' : `
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.15)
          `,
          overflow: 'hidden',
        }}
      >
        {!supportsLiquid && (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: cornerRadius,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 1,
                borderRadius: cornerRadius - 1,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                pointerEvents: 'none',
              }}
            />
          </>
        )}
        {children}
      </motion.div>
    </>
  );
}

export { LiquidGlassPill };

export function LiquidGlassHeader() {
  // Pill dimensions (reduced by 20%)
  const logoPillWidth = 80;
  const logoPillHeight = 56;
  const hamburgerPillWidth = 56;
  const hamburgerPillHeight = 56;
  const barHeight = logoPillHeight; // Match logo pill height

  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedDimensions, setExpandedDimensions] = useState({
    width: 1100,
    height: barHeight,
  });
  const [mobileMenuDimensions, setMobileMenuDimensions] = useState({
    width: 320,
    height: 280,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [showIdlePill, setShowIdlePill] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light');
  // Track individual link themes (letter-by-letter)
  const [linkThemes, setLinkThemes] = useState<Record<string, Record<number, 'light' | 'dark'>>>({});
  // Track logo theme
  const [logoTheme, setLogoTheme] = useState<'light' | 'dark'>('light');
  // Track hamburger theme
  const [hamburgerTheme, setHamburgerTheme] = useState<'light' | 'dark'>('light');
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const letterRefs = useRef<Record<string, Record<number, HTMLElement | null>>>({});
  const dropdownTimeoutRef = useRef<number | null>(null);
  const logoPillRef = useRef<HTMLDivElement | null>(null);
  const hamburgerPillRef = useRef<HTMLDivElement | null>(null);

  const logoPillId = useId();
  const hamburgerPillId = useId();
  const expandedFilterId = useId();
  const mobileMenuFilterId = useId();

  const cornerRadius = 24; // Match other image corner radius
  const dpr =
    typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
  const isDark = headerTheme === 'dark';
  // Adapt text color based on background theme
  const primaryColor = isDark ? '#f8fafc' : '#000000';
  const secondaryColor = isDark ? '#cbd5e1' : '#4b5563';
  const accentColor = isDark ? '#b7dcff' : '#025082';
  // Logo filter based on logo theme (not global header theme)
  const logoFilter = logoTheme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)';
  // Hamburger color based on hamburger theme (not global header theme)
  const hamburgerColor = hamburgerTheme === 'dark' ? '#f8fafc' : '#000000';
  
  // Helper to get letter color based on individual letter theme
  const getLetterColor = (linkHref: string, letterIndex: number) => {
    const letterTheme = linkThemes[linkHref]?.[letterIndex] ?? headerTheme;
    return letterTheme === 'dark' ? '#f8fafc' : '#000000';
  };
  // Calculate desktop navigation font size - responsive with clamp, scales with viewport
  const desktopNavFontSize = 'clamp(14px, 1.4vw, 20px)';
  const mobileLiquidConfig: LiquidGlassConfig = {
    glassThickness: 170,
    bezelWidth: 35,
    blur: 5.5,
    refractiveIndex: 1.5,
    specularOpacity: 0.65,
    specularSaturation: 1.2,
    brightness: 1.1,
  };

  const closeNav = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
    setIsExpanded(false);
    if (isMobile) {
      setShowIdlePill(true);
    }
  }, [isMobile]);

  useEffect(() => {
    setMounted(true);
    
    // On desktop, automatically expand navigation on mount
    // On mobile, keep menu closed and show idle pill
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 768) {
        setIsExpanded(true);
        setShowIdlePill(false);
      } else {
        // Mobile: keep menu closed and show hamburger pill
        setIsExpanded(false);
        setShowIdlePill(true);
      }
    }

    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Calculate luminance from RGB values (0-1 range)
  const getLuminance = (r: number, g: number, b: number): number => {
    // Using relative luminance formula from WCAG
    const [rs, gs, bs] = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Get background color of an element, traversing up the DOM tree if needed
  const getBackgroundColor = (element: Element | null): string | null => {
    if (!element) return null;
    
    const style = window.getComputedStyle(element);
    let bgColor = style.backgroundColor;
    const bgImage = style.backgroundImage;
    
    // Check for background image first - if it exists, we need to sample it
    if (bgImage && bgImage !== 'none' && bgImage !== 'initial' && bgImage !== 'inherit') {
      // Extract image URL from background-image
      const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch) {
        // Return a special marker to indicate we need to sample the image
        return `__IMAGE__:${urlMatch[1]}`;
      }
    }
    
    // If background is transparent or rgba with alpha < 0.5, check parent
    if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
      const parent = element.parentElement;
      if (parent && parent !== document.body) {
        return getBackgroundColor(parent);
      }
      // Fallback to body background
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
  };

  // Sample pixel color from an image at a specific position
  const sampleImageColor = async (
    imageUrl: string,
    x: number,
    y: number,
    elementRect: DOMRect
  ): Promise<[number, number, number] | null> => {
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
          
          // Calculate the pixel position in the image
          // Account for background-size, background-position, etc.
          const style = window.getComputedStyle(document.elementFromPoint(x, y) || document.body);
          const bgSize = style.backgroundSize || 'cover';
          const bgPos = style.backgroundPosition || 'center';
          
          // For simplicity, sample from center of image (most common case)
          // In a production app, you'd parse bgSize and bgPos more carefully
          let sampleX = Math.floor(img.width / 2);
          let sampleY = Math.floor(img.height / 2);
          
          // If it's a cover/contain, try to map the viewport position to image coordinates
          if (bgSize === 'cover' || bgSize === 'contain') {
            // Calculate relative position within element
            const relX = (x - elementRect.left) / elementRect.width;
            const relY = (y - elementRect.top) / elementRect.height;
            
            // Map to image coordinates (simplified - assumes center positioning)
            sampleX = Math.floor(relX * img.width);
            sampleY = Math.floor(relY * img.height);
          }
          
          sampleX = Math.max(0, Math.min(img.width - 1, sampleX));
          sampleY = Math.max(0, Math.min(img.height - 1, sampleY));
          
          const imageData = ctx.getImageData(sampleX, sampleY, 1, 1);
          const [r, g, b] = imageData.data;
          resolve([r, g, b]);
        } catch (e) {
          console.warn('Error sampling image color:', e);
          resolve(null);
        }
      };
      
      img.onerror = () => {
        resolve(null);
      };
      
      // Handle relative URLs
      if (imageUrl.startsWith('/')) {
        img.src = window.location.origin + imageUrl;
      } else if (!imageUrl.startsWith('http')) {
        img.src = imageUrl;
      } else {
        img.src = imageUrl;
      }
    });
  };

  // Parse color string to RGB
  const parseColor = (color: string): [number, number, number] | null => {
    // Handle rgb/rgba
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      return [
        parseInt(rgbMatch[1], 10),
        parseInt(rgbMatch[2], 10),
        parseInt(rgbMatch[3], 10),
      ];
    }
    
    // Handle hex
    const hexMatch = color.match(/#([0-9a-f]{3}|[0-9a-f]{6})/i);
    if (hexMatch) {
      const hex = hexMatch[1];
      if (hex.length === 3) {
        return [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16),
        ];
      } else {
        return [
          parseInt(hex.substring(0, 2), 16),
          parseInt(hex.substring(2, 4), 16),
          parseInt(hex.substring(4, 6), 16),
        ];
      }
    }
    
    // Handle named colors (basic set)
    const namedColors: Record<string, [number, number, number]> = {
      black: [0, 0, 0],
      white: [255, 255, 255],
      red: [255, 0, 0],
      green: [0, 128, 0],
      blue: [0, 0, 255],
      yellow: [255, 255, 0],
      cyan: [0, 255, 255],
      magenta: [255, 0, 255],
      gray: [128, 128, 128],
      grey: [128, 128, 128],
    };
    
    const lowerColor = color.toLowerCase().trim();
    if (namedColors[lowerColor]) {
      return namedColors[lowerColor];
    }
    
    return null;
  };

  // Switch header colors based on background behind logo pill
  useEffect(() => {
    const updateTheme = () => {
      // Get all sections with data-header-theme at the start
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme]'));
      
      if (!mounted || !logoPillRef.current) {
        // Fallback to data-header-theme method if logo pill not ready
        const sampleY = (containerRef.current?.getBoundingClientRect().bottom ?? barHeight + 32) + 24;
        let nextTheme: 'light' | 'dark' = 'light';

        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= sampleY && rect.bottom >= sampleY) {
            const theme = (section.getAttribute('data-header-theme') as 'light' | 'dark' | null) ?? nextTheme;
            nextTheme = theme;
            break;
          }
        }

        setHeaderTheme(nextTheme);
        return;
      }

      // Get logo pill center position (viewport coordinates - logo is fixed at top)
      const pillRect = logoPillRef.current.getBoundingClientRect();
      const centerX = pillRect.left + pillRect.width / 2;
      const centerY = pillRect.top + pillRect.height / 2; // This is around 51px from top

      // PRIMARY: Use elementFromPoint to detect the actual visible element at the header position.
      // This is more reliable than section bounds because sections overlap via negative margins.
      // Check what's at the logo position by temporarily disabling pointer events on header
      const header = document.querySelector('header');
      const originalPointerEvents = header?.style.pointerEvents;
      
      let elementBehind: Element | null = null;
      try {
        if (header) {
          header.style.pointerEvents = 'none';
        }
        
        // Get the element at the logo's position - sample multiple points for better accuracy
        elementBehind = document.elementFromPoint(centerX, centerY);
        
        // Also try a point slightly below the logo center to catch elements that might be partially obscured
        if (!elementBehind || elementBehind === header || header?.contains(elementBehind)) {
          const elementBelow = document.elementFromPoint(centerX, centerY + 30);
          if (elementBelow && elementBelow !== header && !header?.contains(elementBelow)) {
            elementBehind = elementBelow;
          }
        }
        
        // Check if elementBehind is an img or contains an img - images are often dark
        if (elementBehind) {
          const isImg = elementBehind.tagName === 'IMG';
          const hasImg = (elementBehind as HTMLElement).querySelector?.('img');
          if (isImg || hasImg) {
            // Images are often dark, so default to dark theme when over images
            // But check parent section's data-header-theme first
            let parent = elementBehind.parentElement;
            while (parent && parent !== document.body) {
              const theme = parent.getAttribute('data-header-theme');
              if (theme === 'light' || theme === 'dark') {
                setHeaderTheme(theme);
                return;
              }
              parent = parent.parentElement;
            }
            // If no explicit theme, assume dark for images (safer default)
            setHeaderTheme('dark');
            return;
          }
        }
      } finally {
        // Always restore header pointer events
        if (header) {
          header.style.pointerEvents = originalPointerEvents || '';
        }
      }
      
      // Get background color from the element behind (skip if it's the header itself)
      if (elementBehind && elementBehind !== header && !header?.contains(elementBehind)) {
        // First check if element or any parent has data-header-theme - traverse up the entire tree
        // Also check all ancestors, not just direct parents
        let currentElement: Element | null = elementBehind;
        const checkedElements = new Set<Element>();
        
        while (currentElement && currentElement !== document.documentElement) {
          if (checkedElements.has(currentElement)) break;
          checkedElements.add(currentElement);
          
          // Check this element
          const theme = (currentElement as HTMLElement).getAttribute?.('data-header-theme');
          if (theme === 'light' || theme === 'dark') {
            setHeaderTheme(theme);
            return;
          }
          
          // Also check if this element is one of our known sections
          if (sections.includes(currentElement as HTMLElement)) {
            const sectionTheme = (currentElement as HTMLElement).getAttribute('data-header-theme');
            if (sectionTheme === 'light' || sectionTheme === 'dark') {
              setHeaderTheme(sectionTheme);
              return;
            }
          }
          
          currentElement = currentElement.parentElement;
        }
        
        // Also check all sections to see if any contain this element (more thorough check)
        for (const section of sections) {
          if (section.contains(elementBehind) || section === elementBehind) {
            const theme = (section.getAttribute('data-header-theme') as 'light' | 'dark' | null) ?? 'light';
            setHeaderTheme(theme);
            return;
          }
        }
        
        // Check if elementBehind itself is a section with data-header-theme
        if (sections.includes(elementBehind as HTMLElement)) {
          const theme = (elementBehind as HTMLElement).getAttribute('data-header-theme');
          if (theme === 'light' || theme === 'dark') {
            setHeaderTheme(theme);
            return;
          }
        }
        
        // Check computed styles AND inline styles for background images - these are often dark
        const computedStyle = window.getComputedStyle(elementBehind as HTMLElement);
        const elementHtml = elementBehind as HTMLElement;
        const inlineStyle = elementHtml.style;
        
        const bgImage = computedStyle.backgroundImage || inlineStyle.backgroundImage;
        const fullBackground = computedStyle.background || inlineStyle.background;
        const bgImageStyle = inlineStyle.backgroundImage;
        
        // Check if element has a background image (common for dark hero/feature sections)
        // Check both computed and inline styles
        const hasBackgroundImage = (bgImage && bgImage !== 'none' && bgImage !== 'initial' && bgImage !== 'inherit') ||
                                  (bgImageStyle && bgImageStyle !== 'none' && bgImageStyle !== 'initial' && bgImageStyle !== 'inherit');
        
        if (hasBackgroundImage) {
          // Check the full background property for dark gradients/overlays
          const backgroundString = fullBackground || '';
          const hasDarkOverlay = backgroundString.includes('rgba(0,0,0') || 
                                backgroundString.includes('linear-gradient(135deg') ||
                                backgroundString.includes('linear-gradient(140deg') ||
                                backgroundString.includes('linear-gradient(160deg') ||
                                backgroundString.includes('linear-gradient(180deg') ||
                                backgroundString.includes('rgba(0, 0, 0') ||
                                backgroundString.includes('rgb(0,0,0');
          
          // Also check background color - if it's very dark, assume dark theme
          const bgColor = computedStyle.backgroundColor || inlineStyle.backgroundColor;
          const rgb = parseColor(bgColor);
          if (rgb) {
            const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
            // If luminance is low (dark) or there's a dark gradient overlay, assume dark theme
            if (luminance < 0.4 || hasDarkOverlay) {
              setHeaderTheme('dark');
              return;
            }
          } else if (hasDarkOverlay) {
            // If we can't parse the color but there's a dark overlay, assume dark
            setHeaderTheme('dark');
            return;
          }
        }
        
        // Also check if the element itself has a very dark background color
        const bgColorComputed = computedStyle.backgroundColor || inlineStyle.backgroundColor;
        const rgbComputed = parseColor(bgColorComputed);
        if (rgbComputed) {
          const luminanceComputed = getLuminance(rgbComputed[0], rgbComputed[1], rgbComputed[2]);
          if (luminanceComputed < 0.3) {
            setHeaderTheme('dark');
            return;
          }
        }
        
        // Then check background color
        const bgColor = getBackgroundColor(elementBehind);
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)' && !bgColor.startsWith('__IMAGE__:')) {
          const rgb = parseColor(bgColor);
          if (rgb) {
            const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
            const nextTheme: 'light' | 'dark' = luminance > 0.5 ? 'light' : 'dark';
            setHeaderTheme(nextTheme);
            return;
          }
        }
        
        // If we have a background image, try to sample it (async, non-blocking)
        if (bgColor && bgColor.startsWith('__IMAGE__:')) {
          const imageUrl = bgColor.replace('__IMAGE__:', '');
          const elementRect = (elementBehind as HTMLElement).getBoundingClientRect();
          sampleImageColor(imageUrl, centerX, centerY, elementRect).then((rgb) => {
            if (rgb) {
              const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
              const nextTheme: 'light' | 'dark' = luminance > 0.5 ? 'light' : 'dark';
              setHeaderTheme(nextTheme);
            }
          });
          // Continue to fallback logic below
        }
      }
      
      // Also check body/html background as fallback
      const bodyBg = getBackgroundColor(document.body);
      if (bodyBg && bodyBg !== 'transparent' && bodyBg !== 'rgba(0, 0, 0, 0)') {
        const rgb = parseColor(bodyBg);
        if (rgb) {
          const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
          const nextTheme: 'light' | 'dark' = luminance > 0.5 ? 'light' : 'dark';
          setHeaderTheme(nextTheme);
          return;
        }
      }

      // Fallback: sample background color from main content
      const main = document.querySelector('main');
      if (main) {
        // Check all children to find what's at the logo position
        const mainChildren = Array.from(main.children) as HTMLElement[];
        
        for (const child of mainChildren) {
          const rect = child.getBoundingClientRect();
          // Check if logo is within or near this child element
          if (centerY >= rect.top - 20 && centerY <= rect.bottom + 20 &&
              centerX >= rect.left - 200 && centerX <= rect.right + 200) {
            // First check if child has data-header-theme
            const childTheme = child.getAttribute('data-header-theme');
            if (childTheme === 'light' || childTheme === 'dark') {
              setHeaderTheme(childTheme);
              return;
            }
            
            // Then check background color
            const bgColor = getBackgroundColor(child);
            if (bgColor && !bgColor.startsWith('__IMAGE__:')) {
              const rgb = parseColor(bgColor);
              if (rgb) {
                const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
                const nextTheme: 'light' | 'dark' = luminance > 0.5 ? 'light' : 'dark';
                setHeaderTheme(nextTheme);
                return;
              }
            }
          }
        }
        
        // Use main's background
        const bgColor = getBackgroundColor(main);
        if (bgColor && !bgColor.startsWith('__IMAGE__:')) {
          const rgb = parseColor(bgColor);
          if (rgb) {
            const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
            const nextTheme: 'light' | 'dark' = luminance > 0.5 ? 'light' : 'dark';
            setHeaderTheme(nextTheme);
            return;
          }
        }
      }

      // FALLBACK: check all sections by bounds with tight tolerance
      let nextTheme: 'light' | 'dark' = 'light';
      let bestMatch: { section: HTMLElement; distance: number } | null = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Tight tolerance (±20px) to avoid matching overlapping sections via negative margins
        if (centerY >= rect.top - 20 && centerY <= rect.bottom + 20) {
          // Check horizontal overlap (with wide tolerance since logo is centered)
          if (centerX >= rect.left - 500 && centerX <= rect.right + 500) {
            // Calculate how close the logo is to this section
            const distance = Math.min(
              Math.abs(centerY - rect.top),
              Math.abs(centerY - rect.bottom),
              Math.abs(centerX - rect.left),
              Math.abs(centerX - rect.right)
            );
            
            if (!bestMatch || distance < bestMatch.distance) {
              bestMatch = { section, distance };
            }
          }
        }
      }
      
      if (bestMatch) {
        const theme = (bestMatch.section.getAttribute('data-header-theme') as 'light' | 'dark' | null) ?? 'light';
        setHeaderTheme(theme);
        return;
      }

      // Ultimate fallback: use data-header-theme at sample point below header
      const sampleY = (containerRef.current?.getBoundingClientRect().bottom ?? barHeight + 32) + 24;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom >= sampleY) {
          const theme = (section.getAttribute('data-header-theme') as 'light' | 'dark' | null) ?? nextTheme;
          nextTheme = theme;
          break;
        }
      }

      setHeaderTheme(nextTheme);
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateTheme, 100);
    updateTheme();
    
    // Also run on next frame to catch any late-rendered content
    const rafId = requestAnimationFrame(() => {
      updateTheme();
    });
    
    window.addEventListener('scroll', updateTheme, { passive: true });
    window.addEventListener('resize', updateTheme);
    
    // Use IntersectionObserver to detect when sections with data-header-theme enter/exit viewport
    const observer = new IntersectionObserver(
      () => {
        updateTheme();
      },
      { root: null, rootMargin: '0px', threshold: [0, 0.1, 0.5, 1] }
    );
    
    // Observe all sections with data-header-theme
    const sectionsToObserve = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme]'));
    sectionsToObserve.forEach((section) => observer.observe(section));
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateTheme);
      window.removeEventListener('resize', updateTheme);
      observer.disconnect();
    };
  }, [pathname, mounted, barHeight]);

  // Detect individual letter themes and logo theme - using the SAME approach that worked for links
  useEffect(() => {
    const checkThemes = () => {
      const header = document.querySelector('header');
      if (!header || !mounted) {
        return;
      }

      // Don't update theme detection when mobile menu is open to prevent incorrect detection
      if (isMobile && isExpanded) {
        return;
      }

      const headerRect = header.getBoundingClientRect();
      if (!headerRect) {
        return;
      }

      // Disable pointer events on header glass layers (same as working link detection)
      const originalPointerEvents = header.style.pointerEvents;
      header.style.pointerEvents = 'none';
      
      // Disable pointer events on all glass layers
      const glassLayers = header.querySelectorAll('[style*="backdropFilter"], [style*="backdrop-filter"]');
      const originalGlassPointerEvents: Array<{ element: HTMLElement; value: string }> = [];
      glassLayers.forEach((layer) => {
        const el = layer as HTMLElement;
        originalGlassPointerEvents.push({ element: el, value: el.style.pointerEvents });
        el.style.pointerEvents = 'none';
      });
      
      // Also disable on divs with backdrop-filter
      const allDivs = header.querySelectorAll('div');
      allDivs.forEach((div) => {
        const el = div as HTMLElement;
        const style = window.getComputedStyle(el);
        if (style.backdropFilter && style.backdropFilter !== 'none') {
          if (!originalGlassPointerEvents.find(e => e.element === el)) {
            originalGlassPointerEvents.push({ element: el, value: el.style.pointerEvents });
            el.style.pointerEvents = 'none';
          }
        }
      });

      // Also disable pointer events on mobile menu overlay if it exists
      const mobileOverlay = document.querySelector('[aria-hidden="true"][style*="position: fixed"][style*="inset: 0"]');
      const originalOverlayPointerEvents = mobileOverlay ? (mobileOverlay as HTMLElement).style.pointerEvents : '';
      if (mobileOverlay) {
        (mobileOverlay as HTMLElement).style.pointerEvents = 'none';
      }

      const sampleY = headerRect.bottom + 30; // Same offset as working link detection
      const newLinkThemes: Record<string, Record<number, 'light' | 'dark'>> = {};

      // Check each link's letters - using EXACT same method as working link detection
      navLinks.forEach((link) => {
        const linkLetterThemes: Record<number, 'light' | 'dark'> = {};
        const letters = link.label.split('');
        
        let linkElement = linkRefs.current[link.href];
        if (!linkElement) {
          linkElement = document.querySelector(`a[href="${link.href}"]`) as HTMLElement;
          if (linkElement) {
            linkRefs.current[link.href] = linkElement;
          }
        }
        
        if (linkElement) {
          letters.forEach((letter, index) => {
            const letterRef = letterRefs.current[link.href]?.[index];
            
            if (letterRef) {
              const letterRect = letterRef.getBoundingClientRect();
              const sampleX = letterRect.left + letterRect.width / 2;
              
              // Use elementFromPoint - SAME as working link detection
              const elementBehind = document.elementFromPoint(sampleX, sampleY);
              let foundTheme: 'light' | 'dark' | null = null;
              
              // Skip if element is part of mobile menu or overlay
              if (elementBehind && 
                  !elementBehind.closest('header') &&
                  !elementBehind.hasAttribute('aria-hidden')) {
                // Traverse up to find data-header-theme - SAME as working code
                let current: HTMLElement | null = elementBehind as HTMLElement;
                while (current && current !== document.body) {
                  // Skip mobile menu elements
                  if (current.getAttribute('aria-hidden') === 'true' || 
                      current.closest('[style*="position: fixed"][style*="inset: 0"]')) {
                    break;
                  }
                  const theme = current.getAttribute('data-header-theme');
                  if (theme === 'light' || theme === 'dark') {
                    foundTheme = theme as 'light' | 'dark';
                    break;
                  }
                  current = current.parentElement;
                }
                
                // Calculate luminance if no data-header-theme - SAME as working code
                if (!foundTheme) {
                  let bgElement: HTMLElement | null = elementBehind as HTMLElement;
                  let bgColor: string | null = null;
                  
                  while (bgElement && bgElement !== document.body) {
                    // Skip mobile menu elements
                    if (bgElement.getAttribute('aria-hidden') === 'true' || 
                        bgElement.closest('[style*="position: fixed"][style*="inset: 0"]')) {
                      bgElement = bgElement.parentElement;
                      continue;
                    }
                    const computedStyle = window.getComputedStyle(bgElement);
                    bgColor = computedStyle.backgroundColor;
                    
                    if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
                      const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                      if (rgbaMatch) {
                        const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
                        if (alpha >= 0.5) {
                          break;
                        }
                      }
                    }
                    bgElement = bgElement.parentElement;
                  }
                  
                  if (bgColor) {
                    const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                    if (rgbMatch) {
                      const r = parseInt(rgbMatch[1], 10);
                      const g = parseInt(rgbMatch[2], 10);
                      const b = parseInt(rgbMatch[3], 10);
                      const luminance = (0.2126 * (r / 255)) + (0.7152 * (g / 255)) + (0.0722 * (b / 255));
                      foundTheme = luminance > 0.5 ? 'light' : 'dark';
                    }
                  }
                }
              }
              
              linkLetterThemes[index] = foundTheme || headerTheme;
            } else {
              // Fallback
              linkLetterThemes[index] = headerTheme;
            }
          });
        } else {
          letters.forEach((_, index) => {
            linkLetterThemes[index] = headerTheme;
          });
        }
        
        newLinkThemes[link.href] = linkLetterThemes;
      });

      // Check logo theme - EXACT SAME method as letters (copy-paste the working code)
      // Find logo image element (same approach as finding letter refs)
      const logoImg = header.querySelector('img[alt="R²"], img[src*="r2-logo"]') as HTMLElement;
      
      if (logoImg) {
        const logoRect = logoImg.getBoundingClientRect();
        const logoX = logoRect.left + logoRect.width / 2;
        
        // Use elementFromPoint - EXACT SAME as working letter detection
        const elementBehind = document.elementFromPoint(logoX, sampleY);
        let foundTheme: 'light' | 'dark' | null = null;
        
        // Skip if element is part of mobile menu or overlay
        if (elementBehind && 
            !elementBehind.closest('header') &&
            !elementBehind.hasAttribute('aria-hidden')) {
          // Traverse up to find data-header-theme - EXACT SAME as working code
          let current: HTMLElement | null = elementBehind as HTMLElement;
          while (current && current !== document.body) {
            // Skip mobile menu elements
            if (current.getAttribute('aria-hidden') === 'true' || 
                current.closest('[style*="position: fixed"][style*="inset: 0"]')) {
              break;
            }
            const theme = current.getAttribute('data-header-theme');
            if (theme === 'light' || theme === 'dark') {
              foundTheme = theme as 'light' | 'dark';
              break;
            }
            current = current.parentElement;
          }
          
          // Calculate luminance if no data-header-theme - EXACT SAME as working code
          if (!foundTheme) {
            let bgElement: HTMLElement | null = elementBehind as HTMLElement;
            let bgColor: string | null = null;
            
            while (bgElement && bgElement !== document.body) {
              // Skip mobile menu elements
              if (bgElement.getAttribute('aria-hidden') === 'true' || 
                  bgElement.closest('[style*="position: fixed"][style*="inset: 0"]')) {
                bgElement = bgElement.parentElement;
                continue;
              }
              const computedStyle = window.getComputedStyle(bgElement);
              bgColor = computedStyle.backgroundColor;
              
              if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
                const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (rgbaMatch) {
                  const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
                  if (alpha >= 0.5) {
                    break;
                  }
                }
              }
              bgElement = bgElement.parentElement;
            }
            
            if (bgColor) {
              const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
              if (rgbMatch) {
                const r = parseInt(rgbMatch[1], 10);
                const g = parseInt(rgbMatch[2], 10);
                const b = parseInt(rgbMatch[3], 10);
                const luminance = (0.2126 * (r / 255)) + (0.7152 * (g / 255)) + (0.0722 * (b / 255));
                foundTheme = luminance > 0.5 ? 'light' : 'dark';
              }
            }
          }
        }
        
        setLogoTheme(foundTheme || headerTheme);
      }

      // Check hamburger theme - EXACT SAME method as logo
      if (hamburgerPillRef.current && isMobile) {
        const hamburgerRect = hamburgerPillRef.current.getBoundingClientRect();
        const hamburgerX = hamburgerRect.left + hamburgerRect.width / 2;
        
        // Use elementFromPoint - EXACT SAME as logo detection
        const elementBehind = document.elementFromPoint(hamburgerX, sampleY);
        let foundTheme: 'light' | 'dark' | null = null;
        
        // Skip if element is part of mobile menu or overlay
        if (elementBehind && 
            !elementBehind.closest('header') &&
            !elementBehind.hasAttribute('aria-hidden')) {
          // Traverse up to find data-header-theme - EXACT SAME as working code
          let current: HTMLElement | null = elementBehind as HTMLElement;
          while (current && current !== document.body) {
            // Skip mobile menu elements
            if (current.getAttribute('aria-hidden') === 'true' || 
                current.closest('[style*="position: fixed"][style*="inset: 0"]')) {
              break;
            }
            const theme = current.getAttribute('data-header-theme');
            if (theme === 'light' || theme === 'dark') {
              foundTheme = theme as 'light' | 'dark';
              break;
            }
            current = current.parentElement;
          }
          
          // Calculate luminance if no data-header-theme - EXACT SAME as working code
          if (!foundTheme) {
            let bgElement: HTMLElement | null = elementBehind as HTMLElement;
            let bgColor: string | null = null;
            
            while (bgElement && bgElement !== document.body) {
              // Skip mobile menu elements
              if (bgElement.getAttribute('aria-hidden') === 'true' || 
                  bgElement.closest('[style*="position: fixed"][style*="inset: 0"]')) {
                bgElement = bgElement.parentElement;
                continue;
              }
              const computedStyle = window.getComputedStyle(bgElement);
              bgColor = computedStyle.backgroundColor;
              
              if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
                const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (rgbaMatch) {
                  const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
                  if (alpha >= 0.5) {
                    break;
                  }
                }
              }
              bgElement = bgElement.parentElement;
            }
            
            if (bgColor) {
              const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
              if (rgbMatch) {
                const r = parseInt(rgbMatch[1], 10);
                const g = parseInt(rgbMatch[2], 10);
                const b = parseInt(rgbMatch[3], 10);
                const luminance = (0.2126 * (r / 255)) + (0.7152 * (g / 255)) + (0.0722 * (b / 255));
                foundTheme = luminance > 0.5 ? 'light' : 'dark';
              }
            }
          }
        }
        
        setHamburgerTheme(foundTheme || headerTheme);
      } else if (!isMobile) {
        // On desktop, hamburger doesn't exist, but set it to match header theme for consistency
        setHamburgerTheme(headerTheme);
      }
      
      // Restore pointer events
      header.style.pointerEvents = originalPointerEvents || '';
      originalGlassPointerEvents.forEach(({ element, value }) => {
        element.style.pointerEvents = value || 'auto';
      });
      if (mobileOverlay) {
        (mobileOverlay as HTMLElement).style.pointerEvents = originalOverlayPointerEvents || '';
      }
      
      setLinkThemes((prev) => {
        // Check if there are any changes
        let hasChanges = false;
        for (const href of Object.keys(newLinkThemes)) {
          const newThemes = newLinkThemes[href];
          const prevThemes = prev[href] || {};
          for (const index of Object.keys(newThemes).map(Number)) {
            if (prevThemes[index] !== newThemes[index]) {
              hasChanges = true;
              break;
            }
          }
          if (hasChanges) break;
        }
        return hasChanges ? { ...prev, ...newLinkThemes } : prev;
      });
    };

    // Run with delays to ensure DOM is ready
    const t1 = setTimeout(checkThemes, 100);
    const t2 = setTimeout(checkThemes, 500);
    const t3 = setTimeout(checkThemes, 1000);
    
    requestAnimationFrame(checkThemes);
    
    window.addEventListener('scroll', checkThemes, { passive: true });
    window.addEventListener('resize', checkThemes);
    
    const observer = new MutationObserver(checkThemes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', checkThemes);
      window.removeEventListener('resize', checkThemes);
      observer.disconnect();
    };
  }, [pathname, mounted, headerTheme, isMobile, isExpanded]);

  useEffect(() => {
    // Calculate fixed width: from hamburger position (right) to before logo pill (left)
    // Logo pill is at left, hamburger is at right
    // Width = container width - logo pill width - minimal gap to leave space between logo and liquid glass
    const calculateFixedWidth = () => {
      if (!mounted) return;
      const containerWidth = Math.min(1044, window.innerWidth - 80);
      const logoPillWithGap = logoPillWidth + 8; // shrink gap to ~20% of previous
      const calculatedWidth = Math.max(containerWidth - logoPillWithGap, hamburgerPillWidth);
      
      setExpandedDimensions({
        width: calculatedWidth,
        height: barHeight,
      });
    };

    // Calculate on mount and when expanded state changes, or always on desktop
    if (mounted && (isExpanded || !isMobile)) {
      const timeoutId = setTimeout(calculateFixedWidth, 50);

      // Only update on actual window resize, not container resize
      const handleResize = () => {
        calculateFixedWidth();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isExpanded, isMobile, mounted]);

  useEffect(() => {
    const updateIsMobile = () => {
      const nextIsMobile = window.innerWidth <= 768;
      const wasMobile = isMobile;
      setIsMobile(nextIsMobile);
      
      if (nextIsMobile) {
        // Mobile: close navigation if it was open and show hamburger pill
        if (!wasMobile && isExpanded) {
          closeNav();
        }
        // Ensure hamburger pill is visible on mobile when menu is closed
        if (!isExpanded) {
          setShowIdlePill(true);
        }
        const horizontalPadding = 20;
        const available = Math.max(0, window.innerWidth - horizontalPadding * 2);
        const safeWidth = Math.max(
          160,
          Math.min(240, available * 0.45)
        );
        const itemHeight = 48;
        const gap = 12;
        const verticalPadding = 24;
        const totalItems = navLinks.length;
        setMobileMenuDimensions({
          width: safeWidth,
          height: totalItems * itemHeight + Math.max(0, totalItems - 1) * gap + verticalPadding,
        });
      } else {
        // Desktop: automatically expand and show navigation
        if (wasMobile || !isExpanded) {
          setIsExpanded(true);
          setShowIdlePill(false);
        }
      }
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [isMobile, isExpanded, closeNav]);

  // Generate filters for pills
  const logoPillFilter = useMemo(() => {
    if (!mounted) {
      return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
    }
    return generateLiquidGlassFilter(
      logoPillWidth,
      logoPillHeight,
      cornerRadius,
      dpr
    );
  }, [mounted, dpr]);

  const hamburgerPillFilter = useMemo(() => {
    if (!mounted) {
      return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
    }
    return generateLiquidGlassFilter(
      hamburgerPillWidth,
      hamburgerPillHeight,
      cornerRadius,
      dpr
    );
  }, [mounted, dpr]);

  // Generate filter for expanded header
  const expandedFilter = useMemo(() => {
    // On desktop, always generate filter (navigation is always expanded)
    // On mobile, only generate when expanded
    if (isMobile && !isExpanded) {
      return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
    }
    if (!mounted || expandedDimensions.width < 10) {
      return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
    }
    return generateLiquidGlassFilter(
      expandedDimensions.width,
      expandedDimensions.height,
      cornerRadius,
      dpr
    );
  }, [isExpanded, isMobile, expandedDimensions.width, expandedDimensions.height, dpr, mounted]);

  const mobileMenuFilter = useMemo(() => {
    if (!isExpanded || !isMobile) {
      return { displacementMapUrl: '', specularMapUrl: '', maxDisplacement: 1 };
    }
    return generateLiquidGlassFilter(
      mobileMenuDimensions.width,
      mobileMenuDimensions.height,
      cornerRadius,
      dpr,
      mobileLiquidConfig
    );
  }, [
    isExpanded,
    isMobile,
    mobileMenuDimensions.width,
    mobileMenuDimensions.height,
    dpr,
  ]);

  // Check browser support
  const [supportsLiquid, setSupportsLiquid] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isWebkit =
        /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);

      if (!isWebkit && !isFirefox) {
        const div = document.createElement('div');
        div.style.backdropFilter = `url(#test-filter)`;
        setSupportsLiquid(div.style.backdropFilter !== '');
      }
    }
  }, []);

  const handleHamburgerClick = () => {
    // Simple toggle - no complex timing
    if (!isExpanded) {
      setIsExpanded(true);
      setShowIdlePill(false);
    } else {
      setIsExpanded(false);
      setShowIdlePill(true);
    }
  };

  return (
    <>
      {/* Click-away overlay to close when tapping outside - Only on mobile */}
      {isExpanded && isMobile && (
        <div
          onClick={handleHamburgerClick}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 900,
            background: 'transparent',
          }}
        />
      )}

      <header
        style={{
          position: 'fixed',
          top: 16,
          left: 0,
          right: 0,
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 16px',
        }}
      >
        {/* Consistent Container - Logo and Hamburger always in same positions */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'min(1300px, calc(100vw - 10px))',
            height: barHeight,
          }}
        >
          {/* Logo - Background glass container (filter applied here) - Desktop only */}
          {!isMobile && (
            <motion.div
              ref={logoPillRef}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: cornerRadius,
                height: barHeight,
                width: logoPillWidth,
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter:
                  mounted && supportsLiquid && logoPillFilter.displacementMapUrl
                    ? `url(#${logoPillId}-filter)`
                    : 'blur(20px) saturate(180%)',
                WebkitBackdropFilter:
                  mounted && supportsLiquid && logoPillFilter.displacementMapUrl
                    ? `url(#${logoPillId}-filter)`
                    : 'blur(20px) saturate(180%)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.08),
                  0 0 0 1px rgba(255, 255, 255, 0.2)
                `,
                overflow: 'hidden',
                zIndex: 3,
                pointerEvents: 'none',
                clipPath: `inset(0 round ${cornerRadius}px)`,
              }}
            >
              <LiquidGlassFilter
                filterId={`${logoPillId}-filter`}
                width={logoPillWidth}
                height={logoPillHeight}
                displacementMapUrl={logoPillFilter.displacementMapUrl}
                specularMapUrl={logoPillFilter.specularMapUrl}
                maxDisplacement={logoPillFilter.maxDisplacement}
              />
            </motion.div>
          )}

          {/* Logo - Rendered on top without filter - Desktop only */}
          {!isMobile && (
            <Link
              href="/"
              aria-label="R² home"
              onClick={(e) => {
                // If already on homepage, smooth scroll to top instead of reloading
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 20px',
                width: logoPillWidth,
                height: barHeight,
                textDecoration: 'none',
                zIndex: 10,
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'auto',
                overflow: 'hidden',
                clipPath: `inset(0 round ${cornerRadius}px)`,
              }}
            >
              <img
                src="/r2-logo.webp"
                alt="R²"
                loading="eager"
                fetchPriority="high"
                key={`logo-desktop-${logoTheme}`}
                style={{
                  display: 'block',
                  width: 'auto',
                  height: '100%',
                  maxWidth: logoPillWidth,
                  maxHeight: logoPillHeight,
                  objectFit: 'contain',
                  filter: logoFilter,
                  transition: 'filter 0.3s ease-in-out',
                  WebkitFilter: logoFilter,
                  pointerEvents: 'none',
                  transform: 'scale(1.5)',
                }}
              />
            </Link>
          )}

          {/* Hamburger - pill and icon share the same anchor box - Only show on mobile */}
          {isMobile && (
            <div
              ref={hamburgerPillRef}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: hamburgerPillWidth,
                height: hamburgerPillHeight,
                pointerEvents: 'auto',
                zIndex: 3,
              }}
            >
              <AnimatePresence mode="wait">
                {!isExpanded && showIdlePill && (
                  <motion.div
                    key="hamburger-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                    }}
                  >
                    <LiquidGlassPill
                      filterId={`${hamburgerPillId}-filter`}
                      width={hamburgerPillWidth}
                      height={hamburgerPillHeight}
                      supportsLiquid={supportsLiquid}
                      displacementMapUrl={hamburgerPillFilter.displacementMapUrl}
                      specularMapUrl={hamburgerPillFilter.specularMapUrl}
                      maxDisplacement={hamburgerPillFilter.maxDisplacement}
                      mounted={mounted}
                      noShadow
                    >
                      <div style={{ width: hamburgerPillWidth, height: hamburgerPillHeight }} />
                    </LiquidGlassPill>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleHamburgerClick}
                aria-label="Toggle menu"
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'auto',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <motion.span
                    animate={{
                      rotate: isExpanded ? 45 : 0,
                      y: isExpanded ? 6 : 0,
                      backgroundColor: hamburgerColor,
                    }}
                    transition={{ duration: 0.3, backgroundColor: { duration: 0.3 } }}
                    style={{
                      height: 2,
                      background: hamburgerColor,
                    }}
                  />
                  <motion.span
                    animate={{ 
                      opacity: isExpanded ? 0 : 1,
                      backgroundColor: hamburgerColor,
                    }}
                    transition={{ duration: 0.3, backgroundColor: { duration: 0.3 } }}
                    style={{
                      height: 2,
                      background: hamburgerColor,
                    }}
                  />
                  <motion.span
                    animate={{
                      rotate: isExpanded ? -45 : 0,
                      y: isExpanded ? -6 : 0,
                      backgroundColor: hamburgerColor,
                    }}
                    transition={{ duration: 0.3, backgroundColor: { duration: 0.3 } }}
                    style={{
                      height: 2,
                      background: hamburgerColor,
                    }}
                  />
                </div>
              </button>
            </div>
          )}

          {/* Logo Pill Background - Glass effect only (Mobile) - LiquidGlassPill */}
          {isMobile && (
            <div
              ref={logoPillRef}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
              }}
            >
              <LiquidGlassPill
                filterId={`${logoPillId}-filter-mobile`}
                width={logoPillWidth}
                height={logoPillHeight}
                supportsLiquid={supportsLiquid}
                displacementMapUrl={logoPillFilter.displacementMapUrl}
                specularMapUrl={logoPillFilter.specularMapUrl}
                maxDisplacement={logoPillFilter.maxDisplacement}
                mounted={mounted}
                noShadow
              >
                <div style={{ width: '100%', height: '100%', pointerEvents: 'none', opacity: 0 }} />
              </LiquidGlassPill>
            </div>
          )}

          {/* Logo - Rendered on top without filter (Mobile) */}
          {isMobile && (
            <Link
              href="/"
              aria-label="R² home"
              onClick={(e) => {
                // If already on homepage, smooth scroll to top instead of reloading
                if (pathname === '/') {
                  e.preventDefault();
                  closeNav(); // Close mobile menu if open
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                width: logoPillWidth,
                height: logoPillHeight,
                textDecoration: 'none',
                zIndex: 10,
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'auto',
              }}
            >
              <img
                src="/r2-logo.webp"
                alt="R²"
                loading="eager"
                fetchPriority="high"
                key={`logo-mobile-${logoTheme}`}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: logoPillWidth,
                  maxHeight: logoPillHeight,
                  objectFit: 'contain',
                  filter: logoFilter,
                  transition: 'filter 0.3s ease-in-out',
                  WebkitFilter: logoFilter,
                  pointerEvents: 'none',
                  transform: 'scale(1.0)',
                }}
              />
            </Link>
          )}

          {/* Liquid Glass Container - Only visible on desktop, never on mobile */}
          {!isMobile && mounted ? (
              // Expanded Liquid Glass - Flows from right to left, crashes into logo pill
              <motion.div
                key="expanded-container"
                ref={containerRef}
                initial={isMobile && !mounted ? {
                  width: hamburgerPillWidth,
                } : {
                  width: expandedDimensions.width,
                }}
                animate={{
                  width: expandedDimensions.width,
                }}
                transition={isMobile && !mounted ? {
                  type: 'spring',
                  stiffness: 180,
                  damping: 22,
                  mass: 0.9,
                  velocity: 2,
                } : {
                  duration: 0,
                }}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 32,
                padding: '14px 30px',
                borderRadius: cornerRadius,
                height: barHeight,
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter:
                  mounted && supportsLiquid && expandedFilter.displacementMapUrl
                    ? `url(#${expandedFilterId}-filter)`
                    : 'blur(20px) saturate(180%)',
                WebkitBackdropFilter:
                  mounted && supportsLiquid && expandedFilter.displacementMapUrl
                    ? `url(#${expandedFilterId}-filter)`
                    : 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                clipPath: `inset(0 round ${cornerRadius}px)`,
                transformOrigin: 'right center',
                zIndex: 1,
                pointerEvents: 'auto',
              }}
            >
              <LiquidGlassFilter
                filterId={`${expandedFilterId}-filter`}
                width={expandedDimensions.width}
                height={expandedDimensions.height}
                displacementMapUrl={expandedFilter.displacementMapUrl}
                specularMapUrl={expandedFilter.specularMapUrl}
                maxDisplacement={expandedFilter.maxDisplacement}
              />

              {!supportsLiquid && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: cornerRadius,
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 1,
                      borderRadius: cornerRadius - 1,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              )}

              {/* Navigation Links - Flow from right - Only on desktop */}
              {!isMobile && mounted ? (
                  <motion.nav
                    initial={isMobile && !mounted ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }} // Desktop: no animation, Mobile: enter from right
                    animate={{ opacity: 1, x: 0 }}
                    transition={isMobile && !mounted ? { 
                      delay: 0.1, 
                      duration: 0.36,
                      ease: [0.16, 1, 0.3, 1] // Liquid-like easing
                    } : {
                      duration: 0
                    }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      gap: 'clamp(8px, 1.5vw, 24px)',
                      flexWrap: 'nowrap',
                      zIndex: 100,
                      pointerEvents: 'auto',
                      overflow: 'hidden',
                    }}
                  >
                    {navLinks.map((link, index) => {
                      const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                      const enterStagger = navLinks.length - 1 - index; // rightmost first
                      const isDesktopInitial = !isMobile && mounted; // Desktop on initial mount
                      return (
                        <motion.div
                          key={link.href}
                          initial={isDesktopInitial ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: isDesktopInitial ? {
                              duration: 0
                            } : {
                              delay: 0.18 + enterStagger * 0.035,
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1]
                            }
                          }}
                          style={{
                            transformOrigin: 'left center',
                            position: 'relative',
                            zIndex: 10,
                            pointerEvents: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Link
                            ref={(el) => {
                              if (el) {
                                linkRefs.current[link.href] = el;
                              }
                            }}
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            style={{
                              fontSize: desktopNavFontSize,
                              fontWeight: 700,
                              textDecoration: 'none',
                              transition: 'opacity 0.2s',
                              opacity: isActive ? 1 : 0.85,
                              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0,
                              letterSpacing: '0.02em',
                              cursor: 'pointer',
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              MozUserSelect: 'none',
                              msUserSelect: 'none',
                              position: 'relative',
                              zIndex: 10,
                              pointerEvents: 'auto',
                            }}
                            onClick={(e) => {
                              closeNav();
                              // Handle anchor links with smooth scroll
                              if (link.href.includes('#')) {
                                e.preventDefault();
                                const hash = link.href.split('#')[1];
                                const element = document.getElementById(hash);
                                if (element) {
                                  const headerOffset = (hash === 'edge' || hash === 'process') ? -100 : (hash === 'services' || hash === 'industries') ? -60 : 80;
                                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                                  const targetPosition = elementPosition - headerOffset;

                                  window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                  });

                                  // Dispatch event to trigger founders animation
                                  if (hash === 'team') {
                                    setTimeout(() => {
                                      window.dispatchEvent(new CustomEvent('founders-nav-click'));
                                    }, 500);
                                  }
                                }
                              }
                            }}
                          >
                            {link.label.split('').map((letter, letterIndex) => {
                              if (!letterRefs.current[link.href]) {
                                letterRefs.current[link.href] = {};
                              }
                              return (
                                <span
                                  key={letterIndex}
                                  ref={(el) => {
                                    if (el) {
                                      letterRefs.current[link.href][letterIndex] = el;
                                    }
                                  }}
                                  style={{
                                    color: getLetterColor(link.href, letterIndex),
                                    transition: 'color 0.2s',
                                    display: 'inline-block',
                                  }}
                                >
                                  {letter === ' ' ? '\u00A0' : letter}
                                </span>
                              );
                            })}
                          </Link>
                          {false && (
                            <motion.div
                              data-dropdown-menu
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              onMouseEnter={() => {
                                if (!isMobile) {
                                  if (dropdownTimeoutRef.current) {
                                    clearTimeout(dropdownTimeoutRef.current);
                                    dropdownTimeoutRef.current = null;
                                  }
                                  setOpenDropdown(link.href);
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isMobile) {
                                  // Check if mouse is moving back to trigger
                                  const relatedTarget = e.relatedTarget as HTMLElement;
                                  const currentTarget = e.currentTarget as HTMLElement;
                                  const parent = currentTarget.parentElement;
                                  if (relatedTarget && parent && parent.contains(relatedTarget)) {
                                    return; // Don't close, mouse is moving back to trigger
                                  }
                                  // Close immediately if truly leaving
                                  if (dropdownTimeoutRef.current) {
                                    clearTimeout(dropdownTimeoutRef.current);
                                    dropdownTimeoutRef.current = null;
                                  }
                                  setOpenDropdown(null);
                                }
                              }}
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: '-20px',
                                right: '-20px',
                                marginTop: '8px',
                                minWidth: 200,
                                padding: '10px 12px',
                                borderRadius: 14,
                                background: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.95)',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.35)',
                                backdropFilter: 'blur(16px) saturate(160%)',
                                zIndex: 1000,
                                pointerEvents: 'auto',
                              }}
                            >
                              {/* Invisible bridge area covering the gap - extends upward and sideways to create unified hitbox */}
                              <div
                                onMouseEnter={() => {
                                  if (!isMobile) {
                                    if (dropdownTimeoutRef.current) {
                                      clearTimeout(dropdownTimeoutRef.current);
                                      dropdownTimeoutRef.current = null;
                                    }
                                    setOpenDropdown(link.href);
                                  }
                                }}
                                style={{
                                  position: 'absolute',
                                  bottom: '100%',
                                  left: '-40px',
                                  right: '-40px',
                                  height: '20px',
                                  pointerEvents: 'auto',
                                  zIndex: 1001,
                                }}
                              />
                              {/* Extended hitbox on sides of dropdown */}
                              <div
                                onMouseEnter={() => {
                                  if (!isMobile) {
                                    if (dropdownTimeoutRef.current) {
                                      clearTimeout(dropdownTimeoutRef.current);
                                      dropdownTimeoutRef.current = null;
                                    }
                                    setOpenDropdown(link.href);
                                  }
                                }}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  bottom: 0,
                                  left: '-40px',
                                  width: '40px',
                                  pointerEvents: 'auto',
                                  zIndex: 1001,
                                }}
                              />
                              <div
                                onMouseEnter={() => {
                                  if (!isMobile) {
                                    if (dropdownTimeoutRef.current) {
                                      clearTimeout(dropdownTimeoutRef.current);
                                      dropdownTimeoutRef.current = null;
                                    }
                                    setOpenDropdown(link.href);
                                  }
                                }}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  bottom: 0,
                                  right: '-40px',
                                  width: '40px',
                                  pointerEvents: 'auto',
                                  zIndex: 1001,
                                }}
                              />
                              <div
                                style={{
                                  position: 'relative',
                                  zIndex: 1,
                                }}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  {link.dropdownItems?.map((item) => {
                                    const itemActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                    return (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        style={{
                                          padding: '8px 10px',
                                          borderRadius: 10,
                                          textDecoration: 'none',
                                          color: itemActive ? accentColor : primaryColor,
                                          fontWeight: 600,
                                          transition: 'background 0.2s, color 0.2s',
                                          cursor: 'pointer',
                                          userSelect: 'none',
                                          WebkitUserSelect: 'none',
                                          MozUserSelect: 'none',
                                          msUserSelect: 'none',
                                          pointerEvents: 'auto',
                                        }}
                                        onClick={() => {
                                          // Clear timeout and close immediately
                                          if (dropdownTimeoutRef.current) {
                                            clearTimeout(dropdownTimeoutRef.current);
                                            dropdownTimeoutRef.current = null;
                                          }
                                          setOpenDropdown(null);
                                          closeNav();
                                        }}
                                        onMouseEnter={() => {
                                          // Keep dropdown open when hovering items
                                          if (!isMobile) {
                                            if (dropdownTimeoutRef.current) {
                                              clearTimeout(dropdownTimeoutRef.current);
                                              dropdownTimeoutRef.current = null;
                                            }
                                            setOpenDropdown(link.href);
                                          }
                                        }}
                                      >
                                        {item.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.nav>
              ) : null}
            </motion.div>
          ) : null}
        </div>

        {/* Mobile Liquid Glass Dropdown - SIMPLE FADE */}
        {isMobile && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: 72,
                  right: 16,
                  width: mobileMenuDimensions.width,
                  height: mobileMenuDimensions.height,
                  borderRadius: cornerRadius,
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter:
                    mounted && supportsLiquid && mobileMenuFilter.displacementMapUrl
                      ? `url(#${mobileMenuFilterId}-filter)`
                      : 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter:
                    mounted && supportsLiquid && mobileMenuFilter.displacementMapUrl
                      ? `url(#${mobileMenuFilterId}-filter)`
                      : 'blur(20px) saturate(180%)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  padding: '18px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  zIndex: 1000,
                }}
              >
                <LiquidGlassFilter
                  filterId={`${mobileMenuFilterId}-filter`}
                  width={mobileMenuDimensions.width}
                  height={mobileMenuDimensions.height}
                  displacementMapUrl={mobileMenuFilter.displacementMapUrl}
                  specularMapUrl={mobileMenuFilter.specularMapUrl}
                  maxDisplacement={mobileMenuFilter.maxDisplacement}
                  config={mobileLiquidConfig}
                />

                {!supportsLiquid && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: cornerRadius,
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 1,
                        borderRadius: cornerRadius - 1,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        pointerEvents: 'none',
                      }}
                    />
                  </>
                )}

                <nav
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    zIndex: 2,
                  }}
                >
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                    return (
                      <Link
                        key={link.href}
                        ref={(el) => {
                          if (el) {
                            linkRefs.current[link.href] = el;
                          }
                        }}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          padding: '0 6px',
                          minHeight: 48,
                          lineHeight: 1.3,
                          borderRadius: 8,
                          textDecoration: 'none',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          background: 'transparent',
                          transition: 'opacity 0.2s',
                          opacity: isActive ? 1 : 0.92,
                          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          flex: 1,
                          cursor: 'pointer',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                          pointerEvents: 'auto',
                        }}
                        onClick={(e) => {
                          closeNav();
                          // Handle anchor links with smooth scroll
                          if (link.href.includes('#')) {
                            e.preventDefault();
                            const hash = link.href.split('#')[1];
                            const element = document.getElementById(hash);
                            if (element) {
                              const headerOffset = (hash === 'edge' || hash === 'process') ? -100 : (hash === 'services' || hash === 'industries') ? -60 : 80;
                              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                              const targetPosition = elementPosition - headerOffset;

                              window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                              });

                              // Dispatch event to trigger founders animation
                              if (hash === 'team') {
                                setTimeout(() => {
                                  window.dispatchEvent(new CustomEvent('founders-nav-click'));
                                }, 500);
                              }
                            }
                          }
                        }}
                      >
                        {/* Mobile menu - use fixed dark text color for visibility on glass background */}
                        <span style={{ color: '#1f2937' }}>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </header>
    </>
  );
}
