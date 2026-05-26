import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

export default function SmoothCursor() {
  const reducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    // Only show on pointer-accurate (non-touch) devices
    setIsDesktop(!window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (!isDesktop || reducedMotion) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleEnterGrow = () => setIsHovered(true)
    const handleLeaveGrow = () => setIsHovered(false)

    window.addEventListener('mousemove', handleMove)

    // Attach grow listeners to all [data-cursor-grow] elements
    const growEls = document.querySelectorAll<HTMLElement>('[data-cursor-grow]')
    growEls.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterGrow)
      el.addEventListener('mouseleave', handleLeaveGrow)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      growEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterGrow)
        el.removeEventListener('mouseleave', handleLeaveGrow)
      })
    }
  }, [isDesktop, isVisible, mouseX, mouseY, reducedMotion])

  if (!isDesktop || reducedMotion) return null

  return (
    <motion.div
      className="fixed pointer-events-none rounded-full border-2 border-accent"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 20,
        height: 20,
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{ scale: isHovered ? 2.5 : 1 }}
      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      aria-hidden="true"
    />
  )
}
