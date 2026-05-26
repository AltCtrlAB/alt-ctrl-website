import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'
import GlowButton from '@/components/GlowButton'
import { company } from '@/lib/company'

interface Blob {
  width: number
  height: number
  top: string
  left: string
  duration: number
  delay: number
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export default function BookingCTA() {
  const reducedMotion = useReducedMotion()

  const blobs = useMemo<Blob[]>(() =>
    Array.from({ length: 4 }, (_, i) => ({
      width: 200 + seededRandom(i * 7) * 300,
      height: 200 + seededRandom(i * 11) * 300,
      top: `${seededRandom(i * 3) * 80}%`,
      left: `${seededRandom(i * 5) * 80}%`,
      duration: 5 + seededRandom(i * 13) * 5,
      delay: seededRandom(i * 17) * 2,
    }))
  , [])

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="booking-heading"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'var(--gradient-cta)',
          backgroundSize: reducedMotion ? '100% 100%' : '300% 300%',
        }}
        animate={reducedMotion ? {} : {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      {/* Floating blobs */}
      {!reducedMotion && blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 blur-3xl pointer-events-none"
          style={{
            width: blob.width,
            height: blob.height,
            top: blob.top,
            left: blob.left,
          }}
          animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="relative container-site py-24 text-center space-y-6">
        <motion.p
          className="font-mono text-accent-foreground/80 text-xs tracking-widest uppercase"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Nästa steg
        </motion.p>

        <motion.h2
          id="booking-heading"
          className="font-mono font-bold text-accent-foreground text-balance"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Boka en kostnadsfri genomgång.
        </motion.h2>

        <motion.p
          className="text-accent-foreground/80 text-lg max-w-xl mx-auto leading-relaxed"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          På 30 minuter visar vi var era största tidsläckor sitter, och vad det kostar er att inte göra något åt dem.
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <GlowButton
            href={company.cta.primary.href}
            variant="secondary"
            size="lg"
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 border-0"
          >
            {company.cta.primary.label}
          </GlowButton>
        </motion.div>
      </div>
    </section>
  )
}
