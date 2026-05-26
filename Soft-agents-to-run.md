# Soft Agents to Run

Agent expansion plan for alt_ctrl_ website — business value, marketing, SEO, and growth analysis.
Organized in three execution layers.

---

## Layer 1 — Foundation
*These need to happen before the others make sense. No point driving traffic to a site you can't measure.*

---

### 📊 Product Manager
**The problem:** No measurement framework. No analytics, no conversion tracking, no defined success metric. The `mailto:` CTA fires an email client — zero visibility into clicks or bookings.

**What this agent drives:**
- Define 1 primary metric: booked meetings per month
- Add analytics (Plausible or GA4) with event tracking on all CTA clicks
- Track scroll depth per section to find where people drop off
- Instrument the contact form with success/error events
- Evaluate conversion action: `mailto:` vs. calendar embed
- Set 30/60/90 day review checkpoints

**Concrete deliverables:** Analytics implementation, event tracking spec, conversion baseline, monthly dashboard.

---

### 🔍 SEO Specialist
**The problem:** Basic `<title>` and description exist, but three critical issues found:

1. **Domain inconsistency** — `robots.txt` + `sitemap.xml` reference `alltunderkontroll.se` but `og:url` says `altctrl.se`. Google is potentially indexing both or neither.
2. **React SPA with no SSR** — Google can crawl JS-rendered content but it's slower and less reliable. Long-tail Swedish keywords have no pages to land on.
3. **Zero structured data** — No `LocalBusiness`, `ProfessionalService`, or `Organization` schema.

**What this agent drives:**
- Fix the domain — pick one, 301 the other, update all references
- Add `LocalBusiness` + `ProfessionalService` JSON-LD schema to `index.html`
- Add `og:image` (currently missing — social shares show no image)
- Add canonical URL
- Keyword strategy: `"processautomation göteborg"`, `"automatisera hållbarhetsrapportering"`, `"NIS2 compliance automation"`, `"minska manuellt arbete bolag"`
- Evaluate SSR/prerendering (Vite SSG plugin or prerender step)

**Concrete deliverables:** Schema markup in index.html, domain decision, keyword map, prerender evaluation.

---

## Layer 2 — Visibility
*Once the foundation is solid, get in front of the right people — through search, AI, and social.*

---

### 🤖 AI Citation Strategist (AEO/GEO)
**Why this matters:** Buyers — CFOs, operations managers, compliance leads — ask AI assistants things like *"Vilka bolag hjälper svenska SME med processautomation?"* If Alt Ctrl isn't cited, a competitor is.

**What this agent drives:**
- Audit what ChatGPT, Claude, Gemini, and Perplexity return for 20 target queries in Swedish
- The stats on the site (`200–300 KKR per person/år`, `35 processer per bolag`) are citable claims — but have no source, no dedicated URL, no FAQ schema. AI models won't cite unsourced inline text.
- Create a dedicated FAQ / Metodologi section with structured Q&A
- Add `FAQPage` schema to the page
- Write 3–5 answer-optimized paragraphs on the most-asked questions in the category
- Rename case studies with descriptive titles: *"Hur automatiserade ett processindustribolag sin hållbarhetsrapportering och sparade 300 000 kr per år"*

**Concrete deliverables:** Citation audit report, FAQ section content + schema, 5 AEO-optimized content blocks.

---

### 🚀 Agentic Search Optimizer (Wave 3 AI readiness)
**Why this is forward-looking:** AI browser agents (Operator, Claude, Gemini browser mode) complete tasks on behalf of users. When someone tells their AI *"Boka ett möte med Alt Ctrl"* — what happens?

**What this agent finds:** The primary CTA `href="mailto:info@alltunderkontroll.se"` fires an email client. An AI agent cannot complete this. The contact form is standard HTML (good) but has no `data-mcp-*` annotations.

**What this agent drives:**
- Replace/supplement `mailto:` CTA with a proper booking flow (Calendly or similar) that agents can navigate
- Annotate the contact form with `data-mcp-action`, `data-mcp-description` attributes
- Publish a `/mcp-actions.json` discovery endpoint
- Add `<link rel="mcp-actions">` to `<head>`

**Concrete deliverables:** Booking flow recommendation, form annotations, mcp-actions.json.

---

### 💼 LinkedIn Content Creator
**Why now:** The website already contains 6+ months of LinkedIn content in `company.ts`. The cost metrics, case study results, and differentiator arguments are perfect thought leadership raw material.

