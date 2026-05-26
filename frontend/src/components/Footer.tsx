import { motion, useReducedMotion } from 'motion/react'
import { Mail, MapPin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { company } from '@/lib/company'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const reducedMotion = useReducedMotion()

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Animated gradient background */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            background: 'var(--gradient-cta)',
            backgroundSize: '400% 400%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
      )}

      <div className="relative container-site py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <p className="font-mono font-bold text-xl text-foreground">
              alt_<span className="text-accent">ctrl_</span>
            </p>
            <p className="text-foreground-subtle text-sm leading-relaxed max-w-xs">
              {company.tagline}
            </p>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 text-accent text-sm font-sans hover:underline cursor-pointer"
            >
              <Mail size={14} aria-hidden="true" />
              {company.email}
            </a>
            <p className="flex items-center gap-2 text-foreground-subtle text-sm">
              <MapPin size={14} aria-hidden="true" />
              {company.location}
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div className="space-y-4">
            <p className="text-accent-label text-xs font-mono tracking-widest uppercase">
              Navigera
            </p>
            <ul className="space-y-2" role="list">
              {company.nav.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-foreground-muted text-sm hover:text-foreground transition-colors duration-150 cursor-pointer min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services & Info */}
          <div className="space-y-4">
            <p className="text-accent-label text-xs font-mono tracking-widest uppercase">
              Tjänster
            </p>
            <div className="flex flex-wrap gap-2">
              {company.services.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="border-border text-foreground-subtle font-sans text-xs"
                >
                  {s}
                </Badge>
              ))}
            </div>
            <div className="pt-2 space-y-1">
              <p className="text-foreground-subtle text-sm">{company.legalName}</p>
              <p className="text-foreground-subtle text-sm">{company.location}, Sverige</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <Separator className="my-10 bg-border" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-foreground-subtle text-xs font-sans">
          <p>© {company.year} {company.legalName}. Alla rättigheter förbehållna.</p>
          <p className="font-mono">
            alt_<span className="text-accent">ctrl_</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
