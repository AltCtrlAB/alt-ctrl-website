import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

export default function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (reducedMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left"
      style={{ scaleX, zIndex: 'var(--z-toast)' }}
      aria-hidden="true"
    />
  )
}
