import type { ProfileLocale } from "./profile-locale";

export type ScoutUi = {
  eyebrow: string;
  title: string;
  defaultDescription: string;
  readTime: string;
  focus: string;
  immediateContext: string;
  role: string;
  category: string;
  currentClub: string;
  marketStatus: string;
  executive: string;
  whatHeBrings: string;
  whyRoster: string;
  immediateLever: string;
  toVerify: string;
  checklist: string;
  idealFit: string;
  fitSubtitle: string;
  nextStep: string;
};

export type MarketUi = {
  eyebrow: string;
  title: string;
  description: string;
  tradingDesk: string;
  openChannels: (open: number, total: number) => string;
  timeWindow: string;
  availableFrom: string;
  economics: string;
  projectGoal: string;
  fitSought: string;
  opportunityType: string;
  availableFor: string;
  availableHint: string;
  regions: string;
  regionsHint: string;
};

export type StatsUi = {
  eyebrow: string;
  title: string;
  descriptionSuffix: string;
  points: string;
  assists: string;
  rebounds: string;
  games: string;
  minutes: string;
  steals: string;
  turnovers: string;
  twoAttempts: string;
  threeAttempts: string;
  perGame: string;
  quickIndicators: string;
  astToRatio: string;
  effectiveFg: string;
  shootingEfficiency: string;
  shootingHint: string;
  fg: string;
  twoPt: string;
  threePt: string;
  ft: string;
  volumeSelection: string;
  volumeHint: string;
  volumeShare: (pct: number) => string;
  totalAttempts: string;
  lastFive: string;
  lastFiveHint: string;
  date: string;
  opponent: string;
  min: string;
  pts: string;
  trend: string;
  reb: string;
  ast: string;
  stl: string;
  to: string;
  pointsMobile: string;
};

export type TechnicalUi = {
  eyebrow: string;
  title: string;
  description: string;
  staffBadge: string;
  onCourtIdentity: string;
  profileSummary: string;
  systemContext: string;
  systemTitle: string;
  minutesRole: string;
  rosterRole: string;
  rosterAlignment: string;
  strengths: string;
  strengthsHint: string;
  growth: string;
  growthHint: string;
};

export type WhyHeFitsUi = {
  eyebrow: string;
  title: string;
  description: string;
  rosterBadge: string;
  clubMessage: string;
  scenarioMap: string;
  whereItFits: string;
  scenariosMeta: (n: number) => string;
  idealContext: string;
  reviewCarefully: string;
  scenarioLabel: (n: number) => string;
};

export type CareerUi = {
  eyebrow: string;
  title: string;
  description: string;
  empty: string;
  coachLabel: string;
};

export type HonorsUi = {
  eyebrow: string;
  title: string;
  description: string;
  empty: string;
  yearUnknown: string;
};

export type ContactsUi = {
  eyebrow: string;
  title: string;
  description: string;
  phone: string;
  callRep: string;
  phonePending: string;
  whatsapp: string;
  writeWhatsapp: string;
  whatsappPending: string;
  email: string;
  writeEmail: string;
  emailPending: string;
  highlights: string;
  watchClip: string;
  social: string;
  verified: string;
  agency: string;
  representative: string;
};

export type FooterUi = {
  playerCard: string;
  legal: string;
  controller: string;
  platform: string;
  platformBody: string;
  updated: string;
  backToTop: string;
  copyright: string;
};

export type VideoUi = {
  clip: string;
  featured: string;
  nowPlaying: string;
  share: { label: string; labelShort?: string; shared: string; copied: string; error: string };
  shareHint: string;
  videoOnlyEyebrow: string;
  backToFullProfile: string;
  fullGameEyebrow: string;
  fullGameNote: string;
  fullGameRequestCta: string;
  fullGameOpenCta: string;
};

