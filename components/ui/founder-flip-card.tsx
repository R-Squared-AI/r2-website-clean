"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface FounderFlipCardProps {
  name: string
  fullName?: string
  role: string
  image: string
  description: string
  linkedInUrl?: string
  index: number
  /** If true, removes box shadow and reduces border radius for cleaner look */
  noShadow?: boolean
}

export function FounderFlipCard({ name, fullName, role, image, description, linkedInUrl, index, noShadow = false }: FounderFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .desktop-only { display: block; }
        .mobile-only { display: none; }
        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
          .founder-description-text { font-size: 0.9375rem !important; line-height: 1.7 !important; }
          .founder-card-back { padding-top: 20px !important; }
        }
      `}} />
    {/* Perspective parent - plain div with no transforms */}
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Animation wrapper - separate from perspective to fix Safari backface-visibility */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: '100%',
          touchAction: 'pan-y', // Allow vertical page scrolling on mobile
        }}
        onMouseEnter={() => { if (!isMobile) setIsFlipped(true); }}
        onMouseLeave={() => { if (!isMobile) setIsFlipped(false); }}
        onClick={() => { if (isMobile) setIsFlipped(!isFlipped); }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${name} - ${role}. Click or hover to see more information.`}
      >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of card */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: noShadow ? '12px' : '20px',
            overflow: 'hidden',
            boxShadow: noShadow ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.12)',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image - maintains aspect ratio, never stretches */}
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: '#e5e7eb',
              }}
            >
              <img
                src={image}
                alt={name}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              
              {/* Gradient overlay at bottom for text readability */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '120px',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
                  pointerEvents: 'none',
                }}
              />
              
              {/* Name and Role - Clean horizontal layout at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Name and Role together */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(2, 80, 130, 0.95) 0%, rgba(1, 58, 95, 0.95) 100%)',
                    padding: '10px 20px',
                    borderRadius: '24px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      color: '#fff',
                      fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                      fontWeight: 700,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                      fontWeight: 500,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="founder-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: noShadow ? '12px' : '20px',
            overflow: 'hidden',
            boxShadow: noShadow ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.12)',
            background: '#fff',
            transform: 'rotateY(180deg)',
            padding: 'clamp(16px, 3vw, 32px)',
            paddingTop: 'clamp(40px, 8vh, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {/* Name and role - styled text, not a pill */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(16px, 2vw, 24px)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                fontWeight: 700,
                color: '#032CC8',
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                lineHeight: 1.3,
              }}
            >
              {fullName || name}
            </div>
            <div
              style={{
                fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                fontWeight: 500,
                color: '#032CC8',
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontStyle: 'italic',
                opacity: 0.75,
                marginTop: 4,
              }}
            >
              {role}
            </div>
          </div>

          {/* Description text - centered */}
          <div
            style={{
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div
              className="founder-description-text"
              style={{
                fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
                color: '#1f2937',
                lineHeight: 1.6,
                textAlign: 'center',
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              {description}
            </div>
          </div>

          {/* LinkedIn link - centered at bottom */}
          {linkedInUrl && (
            <div
              style={{
                marginTop: 'clamp(12px, 2vw, 20px)',
                display: 'flex',
                justifyContent: 'center',
                flexShrink: 0,
                width: '100%',
              }}
            >
              <Link
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#032CC8',
                  fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
                  fontWeight: 600,
                  fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0077b5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#032CC8';
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
    </div>
    </>
  )
}
