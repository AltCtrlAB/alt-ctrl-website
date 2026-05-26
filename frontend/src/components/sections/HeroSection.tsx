import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import AnimatedText from '@/components/AnimatedText'
import GlowButton from '@/components/GlowButton'
import FloatingParticles from '@/components/FloatingParticles'
import { company } from '@/lib/company'

export default function HeroSection() {
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const particlesY = useTransform(scrollY, [0, 600], [0, 180])

  function scrollToAbout() {
    document.getElementById('om-oss')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen bg-background flex items-center overflow-hidden"
      aria-label="Introduktion"
    >
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

          {/* Service badges */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            {company.services.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="border-accent/40 text-accent font-mono text-xs tracking-wider"
              >
                {s}
              </Badge>
            ))}
          </motion.div>

          {/* Headline */}
          <h1
            className="font-mono font-bold text-foreground text-balance mx-auto"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}
          >
            <AnimatedText
              text={company.tagline}
              as="span"
              direction="up"
            />
          </h1>

          {/* Sub-headline */}
          <motion.p
            className="text-foreground-muted text-lg leading-relaxed max-w-xl mx-auto"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0, 0, 0.2, 1] }}
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
