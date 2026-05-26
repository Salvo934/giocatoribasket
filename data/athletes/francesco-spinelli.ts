import type { AthleteProfile } from "@/lib/types/athlete";

/** Dati da referto LNP — https://www.legapallacanestro.com/spinelli-francesco */
export const francescoSpinelli: AthleteProfile = {
  slug: "francesco-spinelli",
  seo: {
    title: "Francesco Spinelli · Play/Guardia Serie B | Player Card",
    description:
      "Francesco Spinelli (2005), play/guardia 197 cm, Serie B Girone A con Rimadesio Desio: statistiche LNP, video e scheda scouting per club.",
    ogImage: "/athletes/cardspinelli-og.jpg",
    publicSiteUrl: "https://francescospinelli9.katahero.com",
  },
  header: {
    heroImage: "/athletes/francesco-spinelli-avatar.jpg",
    heroImageFocus: "top",
    heroBackgroundVideo: "/athletes/spinelli-highlight-3.mp4",
    heroBackgroundVideoLoopEnd: 4.5,
    heroBackgroundVideoObjectPosition: "center 38%",
    heroBackgroundVideoNoOverlay: true,
    name: "Francesco Spinelli",
    number: "9",
    sport: "Basket",
    role: "Playmaker / Guardia",
    birthYear: 2005,
    heightCm: 197,
    nationality: "Italia",
    currentClub: "Rimadesio Desio",
    currentClubLogo: "/athletes/aurora-desio-logo.png",
    category: "Serie B",
    league: "LNP · Girone A",
    marketStatusLabel: "In roster · Serie B 25/26",
    identityNote:
      "Play/guardia 197 cm, classe 2005: palleggio e decisioni in transizione, tiro da tre in crescita (27% LNP attuale su volume medio-alto). Percorso consolidato in Serie B con esperienze a Pozzuoli, Salerno, Sant’Antimo e Nardò.",
    dashboardIntro:
      "Guardia classe 2005, 197 cm, in Serie B Girone A con Rimadesio Desio: circa 16′ a partita, 6 punti di media sui dati LNP. Scheda con numeri ufficiali, ultimi match e contatti.",
    agency: {
      name: "In arrivo",
      representative: "Referente scouting",
    },
    lastUpdated: "2026-05-23",
    highlightUrl: "/athletes/spinelli-highlight-1.mp4",
  },
  scoutView: {
    sectionDescription:
      "Profilo da referto LNP: cosa porta oggi in Serie B, punti di forza misurabili e cosa validare live prima di un progetto.",
    shortProfile:
      "Play/guardia 197 cm, classe 2005, Rimadesio Desio in Serie B Girone A: circa 16′ e 6 punti a partita (35 gare LNP), con volume da tre (2,7 tentativi) e percentuale al 27%. Porta assist (0,6 APG) e gestisce minuti da rotazione; percentuali da due al 49% e liberi al 74% sui dati attuali.",
    whyWatch:
      "Interessante se cerchi un guardia lungo con esperienza B già strutturata, buona disciplina ai liberi e capacità di spacing dal perimetro — da incrociare con video e partite recenti.",
    toVerify:
      "Efficienza complessiva da campo (volume tiri vs qualità scelta); continuità nelle partite chiave; impatto difensivo sul perimetro avversario.",
    idealFit:
      "Squadre che giocano pick-and-roll con spacing, seconda unità che deve portare energia e qualche tiro aperto; meno adatto se chiedi solo playmaking da 30′ o isolamenti continui.",
  },
  market: {
    availableFrom: "Da definire con il referente",
    availability: [
      { id: "tryout", label: "Tryout / workout", active: true },
      { id: "loan", label: "Prestito", active: true },
      { id: "transfer", label: "Trasferimento", active: true },
      { id: "showcase", label: "Showcase / eventi", active: true },
      { id: "abroad", label: "Estero", active: false },
    ],
    regionsEvaluated: ["Italia nord", "Serie B / A2"],
    opportunitySought:
      "Ruolo da guardia/play in rotazione Serie B, con possibilità di crescita verso responsabilità offensive più ampie.",
    economicsNote: "Solo su richiesta al referente.",
  },
  videos: {
    main: {
      title: "Highlights — Francesco Spinelli",
      url: "/athletes/spinelli-highlight-1.mp4",
    },
    filmRoomSide: [
      {
        title: "Highlights — clip 2",
        url: "/athletes/spinelli-highlight-2.mp4",
      },
      {
        title: "Highlights — clip 3",
        url: "/athletes/spinelli-highlight-3.mp4",
      },
    ],
    categories: [
      {
        id: "shooting",
        label: "Tiro",
        clips: [{ title: "Highlights — tiro", url: "/athletes/spinelli-highlight-1.mp4" }],
      },
      {
        id: "playmaking",
        label: "Playmaking",
        clips: [{ title: "Highlights — regia", url: "/athletes/spinelli-highlight-2.mp4" }],
      },
      {
        id: "transition",
        label: "Transizione",
        clips: [{ title: "Highlights — transizione", url: "/athletes/spinelli-highlight-3.mp4" }],
      },
      {
        id: "defense",
        label: "Difesa",
        clips: [{ title: "Highlights — difesa", url: "/athletes/spinelli-highlight-1.mp4" }],
      },
      {
        id: "pnr",
        label: "Pick & roll",
        clips: [{ title: "Highlights — pick & roll", url: "/athletes/spinelli-highlight-2.mp4" }],
      },
      {
        id: "iso",
        label: "1v1",
        clips: [{ title: "Highlights — 1v1", url: "/athletes/spinelli-highlight-3.mp4" }],
      },
      {
        id: "rebounding",
        label: "Rimbalzo",
        clips: [{ title: "Highlights — rimbalzo", url: "/athletes/spinelli-highlight-1.mp4" }],
      },
      {
        id: "athleticism",
        label: "Atletismo",
        clips: [{ title: "Highlights — atletismo", url: "/athletes/spinelli-highlight-2.mp4" }],
      },
    ],
  },
  stats: {
    label: "Serie B Girone A 2025-26 · Rimadesio Desio · fonte LNP",
    games: 35,
    minutesPerGame: 16.5,
    pointsPerGame: 6.0,
    reboundsPerGame: 1.9,
    assistsPerGame: 0.6,
    stealsPerGame: 0.1,
    turnoversPerGame: 1.0,
    fgPct: 56.7,
    twoPct: 49.0,
    threePct: 27.0,
    ftPct: 74.0,
    twoAttPerGame: 2.6,
    threeAttPerGame: 2.7,
    lastGames: [
      { date: "2026-04-26", opponent: "Siaz Basket Piazza Armerina", minutes: 15, points: 5, rebounds: 1, assists: 1 },
      { date: "2026-04-18", opponent: "Fiorenzuola Bees", minutes: 26, points: 10, rebounds: 2, assists: 2 },
      { date: "2026-04-15", opponent: "SAE Scientifica-Soevis Legnano", minutes: 23, points: 5, rebounds: 4, assists: 1 },
      { date: "2026-04-11", opponent: "S4 Energia Vicenza", minutes: 24, points: 11, rebounds: 1, assists: 1 },
      { date: "2026-04-05", opponent: "Moncada Energy Agrigento", minutes: 23, points: 13, rebounds: 1, assists: 1 },
    ],
  },
  technicalFit: {
    playerType:
      "Francesco Spinelli: play/guardia 197 cm (2005), Rimadesio Desio in Serie B Girone A — rotazione (~16′), spacing dal perimetro e gestione pick-and-roll. Percentuali LNP attuali: 49% da due, 27% da tre, 74% ai liberi.",
    strengths: [
      "Volume da tre (circa 2,7 tentativi) con margine di crescita sulla percentuale",
      "Liberi al 74% sui dati LNP — utile negli possessi finali",
      "Esperienza B strutturata (Pozzuoli, Salerno, Sant’Antimo) prima del progetto Desio",
      "Guardia lunga (197 cm) per match-up difensivi sul perimetro",
    ],
    improvements: [
      "Efficienza complessiva da campo con volume tiri elevato",
      "Assist e creazione se aumentano i minuti e la responsabilità",
      "Continuità nelle partite ad alta intensità",
    ],
    idealSystem:
      "Pick-and-roll con spacing, seconda unità che deve muovere la palla e trovare tiri aperti; transizione controllata con decisioni rapide.",
    idealRole:
      "Play/guardia in rotazione Serie B, 15′–22′ con compiti di spacing, pick-and-roll e difesa sul portatore.",
  },
  whyHeFits: {
    intro:
      "Profilo da guardia lunga con numeri LNP verificabili: utile in staff che cercano spacing e disciplina ai liberi, da validare sul tiro da tre e sull’impatto difensivo.",
    scenarios: [
      {
        title: "Squadra che spazia e usa pick-and-roll",
        body: "Trova logica in sistemi con due guardie, spacing sul lato debole e conclusioni dopo blocco. Il volume da tre può aiutare ad aprire il campo anche se la percentuale va consolidata.",
      },
      {
        title: "Rotazione profonda in Serie B",
        body: "Adatto come seconda guardia/play che regge 16′ con picchi offensivi (13–11 punti nelle ultime uscite LNP) senza dover comandare l’intero possesso.",
      },
      {
        title: "Progetto su guardia italiana classe 2005",
        body: "Percorso già maturo in B: utile se il club punta su giovani con esperienza di campionato, non solo potenziale.",
      },
      {
        title: "Da valutare con attenzione",
        body: "Se chiedi playmaking da 30′ o solo isolamenti senza movimento, il profilo attuale (0,6 APG, volume tiro) va verificato live.",
        variant: "caution",
      },
    ],
  },
  gallery: {
    description: "Scatti da gara con Rimadesio Desio — palleggio, tiro e momenti in campo.",
    items: [
      {
        src: "/athletes/spinelli-gallery-1.jpg",
        alt: "Francesco Spinelli in palleggio con la maglia Rimadesio numero 9",
        caption: "Rimadesio Desio · palleggio in transizione",
      },
      {
        src: "/athletes/spinelli-gallery-2.jpg",
        alt: "Francesco Spinelli in fase di tiro con entrambe le mani sopra la testa",
        caption: "Gara · meccanica di tiro",
      },
      {
        src: "/athletes/spinelli-gallery-3.jpg",
        alt: "Francesco Spinelli in piedi in campo con la palla, maglia Rimadesio numero 9",
        caption: "Rimadesio Desio · concentrazione pre-azione",
      },
    ],
  },
  career: [
    {
      season: "2025-26",
      club: "Rimadesio Desio",
      category: "Serie B · Girone A",
      notes: "Medie LNP attuali: 6,0 PPG · 16,5 MPG",
    },
    {
      season: "2024-25",
      club: "Malvin PSA Sant'Antimo",
      category: "Serie B · Girone B",
      notes: "5,2 PPG in 26 gare (LNP)",
    },
    {
      season: "2024-25",
      club: "HDL Nardò Basket",
      category: "Serie A2",
      notes: "Esperienza breve in A2",
    },
    {
      season: "2023-24",
      club: "Lars Virtus Arechi Salerno",
      category: "Serie B · Girone A",
    },
    {
      season: "2020-23",
      club: "Pozzuoli",
      category: "Serie B · Girone D",
    },
  ],
  honors: [
    {
      title: "Campione regionale U17 Eccellenza",
      detail: "Titolo regionale con la formazione Under 17 Eccellenza.",
      year: "2022",
    },
    {
      title: "Due finali nazionali giovanili",
      detail: "Raggiunte due finali scudetto nel settore giovanile.",
    },
    {
      title: "Miglior Giovane — Giardini Margherita",
      detail: "Premio individuale al torneo Giardini Margherita.",
      year: "2025",
    },
    {
      title: "Nazionali giovanili U18 e U20",
      detail: "Convocazioni ed esperienze con le rappresentative nazionali Under 18 e Under 20.",
    },
  ],
  verifications: [
    { id: "data", label: "Dati LNP verificati", ok: true },
    { id: "video", label: "Video verificato", ok: true },
    { id: "contact", label: "Contatto verificato", ok: false },
    { id: "fresh", label: "Profilo aggiornato", ok: true },
    { id: "club", label: "Club confermato", ok: true },
  ],
  contacts: {
    agency: { name: "In arrivo" },
    representative: {
      name: "Referente scouting",
      role: "Procuratore",
      phonePublicLabel: "In arrivo",
      emailPublicLabel: "In arrivo",
    },
    whatsappPublicLabel: "In arrivo",
    social: [
      {
        platform: "Instagram",
        handle: "@francescospinelli___",
        url: "https://www.instagram.com/francescospinelli___/",
      },
    ],
  },
  agencyRoster: [],
};
