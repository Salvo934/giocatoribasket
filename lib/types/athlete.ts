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
  phone?: string;
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
}

export interface AthleteVideos {
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

export interface AthleteProfile {
  slug: string;
  seo: {
    title: string;
    description: string;
    /** Dominio ufficiale del sito giocatore (es. https://nome.talent.katahero.com) */
    publicSiteUrl?: string;
  };
  header: {
    heroImage: string;
    name: string;
    number?: string;
    sport: string;
    role: string;
    birthYear: number;
    heightCm: number;
    nationality: string;
    currentClub: string;
    category: string;
    league?: string;
    /** Paragrafo sopra le chip: se assente usa testo generico Player Card */
    dashboardIntro?: string;
    /** Sintesi identità tecnica (hero), es. mano dominante e ruolo */
    identityNote?: string;
    /** Ritaglio foto hero: utile per ritratti verticali */
    heroImageFocus?: "top" | "center" | "bottom";
    marketStatusLabel: string;
    agency: AgencyRef;
    lastUpdated: string;
    highlightUrl: string;
    whatsapp?: string;
  };
  scoutView: {
    /** Override intro SectionShell "One-Minute Scout View" se valorizzato */
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
  career: CareerStep[];
  honors: HonorItem[];
  verifications: VerificationBadge[];
  contacts: {
    agency: AgencyRef;
    representative: RepresentativeContact;
    athleteEmail?: string;
    contactFormUrl?: string;
    whatsapp?: string;
    social: SocialLink[];
  };
  agencyRoster: AgencyRosterCard[];
}
