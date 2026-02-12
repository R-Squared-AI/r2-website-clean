'use client';

import { useRef, useCallback, useEffect } from 'react';

/**
 * useGPUScroll - GPU-optimized scroll handler hook
 *
 * This hook ensures scroll handlers are batched using requestAnimationFrame
 * and use passive event listeners for optimal performance.
 *
 * Key principles:
 * 1. Uses requestAnimationFrame to batch DOM updates
 * 2. Uses passive: true scroll listeners (never blocks scrolling)
 * 3. Ticking flag prevents multiple RAF calls per frame
 *
 * @param callback - Function called with current scrollY value
 * @param deps - Optional dependencies array for the callback
 *
 * @example
 * ```tsx
 * useGPUScroll((scrollY) => {
 *   // Update state or perform calculations here
 *   setScrollPosition(scrollY);
 * });
 * ```
 */
export function useGPUScroll(
  callback: (scrollY: number) => void,
  deps: React.DependencyList = []
) {
  const ticking = useRef(false);

  // Memoize callback to avoid unnecessary re-registrations
  const memoizedCallback = useCallback(callback, deps);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        memoizedCallback(window.scrollY);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [memoizedCallback]);

  useEffect(() => {
    // Register scroll listener with passive: true
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Call once on mount to initialize
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
}

/**
 * useGPUScrollProgress - Returns normalized scroll progress (0-1) for a target element
 *
 * @param targetRef - Ref to the element to track scroll progress for
 * @param offset - Start/end offset configuration
 * @returns Current scroll progress (0-1)
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const progress = useGPUScrollProgress(containerRef);
 * ```
 */
export function useGPUScrollProgress(
  targetRef: React.RefObject<HTMLElement>,
  offset: { start?: number; end?: number } = {}
) {
  const { start = 0, end = 1 } = offset;
  const ticking = useRef(false);
  const progressRef = useRef(0);

  const calculateProgress = useCallback(() => {
    if (!targetRef.current) return 0;

    const rect = targetRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate raw progress (0 = element top at viewport bottom, 1 = element bottom at viewport top)
    const rawProgress = (viewportHeight - elementTop) / (viewportHeight + elementHeight);

    // Clamp and normalize based on offset
    const normalizedProgress = Math.max(0, Math.min(1, (rawProgress - start) / (end - start)));

    return normalizedProgress;
  }, [targetRef, start, end]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          progressRef.current = calculateProgress();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [calculateProgress]);

  return progressRef;
}

/**
 * useGPUResize - GPU-optimized resize handler hook
 *
 * Same RAF batching pattern as useGPUScroll but for resize events.
 *
 * @param callback - Function called on resize with window dimensions
 */
export function useGPUResize(
  callback: (width: number, height: number) => void,
  deps: React.DependencyList = []
) {
  const ticking = useRef(false);

  const memoizedCallback = useCallback(callback, deps);

  const handleResize = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        memoizedCallback(window.innerWidth, window.innerHeight);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [memoizedCallback]);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
}
