import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress
 * A high-end progress bar at the top of the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[9999] origin-left"
      style={{ 
        scaleX,
        background: 'linear-gradient(90deg, #c79a3c 0%, #ecd6a6 100%)'
      }}
    />
  );
}
