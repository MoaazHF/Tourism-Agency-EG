import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  },
  zoomIn: {
    initial: { scale: 0.98, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  }
};

/**
 * MotionReveal
 * Wraps content and animates on entering the viewport.
 * Props:
 *  - variant: 'fade' | 'slideUp' | 'zoomIn'
 *  - delay: ms delay before starting the animation
 *  - once: if true, animate only once per element
 */
export function MotionReveal({ children, variant = 'slideUp', delay = 0, once = true, ...rest }) {
  // Normalize variant name (handle aliases used previously)
  let normalizedVariant = variant;
  if (variant === 'fade-in' || variant === 'fade-in-up') normalizedVariant = 'slideUp';
  if (variant === 'fade') normalizedVariant = 'fade';
  if (variant === 'zoom' || variant === 'zoom-in') normalizedVariant = 'zoomIn';

  const v = variants[normalizedVariant] ?? variants.slideUp;

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: delay / 1000, 
        ease: [0.22, 1, 0.36, 1] // Premium ease-out-expo
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
