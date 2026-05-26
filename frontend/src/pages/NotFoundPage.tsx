import { motion, useReducedMotion } from 'motion/react'
import GlowButton from '@/components/GlowButton'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  const reducedMotion = useReducedMotion()

  return (
    <main
      className="min-h-screen bg-background flex items-center justify-center"
      id="main-content"
    >
      <motion.div
        className="container-site text-center space-y-6 max-w-lg"
        initial={reducedMotion ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
      >
        {/* Big 404 */}
        <p
          className="font-mono font-bold text-accent select-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 9rem)', lineHeight: 1 }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="font-mono font-bold text-foreground text-2xl">
            Sidan hittades inte.
          </h1>
          <p className="text-foreground-subtle text-base leading-relaxed">
            Den sida du letar efter existerar inte eller har flyttats.
          </p>
        </div>

        {/* CTA back home */}
        <div className="pt-2">
          <GlowButton href="/" size="md">
            <Home size={16} aria-hidden="true" />
            Tillbaka till startsidan
          </GlowButton>
        </div>
      </motion.div>
    </main>
  )
}
