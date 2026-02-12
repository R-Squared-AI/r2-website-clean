'use client';

import { ComponentPropsWithoutRef, ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background?: ReactNode | null
  Icon: React.ElementType
  description: string
  expandedContent?: string
  href?: string
  cta?: string
  isShrunk?: boolean
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(350px,auto)] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  expandedContent,
  href,
  cta,
  isShrunk = false,
  ...props
}: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={name}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-xl cursor-pointer",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Allow vertical page scroll even when touching cards
        touchAction: 'pan-y',
        // iOS tap optimization
        WebkitTapHighlightColor: 'transparent',
      }}
      {...props}
    >
      {/* Image Background */}
      {background && (
        <div className="absolute inset-0 z-0">
          {background}
        </div>
      )}

      {/* Default Gradient Overlay - fades out on hover */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ opacity: isHovered && !isShrunk ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: isShrunk
            ? 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Hover Overlay - darker, covers more */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isShrunk ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'rgba(2, 50, 100, 0.92)',
        }}
      />

      {/* Shrunk Content - Title only, centered */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ padding: 'clamp(16px, 3vw, 24px)' }}
        animate={{ opacity: isShrunk ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className="font-bold text-white text-center"
          style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {name}
        </h3>
      </motion.div>

      {/* Default Content - Title only at bottom */}
      <motion.div
        className="relative z-20 flex flex-col justify-end h-full"
        style={{ padding: 'clamp(20px, 4vw, 32px)' }}
        animate={{ opacity: isShrunk ? 0 : (isHovered ? 0 : 1) }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className="font-bold text-white"
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          {name}
        </h3>
      </motion.div>

      {/* Hover Content - Expanded details */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-center"
        style={{ padding: 'clamp(24px, 5vw, 40px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered && !isShrunk ? 1 : 0, y: isHovered && !isShrunk ? 0 : 20 }}
        transition={{ duration: 0.3, delay: isHovered && !isShrunk ? 0.1 : 0 }}
      >
        <h3
          className="font-bold text-white mb-4"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {name}
        </h3>
        <p
          className="text-white/95 leading-relaxed mb-4"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {description}
        </p>
        {expandedContent && (
          <p
            className="text-white/80 leading-relaxed"
            style={{
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            {expandedContent}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export { BentoCard, BentoGrid }
