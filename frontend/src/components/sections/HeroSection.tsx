import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import GlowButton from '@/components/GlowButton'
import FloatingParticles from '@/components/FloatingParticles'
import { company } from '@/lib/company'

const rotatingWords = [...company.heroWords]

export default function HeroSection() {
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const particlesY = useTransform(scrollY, [0, 600], [0, 180])

  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % rotatingWords.length),
      2200,
    )
    return () => clearInterval(id)
  }, [reducedMotion])

  function scrollToAbout() {
    document.getElementById('om-oss')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--hero-bg)' }}
      aria-label="Introduktion"
    >
      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--hero-dot-color) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* ── Radial accent glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--hero-glow)' }}
        aria-hidden="true"
      />

      {/* ── Parallax particles layer ── */}
      {reducedMotion ? (
        <FloatingParticles count={25} />
      ) : (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: particlesY }}
          aria-hidden="true"
        >
          <FloatingParticles count={25} />
        </motion.div>
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 container-site py-28 w-full">
        <div className="text-center space-y-8 max-w-4xl mx-auto">

          {/* ── Headline with rotating word ── */}
          <motion.h1
            className="font-mono font-bold text-foreground text-balance mx-auto"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            {/* Static line */}
            <span
              className="block"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 4.5rem)', lineHeight: 1.2 }}
            >
              Er partner inom
            </span>

            {/* Rotating word — AnimatePresence ensures only one word exists at a time */}
            <span
              className="relative flex w-full justify-center overflow-hidden text-accent"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 4.5rem)', lineHeight: 1.2, height: '1.3em' }}
              aria-live="polite"
              aria-label={rotatingWords[wordIndex]}
            >
              {reducedMotion ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  {rotatingWords[0]}
                </span>
              ) : (
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-foreground-muted text-lg leading-relaxed max-w-xl mx-auto"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease: [0, 0, 0.2, 1] }}
          >
            {company.tagline}
          </motion.p>

          {/* Sub-pitch */}
          <motion.p
            className="text-foreground-subtle text-base leading-relaxed max-w-lg mx-auto -mt-4"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55, ease: [0, 0, 0.2, 1] }}
          >
            {company.pitch}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center pt-2"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7, ease: [0, 0, 0.2, 1] }}
          >
            <GlowButton href={company.cta.primary.href} size="lg">
              {company.cta.primary.label}
              <ArrowRight size={16} aria-hidden="true" />
            </GlowButton>
            <GlowButton variant="outline" size="lg" onClick={scrollToAbout}>
              {company.cta.secondary.label}
            </GlowButton>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      {!reducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          aria-hidden="true"
        >
          <p className="font-mono text-foreground-subtle text-xs tracking-widest uppercase">
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-foreground-subtle" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
