export type VideoProvider = "youtube" | "vimeo";

export type MarketAvailabilityId =
  | "tryout"
  | "loan"
  | "transfer"
  | "showcase"
  | "abroad";

export type VideoCategoryId =
  | "shooting"
  | "defense"
  | "transition"
  | "playmaking"
  | "pnr"
  | "iso"
  | "rebounding"
  | "athleticism";

export interface AgencyRef {
  name: string;
  representative?: string;
  website?: string;
}

export interface RepresentativeContact {
  name: string;
  role: string;
  email?: string;
  /** Mostra card “Email” senza link: testo es. “In arrivo” */
  emailPublicLabel?: string;
  phone?: string;
  /** Mostra card “Telefono” senza link: testo es. “Su richiesta” (nessun numero pubblico) */
  phonePublicLabel?: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
}

export interface AthleteVideo {
  title: string;
  url: string;
  note?: string;
  /** Copertina clip locale (path in `public`) */
  poster?: string;
}

/** Highlights mensili in sala video — un clip per mese di stagione (es. `2025-09`) */
export interface MonthlyHighlight {
  /** Mese ISO `yyyy-mm` */
  month: string;
  /** Override etichetta tab (es. "Settembre 2025") */
  label?: string;
  clip: AthleteVideo;
}

export interface AthleteVideos {
  /** Copertina default per clip mp4 in sala video */
  poster?: string;
  main: AthleteVideo & { provider?: VideoProvider };
  /** Max 2 consigliati: miniature accanto al player principale in Film room */
  filmRoomSide?: AthleteVideo[];
  /** Un highlight per mese di stagione — sostituisce playbook/filmRoomSide quando valorizzato */
  monthlyHighlights?: MonthlyHighlight[];
  categories: Array<{
    id: VideoCategoryId;
    label: string;
    clips: AthleteVideo[];
  }>;
  fullGame?: AthleteVideo;
}

export interface MarketAvailability {
  id: MarketAvailabilityId;
  label: string;
  active: boolean;
}

export interface GameLogRow {
  date: string;
  opponent: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals?: number;
  turnovers?: number;
}

export type ShotChartZoneId =
  | "restricted"
  | "paint"
  | "midRange"
  | "cornerLeft"
  | "cornerRight"
  | "aboveBreak";

export interface ShotChartZone {
  id: ShotChartZoneId;
  made: number;
  attempted: number;
}

/** Coordinate normalizzate 0–100 (viewBox mezza campo, canestro in alto). */
export interface ShotChartPoint {
  x: number;
  y: number;
  made: boolean;
}

export interface ShotChartData {
  zones: ShotChartZone[];
  /** Tracking puntuale opzionale; altrimenti i punti si generano dalle zone. */
  shots?: ShotChartPoint[];
  /** true se generato da medie 2pt/3pt (non tracking pieno) */
  synthesized?: boolean;
}

export interface SeasonTotals {
  goals: number;
  assists: number;
  minutes: number;
}

/** Totali stagione basket quando non si hanno medie/percents completi */
export interface BasketballSeasonTotals {
  points: number;
  minutes: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  twoPointMade: number;
  threePointMade: number;
}

export interface SeasonStats {
  label: string;
  games: number;
  /** Totali stagione in hero (calcio) — se assenti si usano le medie. */
  seasonTotals?: SeasonTotals;
  /** Totali stagione basket (punti, minuti, breakdown tiro) */
  basketballTotals?: BasketballSeasonTotals;
  minutesPerGame: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  turnoversPerGame: number;
  fgPct: number;
  twoPct: number;
  threePct: number;
  ftPct: number;
  twoAttPerGame: number;
  threeAttPerGame: number;
  lastGames: GameLogRow[];
  /** Mappa tiro stile NBA (zone); se assente si stima da medie 2pt/3pt */
  shotChart?: ShotChartData;
  hideShotChart?: boolean;
  hideShootingBreakdown?: boolean;
}

export interface CareerStep {
  season: string;
  club: string;
  category: string;
  notes?: string;
  /** Allenatore di riferimento nel passaggio */
  coach?: string;
  /** Logo squadra (`/athletes/...` in `public`) */
  clubLogo?: string;
}

