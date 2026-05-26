import { motion, useReducedMotion } from 'motion/react'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialCardProps {
  quote: string
  name: string
  company: string
  stars?: number
  delay?: number
  className?: string
}

export default function TestimonialCard({
  quote,
  name,
  company,
  stars = 5,
  delay = 0,
  className,
}: TestimonialCardProps) {
  const reducedMotion = useReducedMotion()
  const starCount = Math.min(5, Math.max(1, stars))

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: [0, 0, 0.2, 1] }}
      className={className}
    >
      <Card className="relative h-full bg-surface border-border overflow-hidden">
        {/* Decorative quotation mark */}
        <span
          className="absolute -top-4 left-4 text-accent/20 font-sans select-none pointer-events-none"
          style={{ fontSize: '7rem', lineHeight: 1 }}
          aria-hidden="true"
        >
          "
        </span>

        <CardContent className="relative p-6 space-y-4">
          {/* Stars */}
          <div
            className="flex gap-1"
            role="img"
            aria-label={`${starCount} av 5 stjärnor`}
          >
            {Array.from({ length: starCount }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="text-accent fill-current"
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-foreground-muted text-sm leading-relaxed">
            "{quote}"
          </blockquote>

          {/* Attribution */}
          <footer className="pt-2 border-t border-border">
            <p className="font-sans font-semibold text-foreground text-sm">{name}</p>
            <p className="text-foreground-subtle text-xs">{company}</p>
          </footer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
