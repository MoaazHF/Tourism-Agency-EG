import React from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * MotionLayer
 * Global configuration for Framer Motion.
 * respects system-level reduced motion by default.
 */
export function MotionLayer({ children, reducedMotion = 'user' }) {
  return (
    <MotionConfig reducedMotion={reducedMotion}>
      {children}
    </MotionConfig>
  );
}
