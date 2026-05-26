import { motion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glowButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-semibold rounded-lg cursor-pointer',
    'transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-cta text-accent-foreground hover:bg-cta-hover hover:shadow-[var(--glow-accent)]',
        secondary:
          'bg-surface text-foreground border border-border hover:bg-surface-raised',
        outline:
          'bg-transparent text-foreground font-medium border border-border hover:border-accent hover:text-accent',
      },
      size: {
        sm: 'text-xs px-3 min-h-[36px]',
        md: 'text-sm px-5 min-h-[44px]',
        lg: 'text-base px-7 min-h-[52px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type GlowButtonBaseProps = VariantProps<typeof glowButtonVariants> & {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

type GlowButtonAsButton = GlowButtonBaseProps & {
  href?: undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

type GlowButtonAsLink = GlowButtonBaseProps & {
  href: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  type?: undefined
}

type GlowButtonProps = GlowButtonAsButton | GlowButtonAsLink

export default function GlowButton({
  children,
  className,
  variant,
  size,
  disabled,
  href,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: GlowButtonProps) {
  const classes = cn(
    glowButtonVariants({ variant, size }),
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  )

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.03 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { duration: 0.15, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        data-cursor-grow=""
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      data-cursor-grow=""
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
