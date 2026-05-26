import { motion, useReducedMotion } from 'motion/react'
import { AlertTriangle, BarChart2, Bot } from 'lucide-react'
import SectionWrapper from '@/components/SectionWrapper'
import FeatureCard from '@/components/FeatureCard'
import { company } from '@/lib/company'

const problemIcons = [AlertTriangle, BarChart2, Bot] as const

export default function ServicesSection() {
  const reducedMotion = useReducedMotion()

  return (
    <SectionWrapper variant="dark" id="tjanster" aria-labelledby="services-heading">
      <div className="container-site space-y-16">

        {/* ── Sub-section 1: Problems ── */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <p className="font-mono text-accent text-xs tracking-widest uppercase">
              Problemen ni känner igen
            </p>
            <h2
              id="services-heading"
              className="font-mono font-bold text-foreground text-balance mx-auto max-w-2xl"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              Var läcker er tid och era pengar?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.problems.map((p, i) => (
              <FeatureCard
                key={p.number}
                icon={problemIcons[i] ?? AlertTriangle}
                heading={p.title}
                description={p.description}
                number={p.number}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* ── Sub-section 2: Approach ── */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <p className="font-mono text-accent text-xs tracking-widest uppercase">
              Vår approach
            </p>
            <h2
              className="font-mono font-bold text-foreground text-balance mx-auto max-w-2xl"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              Vi hittar rätt, och levererar.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {company.approach.map((a, i) => (
              <motion.div
                key={a.number}
                className="border border-border/50 bg-surface/40 rounded-lg p-6 transition-all duration-250 hover:border-accent/40 hover:bg-surface-raised cursor-default"
                initial={reducedMotion ? false : { opacity: 0, y: 32 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0, 0, 0.2, 1] }}
              >
                {/* Decorative large number */}
                <p
                  className="font-mono font-bold text-foreground-subtle/20 select-none"
                  style={{ fontSize: '4rem', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {a.number}
                </p>

                <h3 className="font-mono font-semibold text-foreground text-base mt-3 leading-snug">
                  {a.title}
                </h3>
                <p className="text-foreground-subtle text-sm leading-relaxed mt-2">
                  {a.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
