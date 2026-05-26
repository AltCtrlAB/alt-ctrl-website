import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import SectionWrapper from '@/components/SectionWrapper'
import { useCountUp } from '@/hooks/useCountUp'
import { company } from '@/lib/company'

/** Animated counter for the '35' metric — hooks must be at component top-level */
function Stat35() {
  const { ref, display } = useCountUp(35)
  return (
    <div ref={ref}>
      <p
        className="font-mono font-bold text-accent"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
      >
        {display}
      </p>
    </div>
  )
}

export default function AboutSection() {
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const blobY = useTransform(scrollY, [200, 1000], [-30, 80])

  return (
    <SectionWrapper variant="default" id="om-oss" aria-labelledby="about-heading" className="relative overflow-hidden">

      {/* ── Decorative parallax blob ── */}
      {!reducedMotion && (
        <motion.div
          className="absolute top-0 right-[-200px] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none select-none"
          style={{ y: blobY }}
          aria-hidden="true"
        />
      )}

      <div className="container-site relative space-y-16">

        {/* ── Part 1: Differentiators ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: prose intro */}
          <div className="space-y-4">
            <p className="font-mono text-accent text-xs tracking-widest uppercase">Om oss</p>
            <h2
              id="about-heading"
              className="font-mono font-bold text-foreground text-balance"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              Varför Alt Ctrl?
            </h2>
            <p className="text-foreground-subtle text-base leading-relaxed max-w-md">
              Vi kombinerar strategisk förståelse med teknisk leverans — utan mellanhänder,
              utan subkontraktering. Beslutet ska vara begripligt för ledning innan en rad kod skrivs.
            </p>
          </div>

          {/* Right: numbered differentiators */}
          <div className="space-y-6">
            {company.differentiators.map((d, i) => (
              <motion.div
                key={d.number}
                className="border-l-2 border-accent pl-5 space-y-1"
                initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0, 0, 0.2, 1] }}
              >
                <p className="font-mono text-accent text-xs tracking-widest">{d.number}</p>
                <p className="text-foreground-subtle text-sm leading-relaxed">{d.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Part 2: Cost-of-inaction metrics ── */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-accent text-xs tracking-widest uppercase">
              Vad kostar det att inte göra något?
            </p>
            <h3
              className="font-mono font-semibold text-foreground"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
            >
              Manuella processer är dyrare än ni tror.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {company.costMetrics.map((metric, i) => (
              <motion.div
                key={metric.value}
                className="border border-border/50 rounded-lg p-6 bg-background/40 space-y-3"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0, 0, 0.2, 1] }}
              >
                {/* Value — index 1 ('35') is the only pure number */}
                {i === 1 ? (
                  <Stat35 />
                ) : (
                  <p
                    className="font-mono font-bold text-accent"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
                  >
                    {metric.value}
                  </p>
                )}

                <p className="text-xs text-foreground-subtle uppercase tracking-widest font-mono">
                  {metric.label}
                </p>
                <p className="text-sm text-foreground-subtle leading-relaxed border-t border-border/50 pt-3">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
