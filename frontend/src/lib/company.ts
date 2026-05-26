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
  tagline: 'Era processer kostar mer än ni tror. Vi visar exakt var, och fixar det.',
  taglineEn: 'Your processes cost more than you think. We show you exactly where, and fix it.',
  pitch: 'Svenska bolag med 20–300 anställda tappar hundratusentals kronor årligen på processer som borde vara automatiserade. De flesta vet inte ens var.',

  // ── Hero rotating words ───────────────────────────────────────────────────
  heroWords: ['Snabbare beslut', 'Lägre kostnader', 'Smartare processer', 'Färre manuella steg'] as const,

  // ── Services ──────────────────────────────────────────────────────────────
  services: ['Rapportering', 'Compliance', 'Produktdata', 'Manuella flöden'] as const,

  // ── The Problem (page 2) ──────────────────────────────────────────────────
  problems: [
    {
      number: '01',
      title: 'Rapporter som borde ta en timme tar en dag',
      description:
        'Informationen finns i era system. Men att få ut den i rätt format, till rätt person, i tid. Det är där halvdagar försvinner.',
    },
    {
      number: '02',
      title: 'Systemen pratar inte med varandra, ni är limmet',
      description:
        'Ni har investerat i CRM, ERP och rapportverktyg. Men mellan systemen sitter någon och kopierar data manuellt. Varje dag.',
    },
    {
      number: '03',
      title: 'AI på agendan, men var börjar man?',
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
        'En medarbetare med 45 000 kr/mån som lägger 30 % av sin tid på manuell administration. Räknat i förlorad produktionskapacitet. Baserat på vår kartläggning.',
    },
    {
      value: '35',
      label: 'processer per bolag',
      description:
        'Bolag i er storlek har i snitt 35 processer med manuella steg som kan automatiseras. Baserat på vår kartläggning av svenska bolag med 20–300 anställda.',
    },
    {
      value: '2×',
      label: 'per regulatoriskt krav',
      description:
        'Manuell compliance kostar en gång i tid, och en gång i regulatorisk risk, bötesexponering och liability.',
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
        'Vi kartlägger var tid och pengar försvinner. Ni får en prioriteringslista med estimerad effekt i tid och kronor, så ni vet exakt vad varje förbättring är värd innan ni beslutar.',
    },
    {
      step: '02',
      duration: '4 – 16 veckor',
      phase: 'Implementation',
      description:
        'Vi bygger smarta lösningar i er befintliga miljö: automation, AI-verktyg och integrationer anpassade efter era faktiska flöden. Utan att byta system eller leverantör.',
    },
    {
      step: '03',
      duration: 'Löpande',
      phase: 'Mät, justera, bygg vidare',
      description:
        'Vi följer upp med tydliga mätpunkter: tid sparad, kostnad reducerad, processer eliminerade. Många kunder väljer löpande samarbete där vi kontinuerligt identifierar nästa förbättring.',
    },
  ],

  // ── Case studies / Reference cases (page 6) ───────────────────────────────
  caseStudies: [
    {
      category: 'Hållbarhetsrapportering',
      title: 'Manuell insamling automatiserad',
      client: 'Processindustribolag, ~150 anställda',
      description:
        'Manuell insamling och sammanställning band upp en heltidstjänst delar av året. Vi automatiserade flödet i deras befintliga miljö.',
      metric: '~300 000 kr',
      metricLabel: 'Tidsbesparing per år',
    },
    {
      category: 'AI in the loop',
      title: 'Från 40 timmar till 2. Per produkt.',
      client: 'Produktbolag, industri, ~80 anställda',
      description:
        'Att skapa produktinformation per produkt tog 40 timmar, manuellt och inkonsistent. Med AI in the loop kortades flödet drastiskt.',
      metric: '40h → 2h',
      metricLabel: 'Per produkt',
    },
    {
      category: 'Cybersäkerhet & NIS2',
      title: 'Compliance som inte kostar',
      client: 'Industribolag med 200+ leverantörer',
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
      text: 'Vi förstår verksamheten först, tekniken sedan, inte tvärtom. Beslutet ska vara begripligt för ledning innan en rad kod skrivs.',
    },
    {
      number: '02',
      text: 'Vi bygger det vi rekommenderar. Ingen subkontraktering, ingen overhead och inga handoffs som tappar kontexten.',
    },
    {
      number: '03',
      text: 'Teamet har bakgrund från storbolag och managementkonsulting, men vi bygger för bolag som vill ha snabb effekt utan enterprise-overhead.',
    },
  ],

  // ── Team (page 8) ─────────────────────────────────────────────────────────
  team: [
    {
      initials: 'MM',
      name: 'Magnus Melén',
      role: 'Strategi & Compliance',
      bio: 'Leder förstudier och kartläggningar. Bakgrund från managementkonsulting med fokus på hållbarhet, compliance och NIS2. Förstår hur beslut fattas och vad som krävs för att en förändring faktiskt händer.',
    },
    {
      initials: 'FA',
      name: 'Foad Alhayek',
      role: 'AI & Automation',
      bio: 'Bygger automatiseringar och AI-lösningar som faktiskt hamnar i produktion. Djup kunskap i Python och moderna AI-verktyg, med fokus på att lösa verkliga problem, inte teknikdemos.',
    },
    {
      initials: 'JP',
      name: 'Jonathan Persson',
      role: 'Fullstack & Ops',
      bio: 'Bygger lösningarna och driver leveransen. Fullstack-utvecklare med bakgrund i operations och sälj. Ser till att det vi levererar faktiskt funkar i er vardag.',
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
