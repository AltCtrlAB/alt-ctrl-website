import { motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  heading: string
  description: string
  number?: string
  delay?: number
  className?: string
}

export default function FeatureCard({
  icon: Icon,
  heading,
  description,
  number,
  delay = 0,
  className,
}: FeatureCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: [0, 0, 0.2, 1] }}
      className={cn('group cursor-default', className)}
    >
      <Card
        className={cn(
          'relative h-full bg-surface border-border',
          'transition-all duration-250',
          'hover:-translate-y-1 hover:bg-surface-raised hover:border-accent/40',
          'hover:shadow-[var(--glow-accent)]',
        )}
      >
        {number && (
          <span
            className="absolute top-4 right-4 font-mono text-xs text-foreground-subtle select-none"
            aria-hidden="true"
          >
            {number}
          </span>
        )}

        <CardContent className="p-6 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
            <Icon size={20} className="text-accent" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h3 className="font-mono font-semibold text-foreground text-base leading-snug">
              {heading}
            </h3>
            <p className="text-foreground-subtle text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
