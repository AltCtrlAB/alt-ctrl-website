/**
 * company.ts — Single source of truth for all Alt Ctrl brand content.
 *
 * Extracted from Alt_Ctrl_Företagspresentation.pdf (9-page pitch deck).
 * All Phase 3 page components import from here — never hardcode strings in JSX.
 */

export const company = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'alt_ctrl_',
  legalName: 'Allt Under Kontroll AB',
  location: 'Göteborg',
  email: 'info@alltunderkontroll.se',
  year: 2026,

  // ── Messaging ─────────────────────────────────────────────────────────────
  tagline: 'Vi hittar var er tid och era pengar läcker — och täpper till det.',
  taglineEn: 'We find where your time and money are leaking — and plug it.',
  pitch: 'På ett bolag som ert tar manuella processer mer tid än ni tror.',

  // ── Services ──────────────────────────────────────────────────────────────
  services: ['Business', 'Strategi', 'AI', 'Automation'] as const,

  // ── The Problem (page 2) ──────────────────────────────────────────────────
  problems: [
    {
      number: '01',
      title: 'Datan finns — men används inte rätt',
      description:
        'Rapporter som borde ta en timme tar en dag, för att informationen sitter utspridd på fel ställen i organisationen.',
    },
    {
      number: '02',
      title: 'Ni har systemen — men jobbar ändå i Excel',
      description:
        'Flödet stannar upp i manuella steg mellan systemen. Det är där tid och energi försvinner — varje dag.',
    },
    {
      number: '03',
      title: 'AI på agendan — men var börjar man?',
      description:
        'Alla pratar om AI. Få vet vilket problem de ska lösa med det. Fel start kostar mer än det ger.',
    },
  ],

  // ── Cost of inaction (page 3) ─────────────────────────────────────────────
  costMetrics: [
    {
      value: '200–300 KKR',
      label: 'per person · per år',
      description:
        'En medarbetare som lägger 30 % av sin tid på manuell administration — räknat i förlorad produktionskapacitet.',
    },
    {
      value: '35',
      label: 'processer per bolag',
      description:
        'De flesta bolag i er storlek har 35 processer där detta sker systematiskt. Ni är förmodligen inte undantagna.',
    },
    {
      value: '2×',
      label: 'per regulatoriskt krav',
      description:
        'Manuell compliance kostar en gång i tid, och en gång i regulatorisk risk — bötesexponering och liability.',
    },
  ],

  // ── Approach (page 4) ─────────────────────────────────────────────────────
  approach: [
    {
      number: '01',
      title: 'Befintlig data, befintliga system',
      description:
        'Vi byter inte ut något. Vi gör det ni redan har smartare. Inga nya system, ingen teknisk skuld, inga långa integrationer.',
    },
    {
      number: '02',
      title: 'Snabb, mätbar effekt',
      description:
        'Vi identifierar var insatsen är liten och effekten är stor. Rätt prioritering ger mätbar skillnad inom veckor, inte kvartal.',
    },
    {
      number: '03',
      title: 'AI när det faktiskt hjälper',
      description:
        'Vi väljer verktyg efter problem, inte tvärtom. AI används när det ger verklig nytta. Annars väljer vi det enklaste som fungerar.',
    },
  ],

  // ── Process (page 5) ──────────────────────────────────────────────────────
  process: [
    {
      step: '01',
      duration: '2 – 3 veckor',
      phase: 'Förstudie',
      description:
        'Vi kartlägger var tid och pengar läcker. Identifierar era mest lönsamma förbättringsområden. Ni får en prioriteringslista med estimerad effekt i tid och kronor.',
    },
    {
      step: '02',
      duration: '4 – 16 veckor',
      phase: 'Implementation',
      description:
        'Vi bygger och implementerar utan att byta system eller leverantör. Verktygen anpassas till hur ni faktiskt jobbar — inte tvärtom.',
    },
    {
      step: '03',
      duration: 'Löpande',
      phase: 'Iterera & förvalta',
      description:
        'Vi mäter, justerar och bygger vidare. Många engagemang övergår i löpande samarbete med tydliga mätpunkter och effektmål.',
    },
  ],

  // ── Case studies / Reference cases (page 6) ───────────────────────────────
  caseStudies: [
    {
      category: 'Hållbarhetsrapportering',
      title: 'Manuell insamling automatiserad',
      client: 'Processindustribolag',
      description:
        'Manuell insamling och sammanställning band upp en heltidstjänst delar av året. Vi automatiserade flödet i deras befintliga miljö.',
      metric: '~300 000 kr',
      metricLabel: 'Tidsbesparing per år',
    },
    {
      category: 'AI in the loop',
      title: 'Produktinformation på minuter',
      client: 'Stor biltillverkare, Göteborg',
      description:
        'Att skapa produktinformation per produkt tog 40 timmar — manuellt och inkonsistent. Med AI in the loop kortades flödet drastiskt.',
      metric: '40h → 2h',
      metricLabel: 'Per produkt',
    },
    {
      category: 'Cybersäkerhet & NIS2',
      title: 'Compliance som inte kostar',
      client: 'Industribolag, Supply chain',
      description:
        'Manuell hantering av leverantörscompliance var kostsam och skapade regulatorisk exponering. Vi byggde ett strömlinjeformat flöde.',
      metric: '~1,5 MSEK',
      metricLabel: 'Lägre adminkostnad / år',
    },
  ],

  // ── Why us (page 7) ───────────────────────────────────────────────────────
  differentiators: [
    {
      number: '01',
      text: 'Vi förstår verksamheten först, tekniken sedan — inte tvärtom. Beslutet ska vara begripligt för ledning innan en rad kod skrivs.',
    },
    {
      number: '02',
      text: 'Vi bygger det vi rekommenderar. Ingen subkontraktering, ingen overhead och inga handoffs som tappar kontexten.',
    },
    {
      number: '03',
      text: 'Vi har jobbat med allt från Volvo och Stena till bolag i er storlek. Samma metodik — anpassad till er kontext.',
    },
  ],

  // ── Team (page 8) ─────────────────────────────────────────────────────────
  team: [
    {
      initials: 'MM',
      name: 'Magnus Melén',
      role: 'Strategi & Compliance',
      bio: 'Management consulting, hållbarhet, processer och NIS2. Förstår hur beslut fattas i komplexa organisationer och vad som faktiskt driver förändring.',
    },
    {
      initials: 'FA',
      name: 'Foad Alhayek',
      role: 'AI & Automation',
      bio: 'AI/ML-expert med djup kunskap i Python och moderna AI-verktyg. Bygger produktionsfärdiga AI-lösningar som faktiskt levererar värde i verksamheten.',
    },
    {
      initials: 'JP',
      name: 'Jonathan Persson',
      role: 'Fullstack & Operationer',
      bio: 'Fullstack-utvecklare med starkt ben i både utveckling, processer och operations. Bygger lösningarna och ser till att de faktiskt levererar effekt i den dagliga driften.',
    },
  ],

  // ── CTA (page 9) ──────────────────────────────────────────────────────────
  cta: {
    primary: {
      label: 'Boka ett 30-minuterssamtal',
      href: 'mailto:info@alltunderkontroll.se',
    },
    secondary: {
      label: 'Läs mer',
      href: '#om-oss',
    },
  },

  // ── Navigation links ──────────────────────────────────────────────────────
  nav: [
    { label: 'Om oss', href: '#om-oss' },
    { label: 'Tjänster', href: '#tjanster' },
    { label: 'Case', href: '#case' },
    { label: 'Teamet', href: '#teamet' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
} as const

export type Company = typeof company
export type TeamMember = (typeof company.team)[number]
export type CaseStudy = (typeof company.caseStudies)[number]
export type ProcessStep = (typeof company.process)[number]
