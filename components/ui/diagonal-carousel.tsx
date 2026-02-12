"use client"

import React, { useState, useCallback, useEffect, ReactNode } from "react"
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
 */
export function DiagonalCarousel({ items, title = "Why leading teams trust R²" }: DiagonalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Swipe gesture state for mobile
  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

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

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '600px' }}>
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
        {/* Navigation buttons - hidden on mobile */}
        <div style={{ display: isMobile ? 'none' : 'flex', gap: 12 }}>
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
          height: isMobile ? 'clamp(400px, 50vh, 500px)' : 'clamp(500px, 60vh, 700px)',
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          isolation: 'isolate',
          // Smooth drag gesture on mobile
          ...(isMobile && {
            x: dragX,
            touchAction: 'pan-y', // Allow vertical page scroll while dragging horizontally
          }),
        }}
        // Enable drag gestures on mobile only
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
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
              flexDirection: isMobile ? 'column' : 'row',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Left Panel - Text (FIXED 50% width, content animates with transform/opacity) */}
            <div
              style={{
                width: isMobile ? '100%' : '50%',
                height: isMobile ? '50%' : '100%',
                background: '#fff',
                padding: isMobile ? '20px' : '48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isMobile ? 'center' : 'flex-end',
                position: 'relative',
                zIndex: 2,
                order: isMobile ? 2 : 1,
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
                width: isMobile ? '100%' : '50%',
                height: isMobile ? '50%' : '100%',
                position: 'relative',
                overflow: 'hidden',
                order: isMobile ? 1 : 2,
              }}
            >
              {/* Image container - GPU-accelerated scale animation */}
              <motion.div
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{
                  scale: isExpanded ? 1 : 1.1,
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

      {/* Progress Bar - uses swipeProgress on mobile for smooth animation during drag */}
      <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
        <ProgressBar
          total={items.length}
          current={currentIndex}
          swipeProgress={isMobile && isDragging ? swipeProgress : undefined}
        />
      </div>
    </div>
  )
}
