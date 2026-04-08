import React from 'react'

/**
 * Shared loading spinner used across hook loading states.
 * @param {string} [size='md'] - 'sm' | 'md' | 'lg'
 * @param {string} [className] - extra classes
 */
export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-4', lg: 'w-12 h-12 border-4' }
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizes[size]} border-primary border-t-transparent rounded-full animate-spin`} />
    </div>
  )
}