export interface CareerSectionStyle {
  /** Sfondo sezione percorso (`/athletes/...` in `public`) */
  backgroundImage: string;
  objectPosition?: string;
  objectPositionMobile?: string;
}

export interface HonorItem {
  title: string;
  detail: string;
  year?: string;
}

export interface VerificationBadge {
  id: string;
  label: string;
  ok: boolean;
}

export interface AgencyRosterCard {
  slug: string;
  name: string;
  role: string;
  club: string;
  category?: string;
  image: string;
}

/** Immagine nella sezione gallery (path in `public`, es. `/athletes/foto.jpg`) */
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface AthleteGallery {
  /** Default: "Gallery" */
  title?: string;
  description?: string;
  items: GalleryImage[];
}

export type SocialKitFormat = "post" | "story" | "reel";

/** Asset scaricabile per Instagram (post 1:1, storia o reel 9:16) */
export interface SocialKitAsset {
  id: string;
  title: string;
  format: SocialKitFormat;
  /** Path in `public` o URL assoluto */
  src: string;
  /** Testo suggerito per la caption Instagram */
  caption?: string;
  /** Data gara (ISO yyyy-mm-dd) */
  matchDate?: string;
  opponent?: string;
  downloadName?: string;
}

/** Contenuti social raggruppati per mese di stagione */
export interface SocialKitMonth {
  /** ISO yyyy-mm — es. "2025-10" */
  month: string;
  /** Etichetta opzionale — es. "Ottobre 2025" */
  label?: string;
  items: SocialKitAsset[];
}

export interface AthleteSocialMediaKit {
  /** Default: "Contenuti pronti per i social" */
  title?: string;
  description?: string;
  /** Es. "Aggiornato dopo ogni gara" */
  statusLabel?: string;
  /** Codice a 4 cifre per sbloccare download e anteprime */
  accessCode?: string;
  /** WhatsApp per richieste grafica — numero (393...) o URL wa.me */
  requestWhatsApp?: string;
  /** Raggruppamento mensile — consigliato per stagioni lunghe */
  months?: SocialKitMonth[];
  /** Lista piatta legacy — auto-raggruppata per mese da matchDate */
  items?: SocialKitAsset[];
}

export interface ReturnToPlayStatusItem {
  label: string;
  value: string;
}

export interface ReturnToPlayVideoProof {
  id: string;
  title: string;
  /** Path in `public`, URL assoluto o YouTube — opzionale finché il clip non è pronto */
  url?: string;
  poster?: string;
}

/** Sezione rientro post-infortunio — opzionale, visibile solo se presente */
export interface ReturnToPlaySection {
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** @deprecated Preferire `injuryContext` */
  intro?: string[];
  /** Contesto infortunio strutturato (label + valore) */
  injuryContext?: ReturnToPlayStatusItem[];
  /** @deprecated Preferire `injuryContext` */
  focusAreas?: string[];
  status: ReturnToPlayStatusItem[];
  videoProofTitle?: string;
  videoProof: ReturnToPlayVideoProof[];
  ctaLabel?: string;
  /** Default: `#contatti` */
  ctaHref?: string;
  /** Data aggiornamento sezione (ISO yyyy-mm-dd) */
  updatedAt?: string;
  /** @deprecated Usare `updatedAt` — fallback testuale badge header */
  statusLabel?: string;
}

export type ShopProductCategory = "shoes" | "jersey" | "apparel" | "accessory";

export interface ShopProduct {
  title: string;
  subtitle?: string;
  category: ShopProductCategory;
  /** Copertina prodotto (path in `public`) */
  image?: string;
  /** URL shop ufficiale (Nike, Jordan, ecc.) */
  url: string;
  badge?: string;
}

/** Shop ufficiale atleta — link esterni, sezione opzionale */
export interface AthleteShop {
  /** Paragrafo sotto il titolo sezione (override UI default) */
  description?: string;
  /** Link principale allo shop brand */
  storeUrl?: string;
  storeLabel?: string;
  products: ShopProduct[];
}

export type AthleteStoryTheme = "default" | "legend";

export interface AthleteStoryChapter {
  /** Periodo o anno — es. "1991–93" */
  era: string;
  title: string;
  body: string;
  quote?: string;
  stat?: { label: string; value: string };
  /** Immagine di sfondo (path in `public`) */
  image?: string;
  /** Clip YouTube del capitolo (watch o Shorts) */
  video?: string;
}

