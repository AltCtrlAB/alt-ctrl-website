import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import GlowButton from '@/components/GlowButton'
import { cn } from '@/lib/utils'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface ContactFormProps {
  onSuccess?: () => void
  className?: string
}

export default function ContactForm({ onSuccess, className }: ContactFormProps) {
  const reducedMotion = useReducedMotion()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          ...(companyName.trim() ? { company: companyName.trim() } : {}),
        }),
      })

      if (!res.ok) throw new Error('Serverfel')

      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
      setErrorMessage('Något gick fel. Prova igen eller maila oss direkt.')
    }
  }

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          /* Success state */
          <motion.div
            key="success"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              {reducedMotion ? (
                <CheckCircle size={32} className="text-accent" aria-hidden="true" />
              ) : (
                <motion.svg
                  viewBox="0 0 24 24"
                  width={32}
                  height={32}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 4 12 L 9 17 L 20 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  />
                </motion.svg>
              )}
            </div>
            <div className="space-y-1">
              <p className="font-mono font-semibold text-foreground text-lg">Tack!</p>
              <p className="text-foreground-subtle text-sm">Vi återkommer inom kort.</p>
            </div>
          </motion.div>
        ) : (
          /* Form */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
            aria-label="Kontaktformulär"
            noValidate
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="block text-sm font-sans font-medium text-foreground-muted"
              >
                Namn <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <Input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Johan Svensson"
                className="bg-input border-border text-foreground placeholder:text-foreground-subtle focus-visible:ring-ring"
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="block text-sm font-sans font-medium text-foreground-muted"
              >
                E-post <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="johan@foretaget.se"
                className="bg-input border-border text-foreground placeholder:text-foreground-subtle focus-visible:ring-ring"
                aria-required="true"
              />
            </div>

            {/* Company (optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-company"
                className="block text-sm font-sans font-medium text-foreground-muted"
              >
                Företag{' '}
                <span className="text-foreground-subtle text-xs font-normal">(valfritt)</span>
              </label>
              <Input
                id="contact-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Företaget AB"
                className="bg-input border-border text-foreground placeholder:text-foreground-subtle focus-visible:ring-ring"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block text-sm font-sans font-medium text-foreground-muted"
              >
                Meddelande <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Berätta lite om er verksamhet och vad ni vill lösa..."
                className="bg-input border-border text-foreground placeholder:text-foreground-subtle focus-visible:ring-ring resize-none"
                aria-required="true"
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div
                className="flex items-center gap-2 text-destructive text-sm"
                role="alert"
                id="contact-error"
              >
                <AlertCircle size={16} aria-hidden="true" />
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <GlowButton
              type="submit"
              disabled={status === 'submitting'}
              className="w-full justify-center"
            >
              {status === 'submitting' ? 'Skickar...' : 'Skicka meddelande'}
            </GlowButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
