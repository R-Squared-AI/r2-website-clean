/**
 * R² Solutions - Main Homepage
 * Clean, simple scrolling - no complex animations
 */
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import existing UI components
const Particles = dynamic(() => import('@/components/ui/particles').then(mod => ({ default: mod.Particles })), { ssr: false });
const IconCloud = dynamic(() => import('@/components/ui/icon-cloud').then(mod => ({ default: mod.IconCloud })), { ssr: false });
import { NeumorphicButton } from '@/components/ui/neumorphic-button';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { DiagonalCarousel } from '@/components/ui/diagonal-carousel';
import { FounderFlipCard } from '@/components/ui/founder-flip-card';
import { HoverAccordion } from '@/components/ui/hover-accordion';

// AI Capabilities data (How We Think)
const aiCapabilities = [
  {
    title: 'One Brain To Rule Them All',
    description: 'Our agents connect Salesforce, your ERP, email, and conversation data into a single intelligence layer -so your forecast reflects reality.',
    image: '/images/top-ai-r2-topaz.webp',
  },
  {
    title: 'Built by Operators for Operators',
    description: "Our founding team has carried quota, architected enterprise systems, and deployed AI agents running production workloads in production. We've sat in your chair. We know what actually ships.",
    image: '/images/Middle.webp',
  },
  {
    title: 'Enterprise-Grade Security, No Exceptions',
    description: 'Regulatory ready. Full audit trails on every AI decision. Your legal and procurement teams will have zero objections.',
    image: '/images/bottom-ai-r2-topaz.webp',
  },
];

// Industries data (REDUCED to 3)
const industries = [
  {
    name: 'Private Equity',
    image: '/images/industries/private-equity.webp',
    description: 'Portfolio companies need fast wins. We deliver wins fast.',
    expandedContent: 'Your portfolio companies operate on tight timelines. Our AI agents deploy in weeks, not quarters - improving pipeline visibility, forecast accuracy, and rep productivity within the first 90 days. Built for the velocity PE-backed companies demand.',
  },
  {
    name: 'Insurance',
    image: '/images/industries/insurance-new.webp',
    description: 'We enable producers. Simple as that.',
    expandedContent: 'Our AI agents handle the admin work - call notes, CRM updates, renewal tracking - so producers can focus on what they do best: building client relationships and writing business. AI-powered underwriting assistance, claims automation, and policyholder engagement.',
  },
  {
    name: 'Manufacturing',
    image: '/images/industries/manufacturing.webp',
    description: 'Long cycles, complex products. We track it all.',
    expandedContent: 'Manage multi-year relationships and complex product portfolios with AI that surfaces opportunities for your reps.',
  },
];

// Removed scroll-linked color stops


