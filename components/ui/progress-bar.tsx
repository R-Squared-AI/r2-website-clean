"use client"

import React, { useEffect, useState } from "react"
import { motion, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  total: number
  current: number
  className?: string
  swipeProgress?: MotionValue<number>
}

export function ProgressBar({ total, current, className, swipeProgress }: ProgressBarProps) {
  const segments = Array.from({ length: total }, (_, i) => i)
  const [continuousProgress, setContinuousProgress] = useState(current)

  // Track swipe progress for smooth animation
  useEffect(() => {
    if (swipeProgress) {
      const unsubscribe = swipeProgress.on('change', (value) => {
        setContinuousProgress(value)
      })
      return () => unsubscribe()
    } else {
      setContinuousProgress(current)
    }
  }, [swipeProgress, current])

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {segments.map((_, index) => {
        // Calculate smooth progress for each segment
        const segmentProgress = Math.max(0, Math.min(1, continuousProgress - index))
        const isActive = index === Math.floor(continuousProgress)
        const isPast = index < Math.floor(continuousProgress)

        return (
          <motion.div
            key={index}
            animate={{
              width: isActive ? 48 : 32,
              scale: isActive ? 1.05 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: isPast || isActive
                ? '#025082'
                : '#d1d5db',
              opacity: isPast ? 1 : isActive ? 0.5 + (segmentProgress * 0.5) : 0.3,
            }}
          />
        )
      })}
    </div>
  )
}
