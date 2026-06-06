import type { AthleteProfile } from "@/lib/types/athlete";

/** Dati da referto LNP — https://www.legapallacanestro.com/zampogna-alfonso */
export const alfonsoZampogna: AthleteProfile = {
  slug: "alfonso-zampogna",
  published: true,
  seo: {
    title: "Alfonso Zampogna · Play Serie B | Player Card",
    description:
      "Alfonso Zampogna (2000), play 186 cm, Moncada Energy Agrigento in Serie B Girone A: 11 PPG e 4,1 APG sui dati LNP. Statistiche, carriera e scheda scouting.",
    publicSiteUrl: "https://alfonsozampogna16.katahero.com",
    ogImage: "/athletes/cardzampogna-og.jpg",
  },
  legal: {
    dataController: {
      name: "Alfonso Zampogna",
      email: "privacy@katahero.com",
    },
    policyUpdated: "2026-06-04",
  },
  header: {
    heroImage: "/athletes/alfonso-zampogna-avatar.jpg",
    heroImageFocus: "top",
    heroImageObjectPosition: "50% 12%",
    heroBackgroundVideos: [
      {
        src: "/athletes/zampogna-clip-1.mp4",
        anchor: "left",
        fit: "cover",
        objectPosition: "center 35%",
      },
      {
        src: "/athletes/zampogna-clip-3.mp4",
        anchor: "center",
        fit: "cover",
        objectPosition: "center 30%",
      },
      {
        src: "/athletes/zampogna-clip-5.mp4",
        anchor: "right",
        fit: "cover",
        objectPosition: "center 35%",
      },
    ],
    heroBackgroundVideoReadabilityOverlay: true,
    name: "Alfonso Zampogna",
    number: "16",
    sport: "Basket",
    role: "Playmaker / Play",
    birthYear: 2000,
    heightCm: 186,
    nationality: "Italia",
    currentClub: "Moncada Energy Agrigento",
    currentClubLogo: "/athletes/agrigento-basket-logo.png",
    category: "Serie B",
    league: "LNP · Girone A",
    marketStatusLabel: "In roster · Serie B 25/26",
    identityNote:
      "Reggino classe 2000, 186 cm: play con accelerazione, tiro esterno e regia in crescita. Cresciuto nelle giovanili di Reggio Emilia; percorso consolidato in Serie B tra Alessandria, Vicenza, Fabriano, Roseto, Caserta e Cremona prima del progetto siciliano.",
    dashboardIntro:
      "Play classe 2000, 186 cm, Moncada Energy Agrigento in Serie B Girone A: circa 28′ e 11 punti di media su 33 gare LNP, con 4,1 assist a partita. Scheda con numeri ufficiali, ultimi match e contatti.",
    agency: {
      name: "Alfonso Zampogna",
    },
    lastUpdated: "2026-06-04",
    highlightUrl: "https://www.youtube.com/watch?v=s1duWe-UEaY",
  },
  scoutView: {
    sectionDescription:
      "Profilo da referto LNP: cosa porta oggi in Serie B, punti di forza misurabili e cosa validare live prima di un progetto.",
    shortProfile:
      "Play 186 cm, classe 2000, Moncada Energy Agrigento in Serie B Girone A: circa 28′ e 11 punti a partita (33 gare LNP), con 4,1 assist e 3,3 rimbalzi. Volume da tre (6,2 tentativi) al 31%, liberi all’86%. Regista maturo con esperienza B già strutturata: esordio a 18 anni con Reggio Emilia, poi Alessandria, Vicenza, Roseto e A2 a Cremona.",
    whyWatch:
      "Interessante se cerchi un play italiano con minuti da titolare, visione di gioco e capacità di gestire il ritmo — da incrociare con video e partite recenti (picco a 31 punti vs Piacenza, febbraio 2026).",
    toVerify:
      "Efficienza complessiva da campo con volume da tre elevato; difesa sul portatore avversario; continuità nelle partite di play-in e playoff.",
    idealFit:
      "Squadre che giocano pick-and-roll con spacing, ritmo controllato e seconda unità che deve portare regia; meno adatto se chiedi solo scoring da isolamento senza movimento.",
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
    regionsEvaluated: ["Italia centro-nord", "Italia sud", "Serie B / A2"],
    opportunitySought:
      "Ruolo da play in rotazione titolare Serie B, con possibilità di crescita verso responsabilità da direttore d’orchestra.",
    economicsNote: "Solo su richiesta al referente.",
  },
  videos: {
    main: {
      title: "Highlights — Alfonso Zampogna",
      url: "https://www.youtube.com/watch?v=s1duWe-UEaY",
      provider: "youtube",
    },
    filmRoomSide: [
      {
        title: "Highlights — clip 2",
        url: "https://www.youtube.com/watch?v=_X89QPgNBsQ",
      },
    ],
    poster: "/athletes/alfonso-zampogna-avatar.jpg",
    categories: [
      {
        id: "playmaking",
        label: "Playmaking",
        clips: [
          { title: "Clip 1 — regia e passaggi", url: "/athletes/zampogna-clip-1.mp4" },
          { title: "Clip 2 — gestione possesso", url: "/athletes/zampogna-clip-2.mp4" },
        ],
      },
      {
        id: "shooting",
        label: "Tiro",
        clips: [{ title: "Clip 3 — tiro e conclusioni", url: "/athletes/zampogna-clip-3.mp4" }],
      },
      {
        id: "transition",
        label: "Transizione",
        clips: [{ title: "Clip 4 — attacco veloce", url: "/athletes/zampogna-clip-4.mp4" }],
      },
      {
        id: "pnr",
        label: "Pick & roll",
        clips: [{ title: "Clip 5 — lettura sul blocco", url: "/athletes/zampogna-clip-5.mp4" }],
      },
    ],
    fullGame: {
      title: "Film completo — disponibile su richiesta (link privato)",
      url: "mailto:privacy@katahero.com?subject=Richiesta%20film%20completo%20Alfonso%20Zampogna",
    },
  },
  stats: {
    label: "Serie B Girone A 2025-26 · Moncada Energy Agrigento · fonte LNP",
    games: 33,
    minutesPerGame: 28.5,
    pointsPerGame: 11.0,
    reboundsPerGame: 3.3,
    assistsPerGame: 4.1,
    stealsPerGame: 1.1,
    turnoversPerGame: 1.5,
    fgPct: 32.9,
    twoPct: 38.0,
    threePct: 31.0,
    ftPct: 86.0,
    twoAttPerGame: 2.7,
    threeAttPerGame: 6.2,
    lastGames: [
      { date: "2026-05-03", opponent: "Fabo Herons Montecatini", minutes: 30, points: 21, rebounds: 4, assists: 11, steals: 0, turnovers: 3 },
      { date: "2026-04-30", opponent: "UCC Assigeco Piacenza", minutes: 21, points: 2, rebounds: 1, assists: 8, steals: 0, turnovers: 2 },
      { date: "2026-04-26", opponent: "Paffoni Fulgor Omegna", minutes: 33, points: 18, rebounds: 1, assists: 5, steals: 0, turnovers: 1 },
      { date: "2026-04-19", opponent: "Foppiani Fulgor Fidenza", minutes: 29, points: 15, rebounds: 6, assists: 9, steals: 0, turnovers: 4 },
      { date: "2026-04-15", opponent: "Infodrive Capo d'Orlando", minutes: 43, points: 17, rebounds: 7, assists: 4, steals: 0, turnovers: 2 },
    ],
  },
  technicalFit: {
    playerType:
      "Alfonso Zampogna: play 186 cm (2000), Moncada Energy Agrigento in Serie B Girone A — titolare (~28′), regia e volume da tre. Percentuali LNP attuali: 38% da due, 31% da tre, 86% ai liberi; 4,1 assist a partita.",
    strengths: [
      "Regia e assist: circa 4 APG con minuti da play titolare",
      "Liberi all’86% sui dati LNP — disciplina negli ultimi possessi",
      "Esperienza B consolidata (esordio 18/19 con Reggio Emilia, Roseto, Vicenza, Caserta)",
      "Accelerazione e taglia fisica utile per il ruolo di play in transizione",
    ],
    improvements: [
      "Efficienza complessiva da campo con volume da tre alto (6+ tentativi)",
      "Turnover da monitorare in partite ad alta intensità",
      "Difesa sul portatore quando il match-up si alza di livello",
    ],
    idealSystem:
      "Pick-and-roll con spacing, transizione controllata e movimento senza palla; sistema che valorizzi la visione e la gestione del ritmo più degli isolamenti puri.",
    idealRole:
      "Play titolare in Serie B, 25′–30′ con compiti di regia, pick-and-roll, spacing dal perimetro e leadership in transizione.",
  },
  whyHeFits: {
    intro:
      "Profilo da play maturo con numeri LNP verificabili: utile in staff che cercano regia e minuti importanti, da validare su efficienza tiro e difesa.",
    scenarios: [
      {
        title: "Squadra che ha bisogno di regia",
        body: "Porta 4+ assist a partita e gestisce il possesso con esperienza B: adatto se manca un direttore d’orchestra che regge 28′ senza perdere ritmo.",
      },
      {
        title: "Progetto con pick-and-roll e spacing",
        body: "Trova logica in sistemi con due guardie, movimento sul lato debole e conclusioni dopo blocco. Il volume da tre apre il campo anche se la percentuale va consolidata.",
      },
      {
        title: "Club che punta su italiani esperti di B",
        body: "Percorso lungo in Serie B (Reggio, Alessandria, Vicenza, Roseto, Caserta, Cremona): non è un debuttante, è un play che conosce il campionato.",
      },
      {
        title: "Da valutare con attenzione",
        body: "Se chiedi solo scoring da isolamento o efficienza da tre sopra la media di categoria senza supporto di sistema, il profilo va verificato live.",
        variant: "caution",
      },
    ],
  },
  gallery: {
    description: "Scatti da gara — JuVi Cremona, Agrigento e Desio.",
    items: [
      {
        src: "/athletes/zampogna-gallery-1.jpg",
        alt: "Alfonso Zampogna in palleggio con la maglia JuVi Cremona",
        caption: "JuVi Cremona · palleggio e direzione in transizione",
      },
      {
        src: "/athletes/zampogna-gallery-2.jpg",
        alt: "Alfonso Zampogna protegge la palla in azione con JuVi Cremona",
        caption: "JuVi Cremona · protezione palla sotto pressione",
      },
      {
        src: "/athletes/zampogna-gallery-3.jpg",
        alt: "Alfonso Zampogna al tiro in sospensione con la maglia JuVi Cremona",
        caption: "JuVi Cremona · tiro in sospensione",
      },
      {
        src: "/athletes/zampogna-gallery-4.jpg",
        alt: "Alfonso Zampogna conclude al canestro con Moncada Energy Agrigento",
        caption: "Moncada Energy Agrigento · conclusione in area",
      },
      {
        src: "/athletes/zampogna-gallery-5.jpg",
        alt: "Alfonso Zampogna al tiro da distanza con Rimadesio Desio",
        caption: "Rimadesio Desio · tiro da distanza",
      },
    ],
  },
  socialMediaKit: {
    statusLabel: "Stagione 2025-26 · Moncada Energy Agrigento",
    items: [],
  },
  career: [
    {
      season: "2025-26",
      club: "Moncada Energy Agrigento",
      category: "Serie B · Girone A",
      notes: "Titolare — medie LNP: 11,0 PPG · 4,1 APG · 28,5 MPG",
    },
    {
      season: "2024-25",
      club: "Ferraroni JuVi Cremona",
      category: "Serie A2",
      notes: "34 gare, 3,5 PPG (LNP).",
    },
    {
      season: "2023-24",
      club: "Paperdi Caserta",
      category: "Serie B · Girone A",
      notes: "10 gare, 7,3 PPG (LNP).",
    },
    {
      season: "2021-23",
      club: "Liofilchem Roseto",
      category: "Serie B · Girone D",
      notes: "Playoff e Supercoppa B; crescita come regista titolare.",
    },
    {
      season: "2020-21",
      club: "Tramarossa Vicenza",
      category: "Serie B · Girone C",
      notes: "Secondo posto nel girone C; 8 PPG in campionato.",
    },
    {
      season: "2019-20",
      club: "Fortitudo Alessandria / Ristopro Fabriano",
      category: "Serie B",
      notes: "9,7 PPG ad Alessandria; prima esperienza fuori Reggio.",
    },
    {
      season: "2018-19",
      club: "BMR Basket 2000 Reggio Emilia",
      category: "Serie B · Girone B",
      notes: "Esordio in B a 18 anni — circa 5,4 PPG in 29 gare.",
    },
    {
      season: "2014-18",
      club: "Pallacanestro Reggiana",
      category: "Giovanili",
      notes: "Settore giovanile reggiano — U18 nazionale.",
    },
  ],
  honors: [
    {
      title: "Season high — 31 punti",
      detail: "Record personale stagionale vs UCC Assigeco Piacenza (91-71), 1 febbraio 2026.",
      year: "2026",
    },
    {
      title: "Play-in Serie B 25/26",
      detail: "Moncada Energy Agrigento — 11,5 PPG e 9,5 APG nelle due gare di play-in (LNP).",
      year: "2026",
    },
    {
      title: "Secondo posto — Girone C Serie B",
      detail: "Tramarossa Vicenza, stagione 2020-21.",
      year: "2021",
    },
    {
      title: "Playoff Serie B — Liofilchem Roseto",
      detail: "Partecipazione ai tabelloni playoff 21/22 e 22/23.",
      year: "2023",
    },
    {
      title: "Supercoppa LNP Serie B",
      detail: "Impegno in Supercoppa con Roseto e Vicenza.",
      year: "2022",
    },
  ],
  verifications: [
    { id: "data", label: "Dati LNP verificati", ok: true },
    { id: "video", label: "Video verificato", ok: true },
    { id: "contact", label: "Contatto verificato", ok: true },
    { id: "fresh", label: "Profilo aggiornato", ok: true },
    { id: "club", label: "Club confermato", ok: true },
  ],
  contacts: {
    agency: {
      name: "",
    },
    representative: {
      name: "Alfonso Zampogna",
      role: "Giocatore · contatto su richiesta",
      emailPublicLabel: "Su richiesta",
      phonePublicLabel: "Su richiesta",
    },
    whatsappPublicLabel: "Solo su richiesta — nessun numero pubblico",
    social: [
      {
        platform: "Instagram",
        handle: "@zampo_06",
        url: "https://www.instagram.com/zampo_06/",
      },
    ],
  },
  agencyRoster: [],
};
