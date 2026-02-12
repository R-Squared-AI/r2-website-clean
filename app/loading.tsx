'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative">
        {/* Animated R² logo */}
        <motion.div
          className="font-serif text-6xl font-light text-[#025082]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          R²
        </motion.div>

        {/* Animated line underneath */}
        <motion.div
          className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#025082]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}







