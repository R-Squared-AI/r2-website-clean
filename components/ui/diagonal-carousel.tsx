"use client"

import React, { useState, useCallback, useEffect, ReactNode, useRef } from "react"
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, animate } from "framer-motion"
import { ProgressBar } from "./progress-bar"

interface DiagonalCarouselItem {
  title: string
  company?: string
  quote?: string
  attribution?: string
  image: string
}

interface DiagonalCarouselProps {
  items: DiagonalCarouselItem[]
  title?: ReactNode
}

/**
 * DiagonalCarousel - GPU-ACCELERATED VERSION
 *
 * Key changes for 60fps performance:
 * - NO width animations (triggers layout)
 * - NO clipPath animations (triggers paint)
 * - Uses ONLY transform and opacity (GPU-composited)
 * - Image scales/translates instead of panel resizing
 *
 * MOBILE: Native scroll-snap horizontal carousel with infinite loop
 */
export function DiagonalCarousel({ items, title = "Why leading teams trust R²" }: DiagonalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Swipe gesture state for mobile (desktop only now)
  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  // Mobile scroll-snap state
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout>(undefined)

  // Continuous swipe progress (0 to items.length-1) for smooth progress bar animation
  const swipeProgress = useTransform(
    dragX,
    [-300, 0, 300], // Drag distance in pixels
    [
      currentIndex + 1 > items.length - 1 ? 0 : currentIndex + 1,
      currentIndex,
      currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1
    ]
  )

  // Mobile detection with passive listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile scroll-snap: Initialize to middle clone set
  useEffect(() => {
    if (!mobileScrollRef.current) return
    const container = mobileScrollRef.current
    const cardWidth = container.scrollWidth / 9 // 9 cards total (3 sets of 3)
    // Scroll to middle set (cards 3-5, 0-indexed)
    container.scrollTo({ left: cardWidth * 3, behavior: 'instant' })
  }, [])

  // Mobile scroll-snap: Track active card and handle infinite loop
  useEffect(() => {
    if (!mobileScrollRef.current) return
    const container = mobileScrollRef.current

    const handleScroll = () => {
      const cardWidth = container.scrollWidth / 9
      const scrollLeft = container.scrollLeft
      const viewportCenter = scrollLeft + container.clientWidth / 2

      // Find closest card to viewport center
      const closestIdx = Math.round(viewportCenter / cardWidth)
      const realIndex = closestIdx % items.length
      setMobileActiveIndex(realIndex)

      // Clear existing timeout
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current)
      }

      // After scroll ends, check if we need to jump to middle set
      scrollEndTimeoutRef.current = setTimeout(() => {
        const currentCardIndex = Math.round(scrollLeft / cardWidth)

        // If in first clone set (0-2), jump to middle set (3-5)
        if (currentCardIndex < 3) {
          const targetScroll = (currentCardIndex + 3) * cardWidth
          container.scrollTo({ left: targetScroll, behavior: 'instant' })
        }
        // If in last clone set (6-8), jump to middle set (3-5)
        else if (currentCardIndex > 5) {
          const targetScroll = (currentCardIndex - 3) * cardWidth
          container.scrollTo({ left: targetScroll, behavior: 'instant' })
        }
      }, 150)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current)
      }
    }
  }, [items.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsExpanded(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
      setTimeout(() => {
        setIsExpanded(true)
        setTimeout(() => setIsAnimating(false), 600)
      }, 50)
    }, 400)
  }, [items.length, isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsExpanded(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
      setTimeout(() => {
        setIsExpanded(true)
        setTimeout(() => setIsAnimating(false), 600)
      }, 50)
    }, 400)
  }, [items.length, isAnimating])

  // Swipe gesture handlers for mobile
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50 // Minimum swipe distance to trigger navigation
    const swipeVelocityThreshold = 500 // Minimum velocity to trigger navigation

    setIsDragging(false)

    // Check if swipe was significant enough
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocityThreshold) {
      if (info.offset.x > 0) {
        // Swiped right - go to previous
        handlePrev()
      } else {
        // Swiped left - go to next
        handleNext()
      }
    }

    // Reset drag position
    animate(dragX, 0, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    })
  }, [handlePrev, handleNext, dragX])

  const currentItem = items[currentIndex]

  // Create 3 clone sets for infinite loop on mobile
  const mobileClonedItems = [...items, ...items, ...items]

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '600px' }}>
      {/* CSS for desktop/mobile toggle */}
      <style dangerouslySetInnerHTML={{__html: `
        .dc-desktop { display: block; }
        .dc-mobile { display: none; }
        @media (max-width: 768px) {
          .dc-desktop { display: none; }
          .dc-mobile { display: block; }
        }
        .dc-mobile-scroll {
          scroll-behavior: smooth;
        }
        .dc-mobile-scroll::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* DESKTOP VERSION */}
      <div className="dc-desktop">
        {/* Title and Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 48,
        }}>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 700,
              color: '#111827',
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              width: '100%',
              maxWidth: '100%',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
          {/* Navigation buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handlePrev}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              border: '1px solid #e5e7eb',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#025082';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="#025082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              border: '1px solid #e5e7eb',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#025082';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="#025082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        </div>

        {/* Carousel Content - GPU-ACCELERATED */}
        <motion.div
          className="carousel-container"
          style={{
            position: 'relative',
            height: 'clamp(500px, 60vh, 700px)',
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            isolation: 'isolate',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              {/* Left Panel - Text (FIXED 50% width, content animates with transform/opacity) */}
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  background: '#fff',
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Text content - GPU-accelerated with transform and opacity ONLY */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    y: isExpanded ? 0 : 30,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  {currentItem.company && (
                    <div
                      style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        fontWeight: 600,
                        color: '#025082',
                        marginBottom: 24,
                        fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      }}
                    >
                      {currentItem.company}
                    </div>
                  )}
                  {currentItem.quote && (
                    <p
                      style={{
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
                        color: '#1f2937',
                        lineHeight: 1.7,
                        marginBottom: 24,
                        fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      }}
                    >
                      {currentItem.quote}
                    </p>
                  )}
                  {currentItem.attribution && (
                    <p
                      style={{
                        fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                        color: '#6b7280',
                        fontStyle: 'italic',
                        fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      }}
                    >
                      {currentItem.attribution}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Right Panel - Image (FIXED 50% width, image animates with transform/opacity) */}
              <div
                className="carousel-container"
                style={{
                  width: '50%',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Image container - GPU-accelerated scale animation */}
                <motion.div
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{
                    scale: isExpanded ? 1.05 : 1.1,
                    opacity: isExpanded ? 1 : 0.8,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar - desktop only */}
        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
          <ProgressBar
            total={items.length}
            current={currentIndex}
          />
        </div>
      </div>

      {/* MOBILE VERSION - Native scroll-snap carousel */}
      <div className="dc-mobile">
        {/* Title */}
        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#111827',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            width: '100%',
            maxWidth: '100%',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 48,
          }}
        >
          {title}
        </h2>

        {/* Native scroll container with infinite loop */}
        <div
          ref={mobileScrollRef}
          className="dc-mobile-scroll"
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            paddingLeft: 'max(24px, env(safe-area-inset-left))',
            paddingRight: 'max(24px, env(safe-area-inset-right))',
            marginLeft: 'calc(-1 * max(24px, env(safe-area-inset-left)))',
            marginRight: 'calc(-1 * max(24px, env(safe-area-inset-right)))',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {mobileClonedItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                flexShrink: 0,
                width: 'calc(100vw - 48px)',
                height: 450,
                borderRadius: 16,
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always',
              }}
            >
              {/* Background image */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Dark gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 32,
                  color: '#fff',
                }}
              >
                {item.company && (
                  <div
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      fontWeight: 700,
                      marginBottom: 16,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.company}
                  </div>
                )}
                {item.quote && (
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      lineHeight: 1.6,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                      marginBottom: 12,
                    }}
                  >
                    {item.quote}
                  </p>
                )}
                {item.attribution && (
                  <p
                    style={{
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      opacity: 0.9,
                      fontStyle: 'italic',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.attribution}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile progress dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 24,
          }}
        >
          {items.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: mobileActiveIndex === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: mobileActiveIndex === idx ? '#025082' : '#d1d5db',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
