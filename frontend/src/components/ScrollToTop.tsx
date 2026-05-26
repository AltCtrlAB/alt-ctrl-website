import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronUp } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

export default function ScrollToTop() {
  const visible = useScrolled(400)
  const reducedMotion = useReducedMotion()

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  if (reducedMotion) {
    // Render static (no AnimatePresence) — simply show/hide via CSS
    return visible ? (
      <button
        onClick={scrollToTop}
        aria-label="Gå till toppen"
        data-cursor-grow=""
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-surface border border-border
          flex items-center justify-center text-foreground-muted hover:border-accent
          hover:text-accent hover:bg-surface-raised transition-colors duration-150
          cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <ChevronUp size={18} aria-hidden="true" />
      </button>
    ) : null
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Gå till toppen"
          data-cursor-grow=""
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-surface border border-border
            flex items-center justify-center text-foreground-muted hover:border-accent
            hover:text-accent hover:bg-surface-raised transition-colors duration-150
            cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          style={{ zIndex: 'var(--z-sticky)' as unknown as number }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
