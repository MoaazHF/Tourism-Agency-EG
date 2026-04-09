# Framer Motion Integration for Route d'Égypte

This project has been upgraded to use **Framer Motion** for a more premium, fluid user experience.

## Key Enhancements

### 1. Reusable Animation System
- **`MotionReveal`**: Use this to wrap any component and give it an entrance animation (fade, slideUp, zoomIn).
  ```jsx
  <MotionReveal variant="slideUp" delay={200}>
    <MyComponent />
  </MotionReveal>
  ```
- **`MotionLayer`**: Wraps the entire application to provide global configuration, including automatic support for OS-level **Reduce Motion** settings.

### 2. Scroll-Triggered Polish
- **Animated Counters**: Use the `<Counter />` component for statistics. Numbers will count up from 0 to the target value only when they scroll into view.
- **Scroll Progress**: A subtle brand-colored progress bar at the top of the viewport indicates reading progress.
- **Automatic Scroll Reset**: When navigating between pages, the scroll position is automatically reset to the top.

## Accessibility
All animations respect the `prefers-reduced-motion` media query. Users who have disabled motion at the OS level will see static content or very simplified transitions.

## Performance
- Intersection Observation is handled efficiently via Framer Motion's `whileInView`.
- Component-level configuration ensures that logic is only active when components are mounted.
