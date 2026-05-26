import { motion, useReducedMotion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { TeamMember } from '@/lib/company'

interface TeamMemberCardProps {
  member: TeamMember
  delay?: number
  className?: string
}

export default function TeamMemberCard({
  member,
  delay = 0,
  className,
}: TeamMemberCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: [0, 0, 0.2, 1] }}
      className={cn('group', className)}
    >
      <Card
        className={cn(
          'h-full bg-surface border-border',
          'transition-all duration-250',
          'hover:-translate-y-1 hover:bg-surface-raised hover:border-accent/40',
        )}
      >
        <CardContent className="p-6 space-y-4">
          {/* Initials avatar */}
          <div
            className="w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <span className="font-mono font-bold text-accent-foreground text-sm">
              {member.initials}
            </span>
          </div>

          {/* Name + role */}
          <div className="space-y-1">
            <h3 className="font-mono font-semibold text-foreground text-base">
              {member.name}
            </h3>
            <p className="text-accent text-sm font-sans font-medium">
              {member.role}
            </p>
          </div>

          {/* Bio */}
          <p className="text-foreground-subtle text-sm leading-relaxed">
            {member.bio}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