/** Sezione narrativa sotto l'hero — opzionale */
export interface AthleteStory {
  eyebrow?: string;
  title?: string;
  lead?: string;
  pullQuote?: string;
  pullQuoteAttribution?: string;
  theme?: AthleteStoryTheme;
  chapters: AthleteStoryChapter[];
}

/** Configurazione GDPR / privacy per sito atleta (override opzionali). */
export interface AthleteLegalConfig {
  /** Titolare del trattamento dei dati pubblicati sul sito */
  dataController?: {
    name: string;
    email: string;
    address?: string;
    website?: string;
  };
  /** Nota su contitolarità o ruolo piattaforma (es. KataHero come fornitore tecnico) */
  platformRoleNote?: string;
  /** URL informativa privacy esterna (se non usi quella generata dal template) */
  privacyPolicyUrl?: string;
  /** URL cookie policy esterna */
  cookiePolicyUrl?: string;
  /** Data ultimo aggiornamento informativa (ISO yyyy-mm-dd) */
  policyUpdated?: string;
}

export type ProfileLocaleCode = "it" | "en";

export type HeroBackgroundVideoTheme = "default" | "legend";

export interface HeroBackgroundVideoClip {
  src: string;
  anchor: "left" | "center" | "right";
  fit?: "cover" | "contain";
  objectPosition?: string;
  /** Larghezza area clip (es. `38%`) */
  width?: string;
}

