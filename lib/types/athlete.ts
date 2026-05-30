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

export interface AthleteVideos {
  /** Copertina default per clip mp4 in sala video */
  poster?: string;
  main: AthleteVideo & { provider?: VideoProvider };
  /** Max 2 consigliati: miniature accanto al player principale in Film room */
  filmRoomSide?: AthleteVideo[];
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

export interface SeasonStats {
  label: string;
  games: number;
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
}

export interface CareerStep {
  season: string;
  club: string;
  category: string;
  notes?: string;
  /** Logo squadra (`/athletes/...` in `public`) */
  clubLogo?: string;
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

export type SocialKitFormat = "post" | "story";

/** Asset scaricabile per Instagram (post 1:1 o storia 9:16) */
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

export interface AthleteSocialMediaKit {
  /** Default: "Contenuti pronti per i social" */
  title?: string;
  description?: string;
  /** Es. "Aggiornato dopo ogni gara" */
  statusLabel?: string;
  items: SocialKitAsset[];
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

export interface AthleteProfile {
  slug: string;
  seo: {
    title: string;
    description: string;
    /** Dominio ufficiale del sito giocatore (es. https://nome.talent.katahero.com) */
    publicSiteUrl?: string;
    /** Anteprima link (OG / Twitter); default: `header.heroImage` */
    ogImage?: string;
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
    marketStatusLabel: string;
    agency: AgencyRef;
    lastUpdated: string;
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
  career: CareerStep[];
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