export type ReturnToPlayUi = {
  videoProofDefault: string;
  videoPlaceholder: string;
  documented: string;
  ctaDefault: string;
  ctaSupport: string;
  updatedPrefix: string;
  statusHeading: string;
  injuryContext: string;
  activeClipLabel: string;
  galleryMeta: string;
  phaseStop: string;
  phaseRecovery: string;
  phaseReturn: string;
  monitoring: string;
  nowPlaying: string;
};

export type ProfileUi = {
  htmlLang: string;
  skipIntro: string;
  player: string;
  birthYear: string;
  profileUpdated: string;
  team: string;
  profilePhotoAlt: string;
  watchHighlights: string;
  contactAgent: string;
  seasonAvg: string;
  seasonTotals: string;
  languageSwitch: { label: string; toEn: string; toIt: string };
  share: { label: string; shared: string; copied: string; error: string };
  nav: {
    openMenu: string;
    closeMenu: string;
    dialogLabel: string;
    sectionsLabel: string;
    goTo: string;
    close: string;
    scout: string;
    market: string;
    returnToPlay: string;
    video: string;
    stats: string;
    fit: string;
    gallery: string;
    socialKit: string;
    career: string;
    honors: string;
    contacts: string;
  };
  scout: ScoutUi;
  market: MarketUi;
  stats: StatsUi;
  technical: TechnicalUi;
  whyHeFits: WhyHeFitsUi;
  gallery: { defaultTitle: string };
  career: CareerUi;
  honors: HonorsUi;
  contacts: ContactsUi;
  returnToPlayUi: ReturnToPlayUi;
  footer: FooterUi;
  video: VideoUi;
};

