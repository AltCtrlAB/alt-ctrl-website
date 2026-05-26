import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right'
type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

interface AnimatedTextProps {
  text: string
  as?: TextElement
  className?: string
  delay?: number      // stagger delay per word in seconds
  direction?: Direction
}

function getOffset(direction: Direction) {
  switch (direction) {
    case 'up':    return { y: 24 }
    case 'down':  return { y: -24 }
    case 'left':  return { x: 24 }
    case 'right': return { x: -24 }
  }
}

export default function AnimatedText({
  text,
  as: Tag = 'p',
  className,
  delay = 0.05,
  direction = 'up',
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: delay },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, ...getOffset(direction) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn('inline', className)}
      aria-label={text}
    >
      <Tag aria-hidden="true" className="inline">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ display: 'inline-block' }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