// Simple Hero Section - dark background with particles
function SimpleHeroSection() {
  return (
    <section
      data-header-theme="light"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particles background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        <Particles
          className="absolute inset-0"
          quantity={150}
          ease={80}
          color="#032CC8"
          size={0.5}
          refresh={false}
        />
      </div>

      {/* Hero content */}
      <HeroContentSection />

      {/* Animated scroll arrow */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 4vh, 48px)',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}

// Combined Skyline + How We Think Section
function CombinedSkylineHowWeThinkSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hwtProgress, setHwtProgress] = useState(0); // 0 = below image, 1 = centered
  const sectionRef = useRef<HTMLDivElement>(null);
  const skylineTextRef = useRef<HTMLDivElement>(null);

  // Track scroll to animate "HOW WE THINK" heading from below to center
  useEffect(() => {
    const onScroll = () => {
      const textEl = skylineTextRef.current;
      if (!textEl) return;
      const textRect = textEl.getBoundingClientRect();
      // Heading starts entering when skyline text bottom is at ~60% of viewport
      // Heading fully centered when skyline text is fully above viewport
      const start = window.innerHeight * 0.6;
      const end = 0;
      const progress = Math.min(1, Math.max(0, (start - textRect.bottom) / (start - end)));
      setHwtProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hwt-card-zigzag { width: 42%; max-width: 500px; }
        .hwt-card-zigzag:nth-child(odd) { margin-left: clamp(24px, 5vw, 80px); margin-right: auto; transform: rotate(-3.5deg); }
        .hwt-card-zigzag:nth-child(even) { margin-left: auto; margin-right: clamp(24px, 5vw, 80px); transform: rotate(3.5deg); }
        .combined-skyline-mobile-only { display: none; }
        .combined-skyline-desktop-only { display: block; }
        @media (max-width: 768px) {
          .hwt-card-zigzag {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            transform: none !important;
            margin-bottom: 48px !important;
          }
          .hwt-card-zigzag:last-child { margin-bottom: 0 !important; }
          .combined-skyline-section { height: auto !important; }
          .combined-skyline-img-sticky { position: static !important; height: min(60vh, 500px) !important; }
          .combined-skyline-text { margin-top: 0 !important; margin-bottom: 0 !important; height: auto !important; min-height: 0 !important; padding: 60px 24px 40px !important; }
          .combined-hwt-sticky { position: absolute !important; top: 50% !important; transform: translateY(-50%) !important; }
          .combined-skyline-mobile-only { display: block; }
          .combined-skyline-desktop-only { display: none; }
        }
      `}} />
      <section
        className="combined-skyline-section"
        style={{
          position: 'relative',
          width: '100%',
          height: '420vh',
        }}
      >
        {/* Skyline IMAGE only — sticky fullscreen background */}
        <div
          className="combined-skyline-img-sticky"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/city-skyline.webp"
            alt="City Skyline"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
            }}
          />

          {/* "HOW WE THINK" heading — inside sticky image, scroll-animated from below to center */}
          <div
            className="combined-hwt-sticky"
            data-header-theme="dark"
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              // Starts at translateY(50%) (below center), ends at translateY(-50%) (centered)
              // The 100% range: -50% is centered, +50% is off-screen below center
              transform: `translateY(${-50 + (1 - hwtProgress) * 100}%)`,
              opacity: hwtProgress,
              zIndex: 2,
              textAlign: 'center',
              padding: '24px 16px',
              pointerEvents: 'none',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)',
                margin: 0,
              }}
            >
              HOW WE THINK
            </h2>
          </div>
        </div>

        {/* Skyline TEXT — normal flow, overlaps image via negative margin, scrolls out naturally */}
        <div
          ref={skylineTextRef}
          className="combined-skyline-text"
          data-header-theme="dark"
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: '-100vh',
            minHeight: '100vh',
            marginBottom: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 16,
              textAlign: 'center',
              textShadow: '0 1px 8px rgba(0,0,0,0.6)',
            }}
          >
            From discovery to deployed agents in 6-8 weeks. Not slidewares. Working systems.
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              maxWidth: '1200px',
              textShadow: '0 2px 16px rgba(0,0,0,0.8)',
            }}
          >
            WHAT YOUR SALES PROCESS LOOKS LIKE WITH R<sup style={{ fontSize: '0.6em' }}>2</sup>
          </h2>
        </div>

        {/* Cards container — normal flow, scrolls over heading */}
        <div
          data-header-theme="dark"
          style={{
            position: 'relative',
            zIndex: 4,
            padding: 'clamp(300px, 50vh, 600px) clamp(24px, 4vw, 48px) 120px',
            paddingLeft: 'max(clamp(24px, 4vw, 48px), env(safe-area-inset-left))',
            paddingRight: 'max(clamp(24px, 4vw, 48px), env(safe-area-inset-right))',
          }}
        >
          {aiCapabilities.map((item, index) => (
            <div
              key={index}
              className="hwt-card-zigzag"
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                marginBottom: index < aiCapabilities.length - 1 ? 200 : 0,
                cursor: 'pointer',
                touchAction: 'pan-y',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={(e) => {
                setHoveredCard(hoveredCard === index ? null : index)
              }}
              onTouchEnd={(e) => {
                // Don't prevent default - allow native scroll
              }}
              onTouchCancel={() => setHoveredCard(null)}
            >
              {/* Card image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Light gradient overlay (always visible) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)',
                }}
              />
              {/* Dark hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(2, 50, 100, 0.88)',
                  opacity: hoveredCard === index ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Default content (title + hint) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
                  opacity: hoveredCard === index ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="combined-skyline-desktop-only"
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  Hover for more
                </p>
                <p
                  className="combined-skyline-mobile-only"
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  Tap for more
                </p>
              </div>
              {/* Hover/tap content (description) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '24px',
                  opacity: hoveredCard === index ? 1 : 0,
                  transform: hoveredCard === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// Industries Section - Sticky left heading, scrolling right cards with hover overlay
function SimpleIndustriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .wws-layout {
          display: grid;
          grid-template-columns: 1.2fr 1.5fr;
          gap: 48px;
          align-items: start;
        }
        .wws-heading {
          position: sticky;
          top: clamp(80px, 10vh, 120px);
          align-self: start;
        }
        .wws-card-hint-desktop { display: block; }
        .wws-card-hint-mobile { display: none; }
        @media (max-width: 768px) {
          .wws-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .wws-heading {
            position: static;
          }
          .wws-card-hint-desktop { display: none; }
          .wws-card-hint-mobile { display: block; }
        }
      `}} />
      <section
        data-header-theme="light"
        style={{
          position: 'relative',
          width: '100%',
          background: '#ffffff',
          padding: 'clamp(140px, 20vh, 240px) clamp(24px, 4vw, 48px) clamp(80px, 12vh, 120px)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="wws-layout">
            {/* Left column - Sticky heading */}
            <div className="wws-heading">
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: '#111827',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                WHO WE SERVE
              </h2>
            </div>

            {/* Right column - Scrolling cards with hover overlay */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {industries.map((industry, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    height: '280px',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    touchAction: 'pan-y',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => {
                    setHoveredIndex(hoveredIndex === index ? null : index);
                  }}
                  onTouchEnd={() => {
                    // Don't prevent default - allow native scroll
                  }}
                  onTouchCancel={() => setHoveredIndex(null)}
                >
                  {/* Card image */}
                  <img
                    src={industry.image}
                    alt={industry.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Light gradient overlay (always visible) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />
                  {/* Dark hover overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.75)',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  {/* Default content (name + description + hint) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px',
                      opacity: hoveredIndex === index ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 'clamp(1.3rem, 1.8vw, 1.5rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {industry.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.6,
                        marginBottom: 6,
                      }}
                    >
                      {industry.description}
                    </p>
                    <p
                      className="wws-card-hint-desktop"
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'italic',
                        margin: 0,
                      }}
                    >
                      Hover for more
                    </p>
                    <p
                      className="wws-card-hint-mobile"
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'italic',
                        margin: 0,
                      }}
                    >
                      Tap for more
                    </p>
                  </div>
                  {/* Hover/tap content (expanded details) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '24px',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: 12,
                        lineHeight: 1.3,
                      }}
                    >
                      {industry.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {industry.expandedContent}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


// Expandable Email Signup - button that animates into Beehiiv form
function ExpandableEmailSignup({ onExpandChange }: { onExpandChange?: (expanded: boolean) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Notify parent when expanded state changes
  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile after mount
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset hover state and iframe loaded state when expanding/collapsing
  useEffect(() => {
    setIsHovered(false);
    if (!isExpanded) setIframeLoaded(false);
  }, [isExpanded]);

  // Click outside to collapse
  useEffect(() => {
    if (!isExpanded) return;

    const collapse = () => {
      setIsExpanded(false);
      setIsHovered(false);
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      // Don't collapse if clicking on the form or iframe
      if (target.closest('.mobile-beehiiv-portal') || target.tagName === 'IFRAME') {
        return;
      }
      if (containerRef.current?.contains(target)) {
        return;
      }
      collapse();
    };

    const handleScroll = () => {
      if (!isMobile) collapse();
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded, isMobile]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {/* Button — remains in normal flow, preserves space */}
        <button
          onClick={() => !isExpanded && setIsExpanded(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsHovered(false), 200);
          }}
          onTouchCancel={() => setIsHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: '#ffffff',
            padding: '1em 1.8em',
            borderRadius: 10,
            border: isHovered && !isExpanded ? '2px solid rgba(0, 0, 0, 0.15)' : '2px solid rgba(0, 0, 0, 0.1)',
            cursor: isExpanded ? 'default' : 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#032CC8',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            pointerEvents: isExpanded ? 'none' : 'auto',
            opacity: isExpanded ? 0 : 1,
            transform: isHovered && !isExpanded ? 'translateY(8px)' : 'translateY(0)',
            boxShadow: isHovered && !isExpanded
              ? 'inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7), -0.5px -0.5px 0px rgba(255, 255, 255, 1), 0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05)'
              : '6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7)',
            transition: 'opacity 0.4s ease-out 0.05s, transform 0.2s ease-out, box-shadow 0.2s ease-out, border 0.2s ease-out',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        >
          Join Squared Away
        </button>

        {/* Desktop form — absolutely positioned, overlays without affecting layout */}
        {!isMobile && isExpanded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
              transformOrigin: 'top left',
              opacity: iframeLoaded ? 1 : 0,
              transform: iframeLoaded ? 'scale(1)' : 'scale(0.98)',
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              pointerEvents: 'auto',
            }}
          >
            <iframe
              src="https://subscribe-forms.beehiiv.com/f50f3b9c-7e15-47ab-bcad-7e9159ca428b"
              className="beehiiv-embed"
              data-test-id="beehiiv-embed"
              frameBorder="0"
              scrolling="no"
              onLoad={() => setIframeLoaded(true)}
              style={{
                width: '550px',
                height: '280px',
                margin: 0,
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
          </div>
        )}

        {/* Desktop skeleton — visible while iframe loads */}
        {!isMobile && isExpanded && !iframeLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '550px',
              height: '280px',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              zIndex: 9,
              opacity: 1,
              transition: 'opacity 0.3s ease-out',
            }}
          />
        )}
      </div>

      {/* Shimmer animation for skeleton */}
      {isExpanded && !iframeLoaded && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}} />
      )}

      {/* Mobile form - Portal to escape BlurFade transform */}
      {mounted && isMobile && isExpanded && createPortal(
        <div
          className="mobile-beehiiv-portal"
          style={{
            position: 'fixed',
            top: '60vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '400px',
            zIndex: 9999,
          }}
        >
          {/* Mobile iframe - NO data-test-id to avoid embed.js errors with portals */}
          <iframe
            src="https://subscribe-forms.beehiiv.com/f50f3b9c-7e15-47ab-bcad-7e9159ca428b"
            frameBorder="0"
            scrolling="no"
            style={{
              width: '100%',
              height: '220px',
              margin: 0,
              borderRadius: '0px',
              backgroundColor: 'transparent',
              boxShadow: '0 0 #0000',
              maxWidth: '100%',
            }}
          />
        </div>,
        document.body
      )}
    </>
  );
}