const UI_IT: ProfileUi = {
  htmlLang: "it",
  skipIntro: "Salta intro",
  player: "Giocatore",
  birthYear: "classe",
  profileUpdated: "Scheda aggiornata",
  team: "Squadra",
  profilePhotoAlt: "foto profilo",
  watchHighlights: "Guarda gli highlights",
  contactAgent: "Contatta procuratore",
  seasonAvg: "Media stagione",
  seasonTotals: "Totali stagione",
  languageSwitch: { label: "Lingua", toEn: "English", toIt: "Italiano" },
  share: { label: "Condividi link", shared: "Condiviso", copied: "Copiato", error: "Errore" },
  nav: {
    openMenu: "Apri menu sezioni",
    closeMenu: "Chiudi menu",
    dialogLabel: "Menu sezioni profilo",
    sectionsLabel: "Sezioni profilo",
    goTo: "Vai a",
    close: "Chiudi",
    scout: "Scout",
    market: "Mercato",
    returnToPlay: "Rientro",
    video: "Video",
    stats: "Stats",
    fit: "Fit",
    gallery: "Gallery",
    socialKit: "Social kit",
    career: "Carriera",
    honors: "Palmares",
    contacts: "Contatti",
  },
  scout: {
    eyebrow: "30 secondi",
    title: "Pitch scout per il club",
    defaultDescription:
      "~30 sec: perché questo profilo porta valore ora, dove incide sul campo e cosa confermare prima di decidere.",
    readTime: "Lettura ≈ 30s",
    focus: "Focus: valorizzazione rapida",
    immediateContext: "Contesto immediato",
    role: "Ruolo",
    category: "Categoria",
    currentClub: "Club attuale",
    marketStatus: "Status mercato",
    executive: "Executive",
    whatHeBrings: "Cosa dà ora",
    whyRoster: "Perché portarlo nel roster",
    immediateLever: "Leva immediata · perché sceglierlo",
    toVerify: "Da verificare",
    checklist: "Checklist live / prossimo screening",
    idealFit: "Fit ideale",
    fitSubtitle: "Allineamento tattico e ruolo nel roster",
    nextStep:
      "Prossimo passo: incrociare con video hub, numeri e status di mercato — poi contatto diretto al referente in fondo pagina.",
  },
  market: {
    eyebrow: "Disponibilità",
    title: "Status mercato",
    description:
      "Finestre temporali, modalità di ingresso valutate e aree geografiche — quadro chiaro prima di aprire un thread con il referente.",
    tradingDesk: "Trading desk",
    openChannels: (open, total) => `${open}/${total} canali aperti`,
    timeWindow: "Finestra temporale",
    availableFrom: "Disponibile da",
    economics: "Economico",
    projectGoal: "Obiettivo progetto",
    fitSought: "Fit ricercato",
    opportunityType: "Tipo opportunità cercata",
    availableFor: "Disponibile per",
    availableHint: "Seleziona cosa ha senso aprire in prima battuta.",
    regions: "Zone valutate",
    regionsHint: "Mercati geografici in cui ha senso allineare scouting e contatti.",
  },
  stats: {
    eyebrow: "Numeri",
    title: "Statistiche",
    descriptionSuffix: "— sintesi per partita e ultime uscite.",
    points: "Punti",
    assists: "Assist",
    rebounds: "Rimbalzi",
    games: "Partite",
    minutes: "Minuti",
    steals: "Recuperi",
    turnovers: "Palle perse",
    twoAttempts: "Tentativi da 2",
    threeAttempts: "Tentativi da 3",
    perGame: "a partita",
    quickIndicators: "Indicatori rapidi",
    astToRatio: "Assist / palla persa",
    effectiveFg: "FG% effettivo",
    shootingEfficiency: "Efficienza al tiro",
    shootingHint: "Percentuali di stagione — confronto visivo immediato per scouting.",
    fg: "Tiro dal campo (FG%)",
    twoPt: "Tiro da 2 (2P%)",
    threePt: "Tiro da 3 (3P%)",
    ft: "Tiro libero (FT%)",
    volumeSelection: "Volume e selezione",
    volumeHint: "Tentativi medi: mix tra gioco interno e perimeter.",
    volumeShare: (pct) => `${pct}% del volume tattico complessivo (2pt + 3pt).`,
    totalAttempts: "Tentativi totali / partita",
    lastFive: "Ultime 5 partite",
    lastFiveHint: "Log compatto; punti in evidenza rispetto al massimo nel campione.",
    date: "Data",
    opponent: "Avversario",
    min: "Min",
    pts: "Pts",
    trend: "Trend",
    reb: "Rim",
    ast: "Ast",
    stl: "Rec",
    to: "Pé",
    pointsMobile: "punti",
  },
  technical: {
    eyebrow: "Mappa tattica",
    title: "Fit tecnico",
    description:
      "Per lo staff: tipo di giocatore in campo, sistema e ruolo in roster dove rende di più, leve da usare in partita e margini da lavorare nel tempo.",
    staffBadge: "Staff tecnico",
    onCourtIdentity: "Identità sul campo",
    profileSummary: "Sintesi profilo",
    systemContext: "Attacco / difesa · contesto",
    systemTitle: "Sistema che esalta il valore",
    minutesRole: "Minuti e funzione",
    rosterRole: "Ruolo in roster",
    rosterAlignment: "Allineamento roster",
    strengths: "Punti di forza",
    strengthsHint: "Leve in gara — da sfruttare in possesso e in chiusura",
    growth: "Aree di crescita",
    growthHint: "Tema da seguire se salgono minuti e responsabilità",
  },
  whyHeFits: {
    eyebrow: "Roster · sistemi · contesto",
    title: "Perché calza",
    description:
      "Tradotto in pratica: in che tipo di squadra questo profilo esprime il massimo — e quando conviene fermarsi e riflettere prima di decidere.",
    rosterBadge: "Unicità roster",
    clubMessage: "Messaggio chiave per club",
    scenarioMap: "Mappa degli scenari",
    whereItFits: "Dove incastra davvero",
    scenariosMeta: (n) => `${n} contesti · sintesi decisionale`,
    idealContext: "Contesto ideale",
    reviewCarefully: "Da valutare con attenzione",
    scenarioLabel: (n) => `Scenario ${n}`,
  },
  gallery: { defaultTitle: "Gallery" },
  career: {
    eyebrow: "Club",
    title: "Percorso",
    description: "Linea temporale stagioni e contesti: utile per contesto sportivo rapido senza aprire referti completi.",
    empty: "Nessun passaggio carriera in scheda.",
    coachLabel: "Allenatore",
  },
  honors: {
    eyebrow: "Palmares",
    title: "Titoli e riconoscimenti",
    description:
      "Premi ufficiali e traguardi citati in scheda — sempre da confermare con fonti federazione / club quando serve una due diligence.",
    empty: "Nessun elemento palmares in scheda.",
    yearUnknown: "Anno n/d",
  },
  contacts: {
    eyebrow: "Rubrica operativa",
    title: "Canali diretti",
    description: "Telefono, WhatsApp ed email sono i canali ufficiali per club e scouting.",
    phone: "Telefono",
    callRep: "Chiama il referente",
    phonePending: "Contatto in arrivo",
    whatsapp: "WhatsApp",
    writeWhatsapp: "Scrivi su WhatsApp",
    whatsappPending: "Su richiesta",
    email: "Email",
    writeEmail: "Scrivi al referente",
    emailPending: "Su richiesta",
    highlights: "Highlights",
    watchClip: "Guarda il clip principale",
    social: "Social",
    verified: "Verificato",
    agency: "Agenzia",
    representative: "Referente",
  },
  returnToPlayUi: {
    videoProofDefault: "Video / offseason",
    videoPlaceholder: "Clip in arrivo",
    documented: "Documentato",
    ctaDefault: "Richiedi aggiornamenti fisici",
    ctaSupport:
      "Per club, procuratori e staff tecnici: richiedi documentazione aggiornata tramite i canali ufficiali.",
    updatedPrefix: "Aggiornamento",
    statusHeading: "Status rientro",
    injuryContext: "Contesto infortunio",
    activeClipLabel: "Clip attiva",
    galleryMeta: "1 clip principale · 3 anteprime",
    phaseStop: "Stop",
    phaseRecovery: "Recupero",
    phaseReturn: "Rientro documentato",
    monitoring: "Monitoraggio attivo",
    nowPlaying: "In riproduzione",
  },
  footer: {
    playerCard: "Player Card",
    legal: "Informazioni legali",
    controller: "Titolare",
    platform: "Piattaforma",
    platformBody: "Player Card per scouting, club e agenzie. Template condiviso, dominio dedicato per ogni atleta.",
    updated: "Aggiornato",
    backToTop: "Torna su ↑",
    copyright: "Scheda atleta",
  },
  video: { clip: "Clip", featured: "In evidenza", nowPlaying: "Now playing", share: { label: "Condividi link clip", labelShort: "Condividi clip", shared: "Condiviso", copied: "Link copiato", error: "Errore" }, shareHint: "Un link facile da mandare ad agenti, club e società — solo video, senza tutta la scheda.", videoOnlyEyebrow: "Sala video", backToFullProfile: "Scheda completa", fullGameEyebrow: "Partita completa", fullGameNote: "Accesso controllato — tipico flusso tra club e rappresentanza.", fullGameRequestCta: "Richiedi partita", fullGameOpenCta: "Apri partita" },
};

