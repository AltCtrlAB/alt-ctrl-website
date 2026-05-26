import { motion, useReducedMotion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import BookingCTA from '@/components/BookingCTA'
import { company } from '@/lib/company'

export default function ProcessSection() {
  const reducedMotion = useReducedMotion()
  const steps = company.process

  return (
    <>
      {/* ── Process timeline ── */}
      <section className="bg-background section-spacing" aria-labelledby="process-heading">
        <div className="container-site space-y-12">

          <div className="text-center space-y-2">
            <p className="font-mono text-accent-label text-xs tracking-widest uppercase">
              Hur vi jobbar
            </p>
            <h2
              id="process-heading"
              className="font-mono font-bold text-foreground text-balance mx-auto max-w-2xl"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              Från förstudie till mätbar effekt.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1
              return (
                <motion.div
                  key={step.step}
                  className="relative flex gap-6"
                  initial={reducedMotion ? false : { opacity: 0, x: -24 }}
                  whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
                >
                  {/* Left: circle + connector */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-accent flex items-center
                        justify-center font-mono font-bold text-accent-label text-sm bg-background z-10
                        flex-shrink-0"
                    >
                      {step.step}
                    </div>
                    {!isLast && (
                      <div className="w-[2px] bg-accent/30 flex-1 mt-2" style={{ minHeight: '2.5rem' }} />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-10'}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-mono font-semibold text-foreground text-lg">
                        {step.phase}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-border text-foreground-subtle text-xs font-mono"
                      >
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-foreground-subtle text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Booking CTA (provides its own gradient bg) ── */}
      <BookingCTA />
    </>
  )
}
