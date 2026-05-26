import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/**
 * useCountUp — animates a numeric value from 0 to `target` using rAF.
 * Returns a `ref` to attach to a wrapper element (for IntersectionObserver)
 * and `display` — the formatted string to render.
 *
 * Animation starts once the ref element enters the viewport (once).
 * Respects prefers-reduced-motion: jumps instantly to target if true.
 */
export function useCountUp(
  target: number,
  options?: {
    duration?: number                   // ms, default 1800
    format?: (v: number) => string      // default: Swedish locale toLocaleString
  },
) {
  const { duration = 1800, format = (v: number) => v.toLocaleString('sv-SE') } = options ?? {}

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(format(0))

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(format(target))
      return
    }
    if (!inView) return

    let rafId = 0
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic: 1 - (1-t)^3
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(format(Math.round(target * eased)))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, reducedMotion]) // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, display }
}
