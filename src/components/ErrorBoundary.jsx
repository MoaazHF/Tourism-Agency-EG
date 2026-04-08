import React from 'react'

/**
 * React error boundary — catches render errors in any child tree.
 * Wrap around ListingPage and TripDetails in App.jsx.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-6xl font-black text-primary/20">Oops</p>
          <h1 className="text-2xl font-bold text-on-surface">Something went wrong</h1>
          <p className="text-on-surface-variant text-sm max-w-md">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
            className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm"
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
