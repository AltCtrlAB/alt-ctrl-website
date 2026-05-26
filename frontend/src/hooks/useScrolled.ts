import { useEffect, useState } from 'react'

/**
 * Returns true when the user has scrolled past the given threshold (default 20px).
 * Used by Navbar to trigger the glassmorphism background.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)

    // Set initial value
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
