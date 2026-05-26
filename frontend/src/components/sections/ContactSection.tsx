import { Mail, MapPin } from 'lucide-react'
import SectionWrapper from '@/components/SectionWrapper'
import ContactForm from '@/components/ContactForm'
import { company } from '@/lib/company'

export default function ContactSection() {
  return (
    <SectionWrapper variant="default" id="kontakt" aria-labelledby="contact-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: contact info ── */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-accent text-xs tracking-widest uppercase">Kontakt</p>
              <h2
                id="contact-heading"
                className="font-mono font-bold text-foreground"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                Hör av er.
              </h2>
            </div>

            <p className="text-foreground-subtle text-base leading-relaxed max-w-sm">
              Skicka ett meddelande så återkommer vi inom en arbetsdag.
              Eller maila direkt — vi svarar snabbt.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-3 text-accent hover:underline
                  underline-offset-4 transition-colors duration-150 text-sm font-sans group"
              >
                <span
                  className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center
                    transition-colors duration-150 group-hover:bg-accent/20"
                >
                  <Mail size={15} className="text-accent" aria-hidden="true" />
                </span>
                {company.email}
              </a>

              <p className="flex items-center gap-3 text-foreground-subtle text-sm">
                <span
                  className="w-8 h-8 rounded-lg bg-surface-raised flex items-center justify-center flex-shrink-0"
                >
                  <MapPin size={15} className="text-foreground-subtle" aria-hidden="true" />
                </span>
                {company.location}, Sverige
              </p>
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <ContactForm />

        </div>
      </div>
    </SectionWrapper>
  )
}