export interface AthleteProfile {
  slug: string;
  /** Se false, il profilo resta in archivio ma non viene pubblicato. */
  published?: boolean;
  /** Lingue disponibili oltre all'italiano (default). */
  locales?: ProfileLocaleCode[];
  seo: {
    title: string;
    description: string;
    /** Dominio ufficiale del sito giocatore (es. https://nome.talent.katahero.com) */
    publicSiteUrl?: string;
    /** Anteprima link (OG / Twitter); default: `header.heroImage` */
    ogImage?: string;
    /** Cache-bust per crawler social (Instagram/Facebook) — es. "20260619" */
    ogImageVersion?: string;
  };
  /** GDPR: titolare, note legali e override policy (default da agenzia + piattaforma) */
  legal?: AthleteLegalConfig;
  header: {
    heroImage: string;
    name: string;
    number?: string;
    sport: string;
    role: string;
    birthYear: number;
    heightCm: number;
    nationality: string;
    /** Squadra attuale */
    currentClub: string;
    /** Logo squadra attuale — path in `public`, es. `/athletes/latinalogo.png` */
    currentClubLogo?: string;
    category: string;
    league?: string;
    /** Paragrafo sopra le chip: se assente usa testo generico Player Card */
    dashboardIntro?: string;
    /** Sintesi identità tecnica (hero), es. mano dominante e ruolo */
    identityNote?: string;
    /** Ritaglio foto hero: utile per ritratti verticali */
    heroImageFocus?: "top" | "center" | "bottom";
    /** CSS object-position per avatar hero (es. "50% 18%") */
    heroImageObjectPosition?: string;
    /** Nasconde il disco foto in hero (es. quando lo sfondo è già il ritratto) */
    heroHideAvatar?: boolean;
    /** Immagine statica full-bleed dietro hero (mobile + desktop) */
    heroBackgroundImage?: string;
    /** Variante desktop opzionale (es. crop 16:9) */
    heroBackgroundImageDesktop?: string;
    /** CSS object-position desktop per `heroBackgroundImage` */
    heroBackgroundImageObjectPosition?: string;
    /** CSS object-position mobile per `heroBackgroundImage` */
    heroBackgroundImageObjectPositionMobile?: string;
    /** Velo leggibilità testi su `heroBackgroundImage` */
    heroBackgroundImageReadabilityOverlay?: boolean;
    /** Più clip posizionati nello sfondo hero (desktop) — alternativa a `heroBackgroundVideo` singolo */
    heroBackgroundVideos?: HeroBackgroundVideoClip[];
    /** Stile grafico stack clip — es. `legend` per profili iconici */
    heroBackgroundVideoTheme?: HeroBackgroundVideoTheme;
    /** Video loop in `public` (mp4), dietro overlay — uso mirato per non coprire copy/avatar */
    heroBackgroundVideo?: string;
    /** Fine loop in secondi (esclude coda indesiderata, es. registrazione schermo) */
    heroBackgroundVideoLoopEnd?: number;
    /** CSS object-position del clip hero (default: center 12%) */
    heroBackgroundVideoObjectPosition?: string;
    /** Velo extra sull’overlay tabellone broadcast (angolo basso-sinistra del clip) */
    heroBackgroundVideoScoreboardVeil?: boolean;
    /** Overlay hero più leggero se il clip risulta troppo scuro */
    heroBackgroundVideoLightOverlay?: boolean;
    /** Nessun velo scuro sul video hero */
    heroBackgroundVideoNoOverlay?: boolean;
    /** Velo leggero a sinistra per leggibilità testi — video ancora luminoso */
    heroBackgroundVideoReadabilityOverlay?: boolean;
    /** Clip 16:9 — riempie lo sfondo hero in orizzontale (default: crop verticale tipo reel) */
    heroBackgroundVideoLandscape?: boolean;
    /** `contain` mostra tutto il clip senza zoom eccessivo (default: `cover`) */
    heroBackgroundVideoFit?: "cover" | "contain";
    marketStatusLabel: string;
    agency: AgencyRef;
    lastUpdated: string;
    /** Default: aggiornamento scheda; `created` per nuove schede */
    lastUpdatedKind?: "created" | "updated";
    highlightUrl: string;
    whatsapp?: string;
  };
  scoutView: {
    /** Override intro sezione scout (pitch rapido) se valorizzato */
    sectionDescription?: string;
    shortProfile: string;
    whyWatch: string;
    toVerify: string;
    idealFit: string;
  };
  market: {
    availableFrom: string;
    availability: MarketAvailability[];
    regionsEvaluated: string[];
    opportunitySought: string;
    economicsNote: string;
  };
  videos: AthleteVideos;
  stats: SeasonStats;
  technicalFit: {
    playerType: string;
    strengths: string[];
    improvements: string[];
    idealSystem: string;
    idealRole: string;
  };
  /**
   * Opzionale. Sezione narrativa dopo il fit tecnico: dove il giocatore “calza”
   * davvero (tipi di squadra / filosofia di gioco).
   */
  whyHeFits?: {
    /** Paragrafo d’apertura sotto il titolo */
    intro: string;
    /** Esempi concreti: titolo breve + testo (+ variante estetica) */
    scenarios: Array<{
      title: string;
      body: string;
      /** default = card neutra valorizzante; caution = enfasi “occhio ai limiti” */
      variant?: "default" | "caution";
    }>;
  };
  /** Foto da campo / ritratto — se assente o vuota la sezione non viene mostrata */
  gallery?: AthleteGallery;
  /** Post e storie pronti per Instagram dopo le partite */
  socialMediaKit?: AthleteSocialMediaKit;
  /** Aggiornamento rientro post-infortunio per club, staff e procuratori */
  returnToPlay?: ReturnToPlaySection;
  /** Se false, nasconde sezione contatti e link correlati in nav/hero. */
  showContactsSection?: boolean;
  /** Se false, nasconde la sezione scout (30 secondi). */
  showScoutSection?: boolean;
  /** Se false, nasconde la sezione status mercato. */
  showMarketSection?: boolean;
  /** Se false, nasconde la sezione fit tecnico. */
  showTechnicalFitSection?: boolean;
  /** Se false, nasconde la sezione statistiche e la fascia numeri in hero. */
  showStatsSection?: boolean;
  /** Shop prodotti ufficiali (link esterni) — se assente la sezione non viene mostrata. */
  shop?: AthleteShop;
  /** Narrativa biografica sotto l'hero — opzionale */
  story?: AthleteStory;
  career: CareerStep[];
  /** Stile opzionale per la sezione percorso */
  careerSection?: CareerSectionStyle;
  honors: HonorItem[];
  verifications: VerificationBadge[];
  contacts: {
    agency: AgencyRef;
    representative: RepresentativeContact;
    athleteEmail?: string;
    contactFormUrl?: string;
    whatsapp?: string;
    /** Card WhatsApp senza link: testo es. gestito su richiesta */
    whatsappPublicLabel?: string;
    social: SocialLink[];
  };
  agencyRoster: AgencyRosterCard[];
}
