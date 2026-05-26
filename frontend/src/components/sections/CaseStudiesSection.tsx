import { motion, useReducedMotion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import SectionWrapper from '@/components/SectionWrapper'
import { useCountUp } from '@/hooks/useCountUp'
import { company } from '@/lib/company'
import type { CaseStudy } from '@/lib/company'

/**
 * Animated metric for the first case study (~300 000 kr).
 * Defined as a separate component so hooks are called unconditionally.
 */
function Metric300k() {
  const { ref, display } = useCountUp(300000, {
    format: (v) => `~${v.toLocaleString('sv-SE')} kr`,
  })
  return (
    <div ref={ref}>
      <p
        className="font-mono font-bold text-accent tracking-tight"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1 }}
      >
        {display}
      </p>
    </div>
  )
}

interface CaseStudyCardProps {
  study: CaseStudy
  delay?: number
  /** If true, renders animated metric. Only for caseStudies[0]. */
  animateMetric?: boolean
}

function CaseStudyCard({ study, delay = 0, animateMetric = false }: CaseStudyCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: [0, 0, 0.2, 1] }}
      className="group h-full"
    >
      <Card
        className="h-full bg-surface border-border transition-all duration-300
          hover:-translate-y-[5px] hover:scale-[1.01] hover:border-accent/40
          hover:shadow-[var(--card-shadow-hover)]"
      >
        <CardContent className="p-6 flex flex-col gap-4 h-full">

          {/* Category badge */}
          <Badge
            variant="outline"
            className="border-accent/40 text-accent text-xs font-mono w-fit"
          >
            {study.category}
          </Badge>

          {/* Metric — large and impactful */}
          {animateMetric ? (
            <Metric300k />
          ) : (
            <p
              className="font-mono font-bold text-accent tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              {study.metric}
            </p>
          )}

          <p className="text-xs text-foreground-subtle uppercase tracking-widest font-mono -mt-2">
            {study.metricLabel}
          </p>

          <Separator className="bg-border/50" />

          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-mono font-semibold text-foreground text-base leading-snug">
              {study.title}
            </h3>
            <p className="text-xs text-foreground-subtle uppercase tracking-wider">
              {study.client}
            </p>
            <p className="text-sm text-foreground-subtle leading-relaxed mt-1">
              {study.description}
            </p>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CaseStudiesSection() {
  return (
    <SectionWrapper variant="default" id="case" aria-labelledby="case-heading">
      <div className="container-site space-y-10">

        <div className="text-center space-y-2">
          <p className="font-mono text-accent-label text-xs tracking-widest uppercase">
            Referenscase
          </p>
          <h2
            id="case-heading"
            className="font-mono font-bold text-foreground text-balance mx-auto max-w-2xl"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Vad vi har levererat.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {company.caseStudies.map((study, i) => (
            <CaseStudyCard
              key={study.title}
              study={study}
              delay={i * 0.15}
              animateMetric={i === 0}
            />
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
