import React from 'react';
import { useInView } from '../hooks/useInView';

export function Reveal({ 
  children, 
  variant = 'slide-up', 
  animation, // alias for variant
  delay = 0, 
  className = '', 
  rootMargin = '0px', 
  threshold = 0.15 
}) {
  const ref = useInView({ rootMargin, threshold });
  
  // Normalize variant/animation name
  let animType = animation || variant;
  if (animType === 'fade-in' || animType === 'fade') animType = 'fade';
  if (animType === 'fade-in-up' || animType === 'slide-up') animType = 'slide-up';
  if (animType === 'zoom-in' || animType === 'zoom') animType = 'zoom';
  
  const animationClasses = `reveal reveal-${animType} ${className}`;
  const style = delay ? { '--delay': `${delay}ms` } : {};
  
  return (
    <div ref={ref} className={animationClasses} style={style}>
      {children}
    </div>
  );
}