// Hero Content Component with mobile responsiveness
function HeroContentSection() {
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-content-container {
          flex-direction: row;
          text-align: left;
          gap: clamp(32px, 5vw, 60px);
          justify-content: space-between;
        }
        .hero-text-content h1 {
          font-size: clamp(2.2rem, 5vw, 4rem);
        }
        .hero-text-content p {
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          max-width: 550px;
          margin-left: 0;
          margin-right: 0;
        }
        .hero-cta-buttons {
          justify-content: flex-start;
        }
        .hero-right-image {
          display: block;
        }
        @media (max-width: 768px) {
          .hero-content-container {
            flex-direction: column;
            text-align: center;
            gap: 24px;
            justify-content: center;
          }
          .hero-text-content h1 {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }
          .hero-text-content p {
            font-size: 0.95rem;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            color: #4b5563;
          }
          .hero-cta-buttons {
            justify-content: center;
          }
          .hero-right-image {
            display: none;
          }
        }
      `}} />
      <div className="hero-content-container" style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(24px, 4vw, 48px)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Left side - Text content */}
        <div className="hero-text-content" style={{ position: 'relative', zIndex: 1, flex: 1 }}>
          <h1 style={{
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            color: '#111827',
          }}>
            AI that carries quota alongside your reps.
          </h1>
          <p style={{
            lineHeight: 1.6,
            marginTop: 0,
            marginBottom: 24,
            color: '#6b7280',
          }}>
            Production-grade AI agents that listen to your sales activity, update your CRM, and surface pipeline opportunities and risk.
          </p>
          <div className="hero-cta-buttons" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
              {!isFormExpanded && (
                <a
                  key="get-in-touch-btn"
                  href="https://form.typeform.com/to/XPforiEB"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    background: '#ffffff',
                    padding: '1em 1.8em',
                    borderRadius: 10,
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#032CC8',
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    textDecoration: 'none',
                    boxShadow: '6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7)',
                    transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
                    opacity: isFormExpanded ? 0 : 1,
                    transform: 'scale(1)',
                    // iOS Safari tap optimization
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                  // CSS-based hover for smooth non-stuck animations
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(8px)';
                    e.currentTarget.style.boxShadow = 'inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7), -0.5px -0.5px 0px rgba(255, 255, 255, 1), 0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7)';
                  }}
                  // Touch event handlers to force-reset animation on mobile
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'translateY(8px)';
                    e.currentTarget.style.boxShadow = 'inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7), -0.5px -0.5px 0px rgba(255, 255, 255, 1), 0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7)';
                  }}
                  onTouchCancel={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7)';
                  }}
                >
                  Get In Touch
                </a>
              )}
              <ExpandableEmailSignup onExpandChange={setIsFormExpanded} />
            </div>
        </div>

        {/* Right side - Vertical image - Hidden on mobile via CSS */}
        <div className="hero-right-image" style={{
          flex: '0 0 auto',
          width: 'clamp(220px, 25vw, 320px)',
          height: 'clamp(400px, 60vh, 550px)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}>
          <img
            src="/images/hero-image.webp"
            alt="R² AI Hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <div style={{
      width: '100%',
      position: 'relative',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)',
    }}>

      {/* ===== SECTION 1: HERO ===== */}
      <SimpleHeroSection />

      {/* ===== SECTION 2+3: SKYLINE + HOW WE THINK ===== */}
      <div id="about">
        <CombinedSkylineHowWeThinkSection />
      </div>

      {/* ===== SECTION 4: WHAT WE DO / SOLUTIONS CARDS ===== */}
      <div id="services" style={{ position: 'relative', zIndex: 4 }} data-header-theme="light">
        <WhatWeDoAnimated />
      </div>

      {/* ===== SECTION 5: INDUSTRIES ===== */}
      <div id="industries">
        <SimpleIndustriesSection />
      </div>

      {/* ===== SECTION 6: WHY LEADING TEAMS TRUST R² ===== */}
      <section
        id="edge"
        data-header-theme="light"
        style={{
          position: 'relative',
          zIndex: 6,
          background: '#ffffff',
          padding: 'clamp(200px, 25vh, 350px) clamp(24px, 4vw, 48px) clamp(60px, 8vh, 100px)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <DiagonalCarousel
          title={<>WHY R<sup style={{ fontSize: '0.6em' }}>2</sup></>}
          items={[
            {
              title: "Orchestrated Intelligence",
              company: "",
              quote: "Your tools are siloed. We connect them. Call intelligence, email analysis, CRM data, and pipeline signals all feed into one orchestrated intelligence layer.",
              attribution: "",
              image: "/images/carousel/why-r2-1.webp",
            },
            {
              title: "Production in Weeks",
              company: "",
              quote: "2-8 weeks to production. No 6-month implementations that never ship. Deploy fast, iterate faster.",
              attribution: "",
              image: "/images/carousel/why-r2-2.webp",
            },
            {
              title: "Built for Your Reality",
              company: "",
              quote: "Works inside Salesforce, Dynamics, HubSpot - wherever your team lives. No rip-and-replace. No migrations.",
              attribution: "",
              image: "/images/carousel/why-r2-3.webp",
            },
          ]}
        />
        </div>
      </section>

      {/* ===== SECTION 7: HOW WE WORK ===== */}
      <section
        id="process"
        data-header-theme="light"
        style={{
          position: 'relative',
          zIndex: 6,
          background: '#ffffff',
          padding: 'clamp(220px, 30vh, 350px) clamp(24px, 4vw, 48px) clamp(80px, 10vh, 120px)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700,
          color: '#111827',
          marginBottom: 48,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          HOW WE DELIVER RESULTS
        </h2>
        <HoverAccordion
          items={[
            {
              id: 1,
              url: "/images/carousel/meeting.webp",
              title: "Discovery & Design",
              description: "2-hour working session to map processes and design solutions.",
            },
            {
              id: 2,
              url: "/images/carousel/deployment.webp",
              title: "Rapid Deployment",
              description: "AI agents deployed in weeks, not months.",
            },
            {
              id: 3,
              url: "/images/what-we-do/sales.webp",
              title: "Continuous Optimization",
              description: "Agents learn from usage patterns and edge cases. Performance improves without manual tuning.",
            },
            {
              id: 4,
              url: "/images/carousel/measurable.webp",
              title: "Measurable Impact",
              description: "15-25% forecast accuracy, 20-30% pipeline expansion.",
            },
          ]}
        />
        </div>
      </section>

      {/* ===== SECTION 8: THE FOUNDERS ===== */}
      <div id="team">
        <FoundersScrollSection />
      </div>


      {/* ===== SECTION 10: CTA ===== */}
      <section
        id="contact"
        data-header-theme="light"
        style={{
          position: 'relative',
          zIndex: 9,
          background: '#ffffff',
          padding: 'clamp(80px, 12vh, 120px) clamp(24px, 5vw, 48px)',
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#032CC8',
            marginBottom: 20,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            READY TO SEE REAL SALES MOMENTUM?
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: '#6b7280',
            marginBottom: 40,
          }}>
            See what's possible in 30 minutes.
          </p>
          <NeumorphicButton href="https://form.typeform.com/to/XPforiEB">
            Let's Talk
          </NeumorphicButton>
        </div>
      </section>

      {/* ===== SECTION 11: FOOTER ===== */}
      <WhiteFooter />

    </div>
  );
}

// Accordion column for What We Do section
function AccordionColumn({
  topTile,
  bottomTile,
  column,
}: {
  topTile: { name: string; description: string; expandedContent: string; image: string };
  bottomTile: { name: string; description: string; expandedContent: string; image: string };
  column: number;
}) {
  const [hoveredTile, setHoveredTile] = useState<'top' | 'bottom' | null>(null);

  // Total height is 496px (240 + 240 + 16 gap) - expanded pushes more
  const baseHeight = 240;
  const expandedHeight = 380;
  const shrunkHeight = 100;

  const topHeight = hoveredTile === 'top' ? expandedHeight : hoveredTile === 'bottom' ? shrunkHeight : baseHeight;
  const bottomHeight = hoveredTile === 'bottom' ? expandedHeight : hoveredTile === 'top' ? shrunkHeight : baseHeight;

  const topIsShrunk = hoveredTile === 'bottom';
  const bottomIsShrunk = hoveredTile === 'top';

  return (
    <div
      style={{
        gridColumn: column,
        gridRow: '1 / 3',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
      }}
    >
      {/* Top tile container */}
      <div
        style={{
          height: topHeight,
          transition: 'height 0.3s ease',
          overflow: 'hidden',
          borderRadius: '12px',
        }}
        onMouseEnter={() => setHoveredTile('top')}
        onMouseLeave={() => setHoveredTile(null)}
      >
        <BentoCard
          name={topTile.name}
          className="h-full"
          description={topTile.description}
          expandedContent={topTile.expandedContent}
          href="/solutions"
          cta="Learn More"
          Icon={() => <div />}
          isShrunk={topIsShrunk}
          background={<img src={topTile.image} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        />
      </div>

      {/* Bottom tile container */}
      <div
        style={{
          height: bottomHeight,
          transition: 'height 0.3s ease',
          overflow: 'hidden',
          borderRadius: '12px',
        }}
        onMouseEnter={() => setHoveredTile('bottom')}
        onMouseLeave={() => setHoveredTile(null)}
      >
        <BentoCard
          name={bottomTile.name}
          className="h-full"
          description={bottomTile.description}
          expandedContent={bottomTile.expandedContent}
          href="/solutions"
          cta="Learn More"
          Icon={() => <div />}
          isShrunk={bottomIsShrunk}
          background={<img src={bottomTile.image} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        />
      </div>
    </div>
  );
}

// Static What We Do Section
function WhatWeDoAnimated() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const leftTop = {
    name: "Expansion & Cross-Sell",
    description: "15-30% more pipeline from existing customers.",
    expandedContent: "Your client base is a goldmine of information. Our agents analyze usage patterns, contract timelines, and engagement signals to surface expansion opportunities.",
    image: "/images/what-we-do/expansion-new.webp",
  };
  const leftBottom = {
    name: "Audit-Ready from Day One",
    description: "Regulatory ready.",
    expandedContent: "Full audit trails on every AI action. Explainable decisions your compliance team can review. No black boxes.",
    image: "/images/what-we-do/audit-new.webp",
  };
  const middle = {
    name: "Pipeline Intelligence",
    description: "Spot at-risk deals earlier.",
    expandedContent: "Real-time deal health scoring powered by conversation analysis, engagement tracking, and win/loss patterns. Get alerts before opportunities disappear.",
    image: "/images/what-we-do/pipeline-new.webp",
  };
  const rightTop = {
    name: "Sales Enablement",
    description: "Give reps time back every week.",
    expandedContent: "Automatic call logging, contact updates, and activity capture. Your reps sell and our AI does the CRM hygiene.",
    image: "/images/what-we-do/sales-new.webp",
  };
  const rightBottom = {
    name: "Your Stack, Enhanced",
    description: "Built to enhance Salesforce, Dynamics, HubSpot, not replace them.",
    expandedContent: "We layer intelligence on top of your existing CRM, ERP, and communication tools. No migrations. No rip-and-replace. Just smarter systems.",
    image: "/images/what-we-do/stack-new.webp",
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        background: '#ffffff',
        padding: 'clamp(200px, 28vh, 320px) clamp(24px, 4vw, 48px) clamp(120px, 18vh, 200px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 48,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        WHAT WE DO
      </h2>

      {isMobile ? (
        /* Mobile: Single column vertical stack */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[middle, leftTop, rightTop, leftBottom, rightBottom].map((tile, idx) => (
            <div key={idx} style={{ height: '280px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <BentoCard
                name={tile.name}
                className="h-full"
                description={tile.description}
                expandedContent={tile.expandedContent}
                href="/solutions"
                cta="Learn More"
                Icon={() => <div />}
                background={<img src={tile.image} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: 3-column grid with accordion columns */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '240px 240px',
            gap: '16px',
          }}
        >
          {/* Left Column - Accordion */}
          <AccordionColumn topTile={leftTop} bottomTile={leftBottom} column={1} />

          {/* Middle Column - Static full height */}
          <div style={{ gridColumn: 2, gridRow: '1 / 3' }}>
            <BentoCard
              name={middle.name}
              className="h-full"
              description={middle.description}
              expandedContent={middle.expandedContent}
              href="/solutions"
              cta="Learn More"
              Icon={() => <div />}
              background={<img src={middle.image} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            />
          </div>

          {/* Right Column - Accordion */}
          <AccordionColumn topTile={rightTop} bottomTile={rightBottom} column={3} />
        </div>
      )}
      </div>
    </div>
  );
}

// Simple Founders Section - just show the 3 cards with scroll-in animation
function FoundersScrollSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const foundersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver for scroll-in animation
  useEffect(() => {
    const el = foundersContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const founders = [
    {
      name: "Rich",
      fullName: "Rich Rivara",
      role: "CEO",
      image: "/images/headshots/rich-headshot.webp",
      description: "20+ years scaling revenue operations across enterprise tech. Former executive at Appirio (acquired for $500M) and BridgeNext, where he built sales organizations from $0 to 8-figure ARR. His network includes Fortune 500 CROs, VPs of Sales Operations, and revenue leaders who have deployed AI at scale. Not a consultant. A former operator who carried quota and built teams.",
      linkedInUrl: "https://www.linkedin.com/in/rich-rivara-388ba82/",
    },
    {
      name: "Will",
      fullName: "Will Godfrey",
      role: "CTO",
      image: "/images/headshots/will-headshot.webp",
      description: "Former McKinsey technologist who architected enterprise systems for Fortune 500 companies with $500M-$1B+ in revenue. Led the Google Workspace rollout for the City of Boston (30,000+ users), managing complex change management and technical integration across fragmented legacy systems. Specialized in translating messy business requirements into scalable technical architecture.",
      linkedInUrl: "https://www.linkedin.com/in/willgodfrey/",
    },
    {
      name: "Tyler",
      fullName: "Tyler Preisser",
      role: "CPO",
      image: "/images/headshots/tyler-headshot.webp",
      description: "AI-native product leader. Former VP of Operations who automated an entire back office using agentic AI -not theory, actual production systems processing thousands of workflows daily. His background: operational efficiency through AI-first design. He understands what makes AI agents reliable enough for enterprise deployment -because he's already done it.",
      linkedInUrl: "https://www.linkedin.com/in/tyler-preisser-803605233/",
    },
  ];

  return (
    <section
      data-header-theme="light"
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: 'clamp(80px, 12vh, 120px) clamp(24px, 4vw, 48px)',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#111827',
            marginBottom: 'clamp(60px, 8vh, 100px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          THE FOUNDERS
        </h2>

        <div
          ref={foundersContainerRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '24px' : 'clamp(16px, 4vw, 48px)',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'stretch',
          }}
        >
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              style={{
                width: isMobile ? '100%' : 'clamp(280px, 30vw, 380px)',
                maxWidth: isMobile ? '400px' : undefined,
                height: isMobile ? '450px' : 'clamp(500px, 60vh, 650px)',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
              }}
            >
              <FounderFlipCard
                name={founder.name}
                role={founder.role}
                image={founder.image}
                description={founder.description}
                fullName={founder.fullName}
                linkedInUrl={founder.linkedInUrl}
                index={index}
                noShadow={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// White footer component with Icon Cloud
function WhiteFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer
      id="footer-email-signup"
      data-header-theme="light"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: isMobile ? '32px 0 0' : '48px 0 0',
        borderTop: '1px solid #e5e7eb',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? '32px' : '0',
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: isMobile ? '0 24px' : '0 clamp(48px, 6vw, 80px)',
      }}>
        {/* Left Column - Dispatch Signup */}
        <div style={{
          textAlign: isMobile ? 'center' : 'left',
          width: isMobile ? '100%' : 'clamp(350px, 40vw, 550px)',
          maxWidth: isMobile ? '100%' : undefined,
          display: isMobile ? 'flex' : 'block',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : undefined,
        }}>
          <Link href="/" style={{
            display: 'inline-block',
            marginBottom: 24,
          }}>
            <img
              src="/r2-logo.webp"
              alt="R² AI"
              loading="lazy"
              decoding="async"
              style={{
                height: 'clamp(50px, 8vw, 70px)',
                width: 'auto',
              }}
            />
          </Link>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
            fontWeight: 600,
            color: '#032CC8',
            marginBottom: 12,
            textTransform: 'uppercase',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            Join Squared Away
          </h3>
          <p style={{
            color: '#6b7280',
            marginBottom: 20,
            fontSize: 'clamp(0.9rem, 1.1vw, 0.95rem)',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            Sharp takes on AI, sales ops, and revenue intelligence.
          </p>
          <iframe
            src="https://subscribe-forms.beehiiv.com/f50f3b9c-7e15-47ab-bcad-7e9159ca428b"
            className="beehiiv-embed"
            data-test-id="beehiiv-embed"
            frameBorder="0"
            scrolling="no"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '177px',
              margin: '0',
              borderRadius: '8px',
              backgroundColor: 'white',
              display: 'block',
            }}
          />
          <Link
            href="https://www.linkedin.com/company/r-squared-ai"
            target="_blank"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#032CC8',
              marginTop: 24,
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            Follow us on LinkedIn
          </Link>
        </div>

        {/* Right Column - Icon Cloud - Hidden on mobile */}
        {!isMobile && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
            fontWeight: 600,
            color: '#032CC8',
            marginBottom: 20,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign: 'center',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            We Work With The Top Tools
          </h3>
          <div style={{
            height: 'clamp(280px, 35vh, 400px)',
            width: 'clamp(350px, 40vw, 500px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <IconCloud
              images={[
                '/icons/make-robot.svg',
                '/icons/1234.svg',
                '/icons/324t.svg',
                '/icons/attached_image.svg',
                '/icons/aw3.svg',
                '/icons/aw4.svg',
                '/icons/awefg.svg',
                '/icons/dsfg.svg',
                '/icons/sert.svg',
                '/icons/screenshot_2026_01_22_at_12_06_13_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_08_09_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_08_39_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_09_31_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_10_03_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_23_53_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_25_14_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_25_56_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_28_34_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_30_14_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_31_41_pm.svg',
                '/icons/screenshot_2026_01_22_at_12_36_29_pm.svg',
              ]}
            />
          </div>
        </div>
        )}
      </div>

      {/* Copyright */}
      <div style={{
        marginTop: 40,
        // Add safe area bottom padding for iPhone home indicator
        padding: '24px 0 calc(24px + env(safe-area-inset-bottom, 0px))',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center',
      }}>
        <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>
          © {new Date().getFullYear()} R Squared AI, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
