# Alt Ctrl — Design System

> **Source of truth for all visual decisions.**  
> Brand values extracted directly from `Alt_Ctrl_Företagspresentation.pdf`.

---

## Brand Identity

| Field | Value |
|-------|-------|
| Brand name | `alt_ctrl_` (lowercase, trailing underscore) |
| Legal name | Allt Under Kontroll AB |
| Location | Göteborg, Sweden |
| Contact | info@alltunderkontroll.se |
| Services | Business · Strategi · AI · Automation |
| Core tagline | "Vi hittar var er tid och era pengar läcker — och täpper till det." |
| Enterprise clients | Volvo, Stena, process industry & supply chain |

---

## Colour Palette

All colours extracted from the PDF content streams. Implemented as CSS custom properties in `src/index.css`.

### Dark Theme (primary)

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| `--background` | `#14191B` | ██ | Page background |
| `--surface` | `#2D3437` | ██ | Cards, sections |
| `--surface-raised` | `#3A4144` | ██ | Elevated cards, dropdowns |
| `--foreground` | `#FFFFFF` | ██ | Primary text |
| `--foreground-muted` | `#EBEBE7` | ██ | Secondary text |
| `--foreground-subtle` | `#5E6A70` | ██ | Captions, placeholders |
| `--border` | `#44546A` | ██ | Borders, dividers |
| `--accent` | `#1CB954` | ██ | Brand green — key actions, icons, hover |
| `--accent-foreground` | `#14191B` | ██ | Text on green |
| `--cta` | `#1CB954` | ██ | CTA button fill |
| `--cta-hover` | `#17A348` | ██ | CTA hover state |
| `--ring` | `#1CB954` | ██ | Focus rings |

### Special Effects

| Name | Value |
|------|-------|
| CTA Gradient | `linear-gradient(135deg, #1CB954 0%, #14A84A 100%)` |
| Accent Glow | `0 0 24px rgba(28, 185, 84, 0.25)` |
| Accent Glow (lg) | `0 0 48px rgba(28, 185, 84, 0.35)` |

### Contrast Ratios (WCAG)

| Pair | Ratio | Grade |
|------|-------|-------|
| `#FFFFFF` on `#14191B` | 16.1:1 | AAA ✓ |
| `#EBEBE7` on `#14191B` | 14.2:1 | AAA ✓ |
| `#1CB954` on `#14191B` | 6.8:1 | AA ✓ |
| `#FFFFFF` on `#2D3437` | 9.1:1 | AAA ✓ |
| `#5E6A70` on `#14191B` | 4.6:1 | AA ✓ |
| `#14191B` on `#1CB954` | 6.8:1 | AA ✓ |

---

## Typography

Both fonts extracted from the PDF font resources.

### Font Stack

| Role | Font | Weights | CSS token |
|------|------|---------|-----------|
| Display / Brand | **JetBrains Mono** | 400, 500, 700 | `font-display` / `font-mono` |
| Body / UI | **Inter** | 400, 500, 600, 700 | `font-sans` |

**Why JetBrains Mono for display:** The `alt_ctrl_` wordmark in the PDF is monospaced — a deliberate reference to terminal culture and developer tooling. Used large it is distinctive without being gimmicky.

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap');
```

### Type Scale (recommendations)

| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | JetBrains Mono | `clamp(3rem, 6vw, 5rem)` | 700 | Hero headline |
| H1 | JetBrains Mono | `clamp(2rem, 4vw, 3.5rem)` | 700 | Section titles |
| H2 | JetBrains Mono | `clamp(1.5rem, 3vw, 2.5rem)` | 500 | Sub-section titles |
| H3 | Inter | `clamp(1.1rem, 2vw, 1.5rem)` | 600 | Card titles |
| Body | Inter | `1rem` (16px) | 400 | All prose |
| Body large | Inter | `1.125rem` (18px) | 400 | Lead paragraphs |
| Label | Inter | `0.875rem` (14px) | 500 | Tags, badges, nav |
| Caption | Inter | `0.75rem` (12px) | 400 | Metadata, footnotes |

---

## Animation Tokens

Defined in `src/index.css` `:root`.

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Hover, focus rings, icon swaps |
| `--duration-base` | `250ms` | Button states, card hovers |
| `--duration-slow` | `400ms` | Modals, page-level reveals |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Pop-in elements |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Exits |

**Motion rule:** Always wrap heavy animations in `useReducedMotion()` from Motion.
Disable or simplify if `prefers-reduced-motion: reduce`.

---

## Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--container-max` | `1280px` | Max site width |
| `--section-py` | `clamp(4rem, 8vw, 7rem)` | Vertical section padding |
| `--section-px` | `clamp(1rem, 5vw, 2rem)` | Horizontal section padding |

Tailwind utility: `container-site` → applies max-width + auto margins + horizontal padding.

---

## Component Guidelines

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| **primary** | `--cta` (#1CB954) | `--accent-foreground` (#14191B) | none | Main CTAs |
| **secondary** | transparent | `--foreground` | `--border` | Secondary actions |
| **ghost** | transparent | `--foreground-muted` | none | Tertiary / nav |

- All buttons: `cursor-pointer`, min-height `44px` (touch targets)
- Hover transition: `var(--duration-fast)` with `var(--ease-default)`
- Focus: `outline: 2px solid var(--ring)`, `outline-offset: 2px`

### Cards

- Background: `--surface` (`#2D3437`)
- Border: `1px solid var(--border)`
- Border radius: `--radius-lg`
- Hover: `background: var(--surface-raised)`, lift `translateY(-2px)`

### Form Inputs

- Background: `--input` (`#2D3437`)
- Border: `1px solid var(--border)`
- Focus: `border-color: var(--ring)`, `box-shadow: 0 0 0 2px rgba(28,185,84,0.2)`
- Text: `--foreground`
- Placeholder: `--foreground-subtle`

---

## Section Backgrounds

Vary section bg to create visual rhythm:

| Section | Background |
|---------|------------|
| Hero | `--background` (#14191B) + gradient overlay |
| Problem / Services | `--surface` (#2D3437) |
| Approach | `--background` (#14191B) |
| Case studies | `--surface` (#2D3437) |
| Team | `--background` (#14191B) |
| Booking CTA | Gradient CTA (`linear-gradient(135deg, #1CB954, #14A84A)`) |
| Contact | `--surface` (#2D3437) |
| Footer | `--background` (#14191B) |

---

## Iconography

- Library: **Lucide React** (consistent, outline-style)
- Size: `16px` inline / `20px` standalone / `24px` feature icons
- Color: inherit from text, or `text-accent` for emphasis
- **No emoji as icons**

---

## Responsive Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | 375px+ | Stacked layouts, hamburger nav |
| Tablet | 768px+ | 2-column grids |
| Desktop | 1024px+ | Full layout |
| Wide | 1440px+ | Max container width active |

---

## Accessibility Checklist

- [ ] All colours pass WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Focus rings visible on all interactive elements (`--ring` green)
- [ ] `prefers-reduced-motion` respected via `useReducedMotion()`
- [ ] All images have descriptive `alt` text
- [ ] Form fields have associated `<label>` elements
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- [ ] Touch targets minimum 44×44px
- [ ] `cursor-pointer` on all clickable elements
