import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type SectionVariant = 'default' | 'dark' | 'accent'

interface SectionWrapperProps {
  id?: string
  className?: string
  children: React.ReactNode
  variant?: SectionVariant
  'aria-labelledby'?: string
}

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-surface',
  dark:    'bg-background',
  accent:  'gradient-cta',
}

export default function SectionWrapper({
  id,
  className,
  children,
  variant = 'default',
  'aria-labelledby': ariaLabelledBy,
}: SectionWrapperProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('section-spacing', variantClasses[variant], className)}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </motion.section>
  )
}
