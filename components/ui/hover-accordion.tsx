"use client"

import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface AccordionItem {
  id: number
  url: string
  title: string
  description: string
}

interface HoverAccordionProps {
  items: AccordionItem[]
}

/**
 * HoverAccordion - Restored to working flex animation
 * Framer Motion handles flex animations with transforms internally
 */
export function HoverAccordion({ items }: HoverAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(2)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setActiveIndex(null)
    } else {
      setActiveIndex(2)
    }
  }, [isMobile])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        height: isMobile ? 'auto' : 'clamp(400px, 60vh, 600px)',
        gap: isMobile ? 16 : 4,
        overflow: 'hidden',
        borderRadius: 24,
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          layout
          style={{
            position: 'relative',
            cursor: isMobile ? 'default' : 'pointer',
            overflow: 'hidden',
            borderRadius: 20,
            minWidth: 0,
            minHeight: isMobile ? 200 : undefined,
          }}
          initial={false}
          animate={{
            flex: isMobile ? 'none' : (activeIndex === index ? 5 : 1),
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          onMouseEnter={() => !isMobile && setActiveIndex(index)}
          onFocus={() => !isMobile && setActiveIndex(index)}
          onClick={() => isMobile && setActiveIndex(activeIndex === index ? null : index)}
          tabIndex={0}
          role="button"
          aria-expanded={isMobile ? true : activeIndex === index}
        >
          <img
            src={item.url}
            alt={item.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            draggable={false}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
              pointerEvents: 'none',
            }}
          />

          <AnimatePresence>
            {(isMobile || activeIndex === index) && (
              <motion.article
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: isMobile ? '16px 20px' : 'clamp(24px, 4vw, 40px)',
                  color: '#ffffff',
                }}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: isMobile ? '1.1rem' : 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: isMobile ? '0.875rem' : 'clamp(0.875rem, 1.5vw, 1rem)',
                    opacity: 0.9,
                    lineHeight: 1.5,
                    maxWidth: 600,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.description}
                </p>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Default items
export const defaultAccordionItems: AccordionItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
    title: "Misty Mountain Majesty",
    description: "A breathtaking view of misty mountains shrouded in clouds, creating an ethereal landscape.",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
    title: "Winter Wonderland",
    description: "A serene winter scene with snow-covered trees and mountains, showcasing nature's pristine beauty.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
    title: "Autumn Mountain Retreat",
    description: "A cozy cabin nestled in the mountains, surrounded by the vibrant colors of autumn foliage.",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1640998516447-fa47d248c73c?q=80&w=1200&auto=format",
    title: "Coastal Serenity",
    description: "Crystal clear waters meet golden sands in this peaceful coastal paradise.",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1686771418282-6e6034da5d22?q=80&w=1200&auto=format",
    title: "Forest Whispers",
    description: "Ancient trees stand tall in this mystical forest, their canopy filtering ethereal light.",
  },
]
