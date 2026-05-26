import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Particle {
  id: number
  left: string
  top: string
  width: number
  height: number
  duration: number
  delay: number
  yRange: number
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

interface FloatingParticlesProps {
  count?: number
}

export default function FloatingParticles({ count = 18 }: FloatingParticlesProps) {
  const reducedMotion = useReducedMotion()

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 3) * 100}%`,
        top: `${seededRandom(i * 7) * 100}%`,
        width: 2 + seededRandom(i * 11) * 4,
        height: 2 + seededRandom(i * 13) * 4,
        duration: 4 + seededRandom(i * 17) * 6,
        delay: seededRandom(i * 19) * 3,
        yRange: 10 + seededRandom(i * 23) * 20,
      })),
    [count],
  )

  if (reducedMotion) return null

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent opacity-[0.12]"
          style={{
            left: p.left,
            top: p.top,
            width: p.width,
            height: p.height,
            willChange: 'transform',
          }}
          animate={{ y: [-p.yRange, p.yRange, -p.yRange] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
