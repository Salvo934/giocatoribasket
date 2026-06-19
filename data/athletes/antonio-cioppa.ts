import type { AthleteProfile } from "@/lib/types/athlete";

/** Dati da PlayBasket Campania e sito ufficiale Scandone — https://www.playbasket.it/campania/ · https://felicescandone.it/player/antonio-cioppa/ */
export const antonioCioppa: AthleteProfile = {
  slug: "antonio-cioppa",
  published: true,
  seo: {
    title: "Antonio Cioppa · Playmaker Serie B Interregionale | Player Card",
    description:
      "Antonio Cioppa (1999), playmaker 184 cm, Felice Scandone Avellino in Serie B Interregionale: cabina di regia, visione di gioco e percentuali al tiro. Statistiche, carriera e scheda scouting.",
    ogImage: "/athletes/cardcioppa7-og.jpg",
    ogImageVersion: "20260619-2",
    publicSiteUrl: "https://antoniocioppa7.katahero.com",
  },
  legal: {
    dataController: {
      name: "Antonio Cioppa",
      email: "privacy@katahero.com",
    },
    policyUpdated: "2026-06-04",
  },
  header: {
    heroImage: "/athletes/antonio-cioppa-avatar.png",
    heroImageObjectPosition: "50% 12%",
    name: "Antonio Cioppa",
    number: "7",
    sport: "Basket",
    role: "Playmaker / Guardia",
    birthYear: 1999,
    heightCm: 184,
    nationality: "Italia",
    currentClub: "Felice Scandone Avellino",
    currentClubLogo: "/athletes/scandone-avellino-logo.png",
    category: "Serie B Interregionale",
    league: "FIP Campania",
    marketStatusLabel: "In roster · playoff finali 25/26",
    identityNote:
      "Maddalonese classe 1999, 184 cm: play-guardia con visione di gioco, dinamismo e percentuali al tiro. Percorso costruito tra Maddaloni, Corato, Juvecaserta, Virtus Ragusa e Virtus Matera prima della cabina di regia biancoverde.",
    dashboardIntro:
      "Playmaker 184 cm, 27 anni, Felice Scandone Avellino: 6,3 punti di media su 36 gare in campionato 2025-26 (226 punti totali, fonte PlayBasket Campania), season high a 20 vs Sennori. Finalista playoff contro la Viola Reggio Calabria.",
    agency: {
      name: "Felice Scandone Avellino",
      representative: "Staff societario",
    },
    lastUpdated: "2026-06-04",
    highlightUrl: "https://www.youtube.com/watch?v=Hrm3G92pkaw",
  },
  scoutView: {
    sectionDescription:
      "Profilo da playmaker in Serie B Interregionale: cosa porta oggi in cabina di regia, perché può interessare a club che cercano lucidità e percentuali al tiro.",
    shortProfile:
      "Playmaker 184 cm, classe 1999, ingaggiato dalla Scandone per la stagione 2025/26 come direttore d'orchestra del progetto biancoverde. Medie PlayBasket: 6,3 PPG su 36 gare con picco a 20 punti; esperienza precedente da 12,2 PPG a Matera (24/25) e titolo in B Interregionale con Virtus Ragusa.",
    whyWatch:
      "Interessante se cerchi un play con disciplina tattica, buone percentuali al tiro e leadership in palleggio — da incrociare con video Scandone e partite playoff.",
    toVerify:
      "Continuità realizzativa dopo il rientro da un inizio stagione rallentato da un piccolo infortunio; impatto difensivo sul cambio e gestione delle responsabilità in finale playoff.",
    idealFit:
      "Squadre che giocano pick-and-roll, spacing e ritmo controllato; utile in progetti ambiziosi di risalita categoria con playmaker affidabile.",
  },
  market: {
    availableFrom: "Da definire con il club / referente",
    availability: [
      { id: "tryout", label: "Tryout / workout", active: true },
      { id: "loan", label: "Prestito", active: true },
      { id: "transfer", label: "Trasferimento", active: true },
      { id: "showcase", label: "Showcase / eventi", active: true },
      { id: "abroad", label: "Estero", active: false },
    ],
    regionsEvaluated: ["Italia sud", "Campania · B Interregionale / Serie B"],
    opportunitySought:
      "Ruolo da playmaker titolare in B Interregionale o step verso Serie B nazionale in roster con ambizioni di risalita.",
    economicsNote: "Solo su richiesta al referente.",
  },
  videos: {
    poster: "/athletes/antonio-cioppa-avatar.png",
    main: {
      title: "Highlights stagione 2024/25",
      url: "https://www.youtube.com/watch?v=Hrm3G92pkaw",
      provider: "youtube",
    },
    filmRoomSide: [
      {
        title: "Highlights stagione 2022/23",
        url: "https://www.youtube.com/watch?v=P6M-gnNgytU",
      },
      {
        title: "Highlights stagione 2021/22",
        url: "https://www.youtube.com/watch?v=mHS_tbQx90Q",
      },
      {
        title: "Highlights stagione 2019/20",
        url: "https://www.youtube.com/watch?v=OM4vdYOK7u8",
      },
    ],
    categories: [
      {
        id: "playmaking",
        label: "Playmaking",
        clips: [{ title: "Highlights 2024/25 — regia e visione", url: "https://www.youtube.com/watch?v=Hrm3G92pkaw" }],
      },
      {
        id: "shooting",
        label: "Tiro",
        clips: [{ title: "Highlights 2022/23 — tiro e percentuali", url: "https://www.youtube.com/watch?v=P6M-gnNgytU" }],
      },
      {
        id: "pnr",
        label: "Pick & roll",
        clips: [{ title: "Highlights 2021/22 — pick & roll", url: "https://www.youtube.com/watch?v=mHS_tbQx90Q" }],
      },
      {
        id: "transition",
        label: "Transizione",
        clips: [{ title: "Highlights 2019/20 — transizione", url: "https://www.youtube.com/watch?v=OM4vdYOK7u8" }],
      },
      {
        id: "defense",
        label: "Difesa",
        clips: [{ title: "Highlights 2024/25", url: "https://www.youtube.com/watch?v=Hrm3G92pkaw" }],
      },
      {
        id: "iso",
        label: "Uno contro uno",
        clips: [{ title: "Highlights 2022/23", url: "https://www.youtube.com/watch?v=P6M-gnNgytU" }],
      },
      {
        id: "rebounding",
        label: "Rimbalzo",
        clips: [{ title: "Highlights 2021/22", url: "https://www.youtube.com/watch?v=mHS_tbQx90Q" }],
      },
      {
        id: "athleticism",
        label: "Atletismo",
        clips: [{ title: "Highlights 2019/20", url: "https://www.youtube.com/watch?v=OM4vdYOK7u8" }],
      },
    ],
  },
  stats: {
    label:
      "Serie B Interregionale 2025-26 · Felice Scandone Avellino · punti e presenze PlayBasket Campania",
    games: 36,
    pointsPerGame: 6.3,
    minutesPerGame: 0,
    reboundsPerGame: 0,
    assistsPerGame: 0,
    stealsPerGame: 0,
    turnoversPerGame: 0,
    fgPct: 0,
    twoPct: 0,
    threePct: 0,
    ftPct: 0,
    twoAttPerGame: 0,
    threeAttPerGame: 0,
    lastGames: [
      {
        date: "2026-06-01",
        opponent: "Pallacanestro Viola RC 76-84 (playoff G3)",
        minutes: 0,
        points: 5,
        rebounds: 0,
        assists: 0,
      },
      {
        date: "2026-05-28",
        opponent: "@ Pallacanestro Viola RC 66-69 (playoff G2)",
        minutes: 0,
        points: 9,
        rebounds: 0,
        assists: 0,
      },
      {
        date: "2026-05-25",
        opponent: "Pallacanestro Viola RC 69-71 (playoff G1)",
        minutes: 0,
        points: 9,
        rebounds: 0,
        assists: 0,
      },
      {
        date: "2026-05-04",
        opponent: "Virtus Matera 77-53",
        minutes: 0,
        points: 14,
        rebounds: 0,
        assists: 0,
      },
      {
        date: "2026-03-15",
        opponent: "@ Pallacanestro Sennori 77-91",
        minutes: 0,
        points: 20,
        rebounds: 0,
        assists: 0,
      },
    ],
  },
  technicalFit: {
    playerType:
      "Antonio Cioppa: playmaker 184 cm (1999), Felice Scandone Avellino in Serie B Interregionale — visione di gioco, percentuali al tiro e leadership in cabina di regia. A Matera (24/25) ha chiuso a 12,2 PPG in oltre 30 presenze.",
    strengths: [
      "Visione di gioco e gestione del ritmo offensivo in pick-and-roll",
      "Percentuali al tiro sopra la media di categoria (storicamente ~55% da tre con Ragusa)",
      "Esperienza in club ambiziosi: Ragusa campione, Matera protagonista, Scandone in finale playoff",
      "Disciplina tecnica e mentale — marchio distintivo citato da club e stampa",
    ],
    improvements: [
      "Continuità realizzativa dopo rientro da infortunio di inizio stagione",
      "Impatto difensivo costante nelle partite ad alta intensità",
      "Gestione del volume di tiro sotto pressione in playoff",
    ],
    idealSystem:
      "Attacchi strutturati con pick-and-roll, seconda palla e spacing: dirige il gioco, legge i closeout e punisce con tiro medio e da tre. Utile in sistemi che valorizzano la lucidità più del solo isolamento.",
    idealRole:
      "Playmaker titolare in B Interregionale, 24′–30′ con compiti di regia, decisioni in clutch e comunicazione sul parquet.",
  },
  whyHeFits: {
    intro:
      "Antonio ha un profilo chiaro da playmaker maturo: percentuali, esperienza in risalite di categoria e ruolo di leader tattico. Alcune squadre lo valorizzano subito; altre chiedono ruoli diversi dal suo punto di forza.",
    scenarios: [
      {
        title: "Club che cerca cabina di regia affidabile",
        body: "Porta visione, gestione del pick-and-roll e percentuali al tiro — profilo ideale per progetti di promozione in B Interregionale o Serie B nazionale.",
      },
      {
        title: "Progetto Scandone / risalita categoria",
        body: "Ha scelto Avellino per ambizioni di vincere e salire: finalista playoff 2025-26, ruolo delicato e centrale nel roster biancoverde.",
      },
      {
        title: "Squadra con tradizione e pressione",
        body: "Esperienza a Ragusa, Matera e storica piazza come Scandone: abituato a contesti esigenti e obiettivi alti.",
      },
      {
        title: "Dove il fit è più difficile",
        body: "Se chiedi solo scoring guard senza regia o ruolo off-ball puro, il valore scende: il plus è la direzione d'orchestra e le percentuali.",
        variant: "caution",
      },
    ],
  },
  gallery: {
    description: "Ritratto ufficiale e immagini da Felice Scandone Avellino — playmaker biancoverde numero 7.",
    items: [
      {
        src: "/athletes/antonio-cioppa-avatar.png",
        alt: "Antonio Cioppa in maglia verde Scandone Avellino numero 7 con pallone da basket",
        caption: "Felice Scandone Avellino · playmaker",
      },
    ],
  },
  socialMediaKit: {
    statusLabel: "Stagione 2025-26 · Felice Scandone Avellino",
    description:
      "Post, storie e reel pronti per Instagram — scarica la grafica o condividi direttamente dal telefono.",
    /** Codice personale a 4 cifre — modifica qui se serve cambiarlo */
    accessCode: "0707",
    requestWhatsApp: "393274597773",
    months: [
      {
        month: "2026-06",
        label: "Giugno 2026",
        items: [
          {
            id: "cioppa-campioni-post",
            title: "Campioni — vittoria del campionato",
            format: "post",
            src: "/athletes/social/antonio-cioppa-campioni-post.png",
            caption:
              "CAMPIONI! 🏆 Una stagione da protagonisti con la Felice Scandone Avellino.\n\n#7 Antonio Cioppa · playmaker\n📊 Serie B Interregionale 25/26 · Felice Scandone Avellino\n6,3 PPG · 36 gare · finale playoff\n\n1948 · la storia continua 💚",
            matchDate: "2026-06-19",
            downloadName: "antonio-cioppa-campioni-scandone.png",
          },
        ],
      },
    ],
  },
  career: [
    {
      season: "2025-26",
      club: "Felice Scandone Avellino",
      category: "Serie B Interregionale",
      coach: "Carone",
      notes: "6,3 PPG in 36 gare · finale playoff vs Viola RC",
    },
    {
      season: "2024-25",
      club: "Virtus Matera",
      category: "Serie B Interregionale",
      notes: "12,2 PPG in oltre 30 presenze",
    },
    {
      season: "2023-24",
      club: "Virtus Ragusa",
      category: "Serie B Interregionale",
      notes: "383 punti in 39 gare · campionato vinto",
    },
    {
      season: "2021-22",
      club: "Juvecaserta Academy",
      category: "Serie C Gold",
      notes: "Coppa Campania 2022 · 369 punti in campionato",
    },
    {
      season: "2019-20",
      club: "Basket Corato",
      category: "Serie B",
      notes: "Esperienza in B nazionale",
    },
    {
      season: "2016-17",
      club: "Pallacanestro San Michele Maddaloni",
      category: "Serie B",
      notes: "Debutto senior in B",
    },
    {
      season: "2011-16",
      club: "Jirafa Basket Caivano / Maddaloni",
      category: "Giovanili",
      notes: "Formazione giovanile fino a Under 18 Eccellenza",
    },
  ],
  honors: [
    {
      title: "Finale playoff Serie B Interregionale",
      detail: "Felice Scandone Avellino vs Pallacanestro Viola RC — stagione 2025-26.",
      year: "2026",
    },
    {
      title: "Season high 20 punti",
      detail: "Prestazione vs Pallacanestro Sennori in campionato 2025-26 (fonte PlayBasket).",
      year: "2026",
    },
    {
      title: "Coppa Campania",
      detail: "Titolo con Juvecaserta Academy in Serie C Gold.",
      year: "2022",
    },
    {
      title: "Campione Serie B Interregionale",
      detail: "Virtus Ragusa — stagione 2023-24.",
      year: "2024",
    },
  ],
  verifications: [
    { id: "data", label: "Dati PlayBasket verificati", ok: true },
    { id: "video", label: "Video verificato", ok: true },
    { id: "contact", label: "Contatto verificato", ok: true },
    { id: "fresh", label: "Profilo aggiornato", ok: true },
    { id: "club", label: "Club confermato", ok: true },
  ],
  contacts: {
    agency: {
      name: "Felice Scandone Avellino",
    },
    representative: {
      name: "Referente societario",
      role: "Felice Scandone Avellino · S.S. Felice Scandone 1948",
      emailPublicLabel: "Su richiesta (club / scouting)",
      phonePublicLabel: "Su richiesta",
    },
    social: [
      {
        platform: "Instagram",
        handle: "@antoniocioppa7",
        url: "https://www.instagram.com/antoniocioppa7/",
      },
    ],
  },
  agencyRoster: [],
};