const UI_EN: ProfileUi = {
  htmlLang: "en",
  skipIntro: "Skip intro",
  player: "Player",
  birthYear: "class",
  profileUpdated: "Profile updated",
  team: "Team",
  profilePhotoAlt: "profile photo",
  watchHighlights: "Watch highlights",
  contactAgent: "Contact agent",
  seasonAvg: "Season averages",
  seasonTotals: "Season totals",
  languageSwitch: { label: "Language", toEn: "English", toIt: "Italiano" },
  share: { label: "Share link", shared: "Shared", copied: "Copied", error: "Error" },
  nav: {
    openMenu: "Open section menu",
    closeMenu: "Close menu",
    dialogLabel: "Profile section menu",
    sectionsLabel: "Profile sections",
    goTo: "Go to",
    close: "Close",
    scout: "Scout",
    market: "Market",
    returnToPlay: "Return",
    video: "Video",
    stats: "Stats",
    fit: "Fit",
    gallery: "Gallery",
    socialKit: "Social kit",
    career: "Career",
    honors: "Honors",
    contacts: "Contact",
  },
  scout: {
    eyebrow: "30 seconds",
    title: "Scout pitch for clubs",
    defaultDescription:
      "~30 sec: why this profile adds value now, where he impacts the game, and what to confirm before deciding.",
    readTime: "Read time ≈ 30s",
    focus: "Focus: quick evaluation",
    immediateContext: "Immediate context",
    role: "Role",
    category: "Level",
    currentClub: "Current club",
    marketStatus: "Market status",
    executive: "Executive",
    whatHeBrings: "What he brings now",
    whyRoster: "Why add him to the roster",
    immediateLever: "Immediate upside · why pick him",
    toVerify: "To verify",
    checklist: "Live checklist / next screening",
    idealFit: "Ideal fit",
    fitSubtitle: "Tactical alignment and roster role",
    nextStep:
      "Next step: cross-check with video hub, stats and market status — then contact the representative at the bottom of the page.",
  },
  market: {
    eyebrow: "Availability",
    title: "Market status",
    description:
      "Timing windows, entry options and geographic areas — a clear picture before opening a thread with the representative.",
    tradingDesk: "Trading desk",
    openChannels: (open, total) => `${open}/${total} channels open`,
    timeWindow: "Timing window",
    availableFrom: "Available from",
    economics: "Economics",
    projectGoal: "Project goal",
    fitSought: "Fit sought",
    opportunityType: "Opportunity type sought",
    availableFor: "Available for",
    availableHint: "What makes sense to open first.",
    regions: "Regions considered",
    regionsHint: "Markets where scouting and outreach are aligned.",
  },
  stats: {
    eyebrow: "Numbers",
    title: "Statistics",
    descriptionSuffix: "— per-game summary and recent outings.",
    points: "Points",
    assists: "Assists",
    rebounds: "Rebounds",
    games: "Games",
    minutes: "Minutes",
    steals: "Steals",
    turnovers: "Turnovers",
    twoAttempts: "2PT attempts",
    threeAttempts: "3PT attempts",
    perGame: "per game",
    quickIndicators: "Quick indicators",
    astToRatio: "Assists / turnover",
    effectiveFg: "Effective FG%",
    shootingEfficiency: "Shooting efficiency",
    shootingHint: "Season percentages — instant visual comparison for scouting.",
    fg: "Field goal (FG%)",
    twoPt: "2-point (2P%)",
    threePt: "3-point (3P%)",
    ft: "Free throw (FT%)",
    volumeSelection: "Volume and shot selection",
    volumeHint: "Average attempts: mix of interior and perimeter.",
    volumeShare: (pct) => `${pct}% of overall shot volume (2PT + 3PT).`,
    totalAttempts: "Total attempts / game",
    lastFive: "Last 5 games",
    lastFiveHint: "Compact log; points highlighted vs sample high.",
    date: "Date",
    opponent: "Opponent",
    min: "Min",
    pts: "Pts",
    trend: "Trend",
    reb: "Reb",
    ast: "Ast",
    stl: "Stl",
    to: "TO",
    pointsMobile: "pts",
  },
  technical: {
    eyebrow: "Tactical map",
    title: "Technical fit",
    description:
      "For staff: player type on court, system and roster role where he adds most, in-game levers and long-term margins.",
    staffBadge: "Coaching staff",
    onCourtIdentity: "On-court identity",
    profileSummary: "Profile summary",
    systemContext: "Offense / defense · context",
    systemTitle: "System that maximizes value",
    minutesRole: "Minutes and function",
    rosterRole: "Roster role",
    rosterAlignment: "Roster alignment",
    strengths: "Strengths",
    strengthsHint: "In-game levers — use on offense and in closeouts",
    growth: "Growth areas",
    growthHint: "Track if minutes and responsibility increase",
  },
  whyHeFits: {
    eyebrow: "Roster · systems · context",
    title: "Why he fits",
    description:
      "In practice: which team types unlock this profile — and when to pause and reassess before deciding.",
    rosterBadge: "Roster uniqueness",
    clubMessage: "Key message for clubs",
    scenarioMap: "Scenario map",
    whereItFits: "Where he truly fits",
    scenariosMeta: (n) => `${n} contexts · decision summary`,
    idealContext: "Ideal context",
    reviewCarefully: "Review carefully",
    scenarioLabel: (n) => `Scenario ${n}`,
  },
  gallery: { defaultTitle: "Gallery" },
  career: {
    eyebrow: "Clubs",
    title: "Career path",
    description: "Season-by-season timeline — quick sporting context without opening full box scores.",
    empty: "No career stops listed on this profile.",
    coachLabel: "Head coach",
  },
  honors: {
    eyebrow: "Honors",
    title: "Titles and recognition",
    description:
      "Official awards and milestones cited on this profile — always confirm with federation / club sources when due diligence matters.",
    empty: "No honors listed on this profile.",
    yearUnknown: "Year n/a",
  },
  contacts: {
    eyebrow: "Contact desk",
    title: "Direct channels",
    description: "Phone, WhatsApp and email are the official channels for clubs and scouting.",
    phone: "Phone",
    callRep: "Call representative",
    phonePending: "Contact coming soon",
    whatsapp: "WhatsApp",
    writeWhatsapp: "Message on WhatsApp",
    whatsappPending: "On request",
    email: "Email",
    writeEmail: "Email representative",
    emailPending: "On request",
    highlights: "Highlights",
    watchClip: "Watch main clip",
    social: "Social",
    verified: "Verified",
    agency: "Agency",
    representative: "Representative",
  },
  returnToPlayUi: {
    videoProofDefault: "Video / offseason",
    videoPlaceholder: "Clip coming soon",
    documented: "Documented",
    ctaDefault: "Request physical updates",
    ctaSupport:
      "For clubs, agents and technical staff: request updated physical documentation through the official contact channels.",
    updatedPrefix: "Updated",
    statusHeading: "Return status",
    injuryContext: "Injury context",
    activeClipLabel: "Active clip",
    galleryMeta: "1 main clip · 3 previews",
    phaseStop: "Stop",
    phaseRecovery: "Recovery",
    phaseReturn: "Documented return",
    monitoring: "Active monitoring",
    nowPlaying: "Now playing",
  },
  footer: {
    playerCard: "Player Card",
    legal: "Legal information",
    controller: "Data controller",
    platform: "Platform",
    platformBody: "Player Card for scouting, clubs and agencies. Shared template, dedicated domain per athlete.",
    updated: "Updated",
    backToTop: "Back to top ↑",
    copyright: "Athlete profile",
  },
  video: { clip: "Clip", featured: "Featured", nowPlaying: "Now playing", share: { label: "Share clip link", labelShort: "Share clips", shared: "Shared", copied: "Link copied", error: "Error" }, shareHint: "An easy link for agents, clubs and organizations — videos only, not the full profile.", videoOnlyEyebrow: "Video room", backToFullProfile: "Full profile", fullGameEyebrow: "Full game", fullGameNote: "Controlled access — typical flow between club and representation.", fullGameRequestCta: "Request game tape", fullGameOpenCta: "Open game" },
};

export function getProfileUi(locale: ProfileLocale): ProfileUi {
  return locale === "en" ? UI_EN : UI_IT;
}