**What this agent drives:**
- Extract 5 content pillars: Cost of inaction · AI for SME · Case study results · Compliance/NIS2 · Process methodology
- Turn each case study into a LinkedIn post
- The `200–300 KKR per person/år` stat → hook post with calculation walkthrough
- The `35 processer` stat → *"Vi har kartlagt 200+ svenska bolag. Genomsnittet har 35 processer med manuella steg. Här är de 5 vanligaste."*
- Create a 30-day content calendar mapped to the 3 team members
- Add LinkedIn company page URL to the website footer (currently absent)

**Concrete deliverables:** 30-day content calendar, 10 ready-to-post drafts, hook variants per pillar, profile optimization for each team member.

---

## Layer 3 — Growth
*Turn visitors into leads. Turn leads into pipeline. Systematize.*

---

### 📈 Growth Hacker
**The problem:** The site collects nothing except contact form submissions. Every visitor who leaves without booking is gone forever.

**Unleveraged assets:**
- `200–300 KKR per person/år` → perfect lead magnet trigger
- `35 processer` stat → natural curiosity gap
- 3 case studies with concrete ROI numbers

**What this agent drives:**
- **Lead magnet:** *"Räkna ut vad era manuella processer kostar"* — 3-question micro-calculator (antal anställda × andel manuellt arbete × lön) that outputs a personalized cost estimate and captures email
- **Exit intent:** Minimal overlay when someone scrolls past Contact without submitting
- **Content upgrade:** Each case study links to a downloadable 1-page PDF — download captures email
- **Retargeting pixel:** Meta/LinkedIn pixel so every visitor can be retargeted
- **Virality mechanic:** Calculator result is shareable (*"Vi tappar ~1,4 MSEK per år på manuell administration"*)

**Concrete deliverables:** Calculator spec, email capture flow, pixel implementation, PDF case study template.

---

### 🧠 Behavioral Nudge Engine
**The problem:** The contact form is a blank form with no guidance. Someone 80% convinced but unsure what to write will close the tab.

**What this agent drives:**
- Progressive prompt: after 2s on Contact section, show pre-filled question *"Vilket av dessa stämmer bäst in på er? [Rapportering · Systemen pratar inte · AI-strategi]"* that populates the message field
- Social proof nudge above the form: *"3 bolag i Göteborgsregionen bokade möte den här månaden"*
- CTA label: *"Skicka meddelande"* → *"Boka en kostnadsfri genomgång"*
- Post-submit nudge: *"Medans du väntar — läs hur vi sparade 300 000 kr för ett processindustribolag →"*

**Concrete deliverables:** Updated contact form with progressive prompts, social proof element, post-submit flow.

---

### 📤 Outbound Strategist
**Why the website is central to outbound:** The site is the credibility destination for every cold outreach message.

**What this agent drives:**
- ICP from existing site data: Swedish companies 20–300 employees, manufacturing/industrial or compliance-heavy sectors
- **Buying signals to monitor:** LinkedIn job postings for *"controller"*, *"hållbarhetsansvarig"*, *"NIS2"*; funding; new CFO hires — triggers outbound within 30 minutes
- **Signal-based email template** referencing a specific trigger and linking to the relevant case study (not the homepage)
- Opening line: *"Bolag i er storlek tappar i snitt 250 000 kr per heltidstjänst på manuell administration. Vi har en 30-minutersgenomgång som visar exakt var det händer hos er."*
- Deep link landing pages: outbound email → `/case/hållbarhet` so prospects land on the most relevant proof point

**Concrete deliverables:** ICP definition, signal routing playbook, 3 outbound email templates, deep link page spec.

---

## Execution order

| Priority | Agent | Effort | Business impact |
|---|---|---|---|
| 1 | Product Manager | Low | Baseline — nothing else is measurable without this |
| 2 | SEO Specialist | Medium | Fix the domain bug now, add schema, stop bleeding |
| 3 | AI Citation Strategist | Medium | Your buyers use AI — get cited before competitors do |
| 4 | LinkedIn Content Creator | Low | Content already exists in company.ts — just needs writing |
| 5 | Growth Hacker | Medium | First lead magnet unlocks a whole new acquisition channel |
| 6 | Behavioral Nudge Engine | Low | Highest ROI per hour — improves existing traffic |
| 7 | Outbound Strategist | Medium | Connects website to pipeline |
| 8 | Agentic Search Optimizer | Low | Forward-looking — do it while building the booking flow |

---

*Created 2026-05-26. Run UI/design agents separately (already executed — see commit ebc2b19).*
