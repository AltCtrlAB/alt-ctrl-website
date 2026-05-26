import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { company } from '@/lib/company'
import GlowButton from '@/components/GlowButton'
import { useScrolled } from '@/hooks/useScrolled'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  const navLinks = company.nav

  return (
    <motion.header
      className={cn(
        'fixed top-0 inset-x-0 z-[var(--z-sticky)] transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent',
      )}
      initial={reducedMotion ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      <nav
        className="container-site flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-mono font-bold text-foreground text-lg tracking-tight hover:text-accent transition-colors duration-150 cursor-pointer"
          aria-label="alt_ctrl_ — gå till toppen"
        >
          {company.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="group px-3 py-2 text-sm font-sans text-foreground-muted hover:text-foreground transition-colors duration-150 cursor-pointer rounded-md hover:bg-surface focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
              >
                <span className="relative">
                  {link.label}
                  <span
                    className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-accent rounded-full transition-all duration-200 group-hover:w-full"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <GlowButton href={company.cta.primary.href} size="sm">
            Boka möte
          </GlowButton>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden p-2 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-surface border-border w-72"
          >
            <SheetTitle className="font-mono text-foreground mb-6">
              {company.name}
            </SheetTitle>
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => { scrollTo(link.href); setOpen(false) }}
                      className="w-full text-left px-4 py-3 text-base font-sans text-foreground-muted hover:text-foreground hover:bg-surface-raised rounded-md transition-colors duration-150 cursor-pointer min-h-[44px]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="mt-4 px-4">
                  <GlowButton
                    href={company.cta.primary.href}
                    className="w-full justify-center"
                  >
                    {company.cta.primary.label}
                  </GlowButton>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
