# Allt Under Kontroll - Website

Landing page for `alltunderkontroll AB` (also called `alt_ctrl_`), built with Next.js 16 + React 19 + TypeScript + Tailwind CSS v4.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS variables, inline styles |
| Animations | CSS keyframes + React state |
| Fonts | DM Serif Display, DM Sans, JetBrains Mono |
| Package manager | Bun |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Bun](https://bun.sh/) - `curl -fsSL https://bun.sh/install | bash`

---

## Setup

```bash
cd frontend
bun install
```

---

## Development

```bash
# From the project root
./dev.sh

# Or manually
cd frontend && bun dev
```

The dev server runs at **http://localhost:3000**.

### Before committing

Run `./check.sh` from the project root to verify all checks pass (TypeScript, ESLint, Prettier). The checks run in parallel for speed. Use this instead of running individual checks - it gives a compact pass/fail summary. The production `build` is intentionally excluded (it duplicates typecheck + lint) and is left to CI; run `bun run build` manually when you need to verify a production bundle.

---

## Production Build

```bash
cd frontend

# Build
bun run build

# Start production server
bun run start
```

---

## Project Structure

```
alt-ctrl-website/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout + metadata
│   │   │   ├── page.tsx            # Home page (all sections)
│   │   │   ├── globals.css         # Design tokens, resets, shared styles
│   │   │   └── favicon.ico
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Fixed nav with scroll progress
│   │   │   ├── HeroSection.tsx     # Hero with rotating words + parallax
│   │   │   ├── LogoTicker.tsx      # Animated client logo carousel
│   │   │   ├── ProcessSection.tsx  # Three-phase process cards
│   │   │   ├── ServicesSection.tsx  # Service cards with custom SVG icons
│   │   │   ├── AIPhilosophySection.tsx
│   │   │   ├── CasesSection.tsx    # Case studies with metrics
│   │   │   ├── CustomBanner.tsx    # CTA banner
│   │   │   ├── TeamSection.tsx     # Team member cards
│   │   │   ├── CTASection.tsx      # Contact form
│   │   │   ├── FAQSection.tsx      # Collapsible accordion
│   │   │   └── Footer.tsx
│   │   └── hooks/
│   │       └── useInView.ts        # IntersectionObserver hook
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   └── package.json
├── dev.sh                          # Starts the Next.js dev server via Bun
├── check.sh                        # Runs all code quality checks with summary
└── README.md
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `./check.sh` | Run checks (typecheck, lint, format) in parallel with pass/fail summary |
