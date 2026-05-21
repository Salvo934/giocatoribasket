import type { AthleteProfile } from "@/lib/types/athlete";

/** Demo dati — valorizzare con numeri ufficiali, video e contatti reali. */
export const ilarioSimonetti: AthleteProfile = {
  slug: "ilario-simonetti",
  seo: {
    title: "Ilario Simonetti · Ala piccola Serie B | Player Card",
    description:
      "Ilario Simonetti (2004), ala piccola 200 cm, Serie B nazionale: buon fisico, mano destra e sinistra in crescita, video e statistiche. Scheda per club e scouting.",
    publicSiteUrl: "https://ilariosimonetti7.katahero.com",
    ogImage: "/athletes/cardila7.png",
  },
  header: {
    heroImage: "/athletes/ilario-simonetti-avatar.png",
    heroImageFocus: "top",
    heroBackgroundVideo: "/athletes/sfondoheroila.mp4",
    name: "Ilario Simonetti",
    number: "7",
    sport: "Basket",
    role: "Ala piccola / SF",
    birthYear: 2004,
    heightCm: 200,
    nationality: "Italia",
    currentClub: "Benacquista Assicurazioni Latina",
    currentClubLogo: "/athletes/latinalogo.png",
    category: "Serie B",
    league: "LNP · campionato nazionale",
    marketStatusLabel: "Disponibile · progetti 26/27",
    identityNote:
      "Ala piccola con fisico importante: spalle larghe, solidità nei contatti e capacità di concludere anche con il contatto. Mano dominante destra; sinistra già utile in penetrazione, passaggi e verso il canestro.",
    dashboardIntro:
      "Ala piccola classe 2004, 200 cm, in Serie B: gioco spaziato e ruolo sulle ali, con valore nei confronti fisici e vicino alla zona. Scheda per decidere in fretta: punti di forza, numeri, video e contatti.",
    agency: {
      name: "Brightside Sports",
      representative: "Brightside Sports SRL · Capo d’Orlando (ME)",
      website: "https://www.brightsidesports.com/",
    },
    lastUpdated: "2026-05-14",
    highlightUrl: "https://www.youtube.com/watch?v=lVvjB86NlPM",
  },
  scoutView: {
    sectionDescription:
      "In sintesi: cos’è in campo, perché può interessare a un club di Serie B e in che tipo di squadra rende di più; da incrociare con video e partite vere.",
    shortProfile:
      "Ala 200 cm, classe 2004, già impiegabile in Serie B: segna sotto canestro con buone percentuali (63% da due sui dati LNP attuali), usa il corpo sugli avversari alti, mano destra dominante e sinistra già utile su palleggio e passaggi. Non è un giocatore che tira tantissimo e gestisce tutta l’attacco: porta punti dall’area, difesa fisica e circa un assist a partita nel ruolo attuale. Indicativamente 15′ a partita, circa 5,7 punti e 1,8 rimbalzi; da costruire tiro da tre e tiro libero.",
    idealFit:
      "Va bene in squadre dove la palla gira e ci sono lunghi che aprono il campo: tagli, chiusure sui tiratori dopo un aiuto, gioco sul lato opposto dopo una penetrazione. Meglio non chiedergli di essere il playmaker principale: il valore è quello che sa già fare bene.",
    whyWatch:
      "Ha senso se vuoi un’ala fisica che vince duelli sotto canestro, copre bene in area e sulla quale puoi ancora lavorare il tiro da fuori. Il punto forte è l’efficienza vicino al ferro, non il tiro a volume.",
    toVerify:
      "Tiro da tre e liberi sotto pressione; continuità se aumentano i minuti; difesa quando il confronto si sposta veloce sul perimetro. Controlla sempre le immagini e le partite, non solo il tabellino.",
  },
  market: {
    availableFrom: "Stagione 2026-27 (valutabile anticipo su prestito) — da concordare",
    availability: [
      { id: "tryout", label: "Tryout / workout", active: true },
      { id: "loan", label: "Prestito", active: true },
      { id: "transfer", label: "Trasferimento", active: true },
      { id: "showcase", label: "Showcase / eventi", active: true },
      { id: "abroad", label: "Estero", active: true },
    ],
    regionsEvaluated: ["Italia centro-sud", "Europa (fascia B)", "Academy e contatti internazionali (NBA Global Academy)"],
    opportunitySought:
      "Ruolo da ala piccola con minuti in rotazione in Serie B, staff che sappia usare fisico e ruolo sul campo; possibile passo futuro verso categorie superiori o prestiti.",
    economicsNote: "Dettaglio economico / ingaggio: solo su richiesta diretta al referente.",
  },
  videos: {
    main: {
      title: "Highlights — Ilario Simonetti",
      url: "https://www.youtube.com/watch?v=lVvjB86NlPM",
      provider: "youtube",
    },
    filmRoomSide: [
      {
        title: "Analisi video — clip 1",
        url: "https://www.youtube.com/watch?v=JYJfGWHTEho",
      },
      {
        title: "Analisi video — clip 2",
        url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU",
      },
    ],
    categories: [
      {
        id: "shooting",
        label: "Tiro",
        clips: [
          { title: "Tiro al ricevimento da angolo", url: "https://www.youtube.com/watch?v=lVvjB86NlPM" },
          { title: "Tiro dopo blocco alto", url: "https://www.youtube.com/watch?v=JYJfGWHTEho" },
        ],
      },
      {
        id: "defense",
        label: "Difesa",
        clips: [{ title: "Pressing su tutto il campo e recuperi palla", url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU" }],
      },
      {
        id: "transition",
        label: "Transizione",
        clips: [{ title: "Decisioni in attacco veloce", url: "https://www.youtube.com/watch?v=lVvjB86NlPM" }],
      },
      {
        id: "playmaking",
        label: "Passaggi",
        clips: [{ title: "Assist dopo penetrazione", url: "https://www.youtube.com/watch?v=JYJfGWHTEho" }],
      },
      {
        id: "pnr",
        label: "Gioco sul blocco",
        clips: [{ title: "Lettura sul blocco alto", url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU" }],
      },
      {
        id: "iso",
        label: "Uno contro uno",
        clips: [{ title: "Cross-over e conclusione", url: "https://www.youtube.com/watch?v=lVvjB86NlPM" }],
      },
      {
        id: "rebounding",
        label: "Rimbalzo",
        clips: [{ title: "Taglio verso canestro e seconda opportunità", url: "https://www.youtube.com/watch?v=JYJfGWHTEho" }],
      },
      {
        id: "athleticism",
        label: "Atletismo",
        clips: [{ title: "Accelerazioni e rapidità in campo", url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU" }],
      },
    ],
    fullGame: {
      title: "Film completo — disponibile su richiesta (link privato)",
      url: "mailto:salvo.bonaita9808@gmail.com?subject=Richiesta%20film%20completo%20Ilario%20Simonetti",
    },
  },
  stats: {
    label: "Serie B Girone B 2025-26 · Benacquista Assicurazioni Latina · fonte LNP",
    games: 21,
    minutesPerGame: 15.3,
    pointsPerGame: 5.7,
    reboundsPerGame: 1.8,
    assistsPerGame: 1.0,
    stealsPerGame: 0.2,
    turnoversPerGame: 0.7,
    fgPct: 49.3,
    twoPct: 63.0,
    threePct: 31.0,
    ftPct: 52.0,
    twoAttPerGame: 1.7,
    threeAttPerGame: 1.7,
    lastGames: [
      { date: "2026-02-22", opponent: "Power Basket Nocera", minutes: 5, points: 6, rebounds: 0, assists: 0, steals: 1, turnovers: 0 },
      { date: "2026-02-14", opponent: "Ristopro Fabriano", minutes: 17, points: 6, rebounds: 3, assists: 2, steals: 0, turnovers: 3 },
      { date: "2026-02-07", opponent: "@ Consultinvest Loreto Pesaro", minutes: 23, points: 6, rebounds: 4, assists: 4, steals: 0, turnovers: 1 },
      { date: "2026-02-01", opponent: "General Contractor Jesi", minutes: 8, points: 0, rebounds: 0, assists: 0, steals: 0, turnovers: 0 },
      { date: "2025-12-21", opponent: "Solbat Golfo Piombino", minutes: 16, points: 7, rebounds: 2, assists: 0, steals: 0, turnovers: 1 },
    ],
  },
  technicalFit: {
    playerType:
      "Ilario Simonetti: ala 200 cm (2004), Benacquista Assicurazioni Latina in Serie B LNP — minuti da rotazione (circa 15′), gioco fisico e buone mani. Cerca il canestro in area (63% da due sui dati ufficiali), la sinistra è già nel suo repertorio. Non vive di tiri lunghi: fa la differenza vicino al ferro, nei contatti e nelle letture semplici.",
    strengths: [
      "Area e tiro dalla media distanza: va verso il canestro con criterio — il 63% da due LNP lo conferma",
      "Sinistra utile: palleggio, passaggio in mezzo alla difesa e conclusioni quando crea contatto",
      "Statura da 200 cm per marcare sulle ali e reggere piccoli difensori più bassi — senza dover fare da playmaker puro",
      "Passaggi quando la palla si muove (circa 1 assist nel minutaggio attuale): può crescere se il ruolo si allarga",
    ],
    improvements: [
      "Tiro da tre: circa 31% con ancora pochi tentativi — migliorare scelta e sicurezza se chiedi più campo aperto",
      "Liberi al 52%: con possessi più lunghi diventano decisivi",
      "Continuità serata dopo serata e rimbalzi in attacco (circa 1,8 a partita): può chiedere di più al fisico",
    ],
    idealSystem:
      "Attacchi in movimento (tagli, palla che gira) con lunghi che tirano: così riceve palla a metà zona, taglia o finisce al contatto quando le difese si spostano. Meglio evitare lunghi isolamenti per lui: rende di più quando il possesso fluisce. In difesa, meno cambi automatici sulle ali dove deve poi correre sul tiratore; aiuti chiari dove sfrutta canestro da media e mano non dominante.",
    idealRole:
      "Ala piccola — a volte anche numero 4 per necessità — tra seconda e terza rotazione in Serie B, circa 15′–22′ tra chiusure sui blocchi, tagli, gioco sul secondo lato e qualche corto dopo il blocco se lo schema lo consente. Oggi è più finitore e passatore che tiratore da fuori puro: il salto passa da compiti chiari in difesa e dal migliorare tiro lungo e liberi, senza chiedergli di comandare l’attacco da palleggio.",
  },
  whyHeFits: {
    intro:
      "Ilario non è un “tuttoterreno” generico: ha un profilo chiaro (fisico, area, letture semplici). Alcune squadre lo fanno esplodere perché il sistema copre le sue pecche; altre lo mettono in difficoltà perché chiedono il contrario del suo punto di forza. Qui sotto, i contesti in cui il fit è più naturale.",
    scenarios: [
      {
        title: "Squadra che spazia il campo e muove la palla",
        body: "Con lunghi che tirano e attacchi in movimento trova spazi per tagli, ricezioni a metà zona e canestri dopo contatto quando la difesa si sposta. Non deve tenere la palla ferma a lungo: il valore viene quando il possesso gira e lui può sfruttare equilibri difensivi scomposti.",
      },
      {
        title: "Organico che cerca fisicità sulle ali",
        body: "Utile se manca un corpo che regga i contrasti con esterni avversari, chiuda sui blocchi e porti secondi possessi con presenza in area. È la risposta “da contatto” più che la scelta per aprire il campo solo dal tiro.",
      },
      {
        title: "Staff che sa assegnargli compiti chiari",
        body: "Rende meglio con ruoli ben definiti: chiudere, tagliare, finire intorno alla zona, qualche incarico sul secondo lato. Meno efficace se deve fare da direttore d’orchestra col palleggio o se l’attacco dipende solo da lui dal tiro da tre.",
      },
      {
        title: "Dove invece il fit è più difficile",
        body: "Sistemi costruiti su isolamenti lunghi, pochissimo movimento e tanta responsabilità sul tiro esterno da subito chiedono cose che oggi sono ancora in costruzione. Non è un “no” definitivo: è un avviso da staff su cosa validare prima di firmare il ruolo.",
        variant: "caution",
      },
    ],
  },
  gallery: {
    description: "Scatti da campo, allenamento e contesto squadra.",
    items: [
      {
        src: "/athletes/1BE5A032-3CBF-4350-8790-FFC4AC5BBEA1_1_105_c.jpeg",
        alt: "Ilario Simonetti schiera cinque con i compagni in maglia Latina",
        caption: "Latina · momento di squadra in campo",
      },
      {
        src: "/athletes/9DF9FF8A-A3E6-41DB-B948-AC1477E76AD3_1_105_c.jpeg",
        alt: "Ilario Simonetti in possesso di palla, sorriso in un’azione di gioco",
        caption: "Azione · conclusione e lettura difensiva",
      },
      {
        src: "/athletes/29F1A8EB-84B6-4AF2-9B1D-F12B6ACC0A9E.jpeg",
        alt: "Ilario Simonetti a canestro in schiacciata con la maglia Viola",
        caption: "Viola Basket · schiacciata",
      },
      {
        src: "/athletes/43EF2D72-720C-4CF5-9BA8-7F7E71D6A637_4_5005_c.jpeg",
        alt: "Ilario Simonetti in elevazione per il tiro, maglia numero 7",
        caption: "Gara · tiro in sospensione",
      },
      {
        src: "/athletes/59A529F1-A791-4D4B-BD53-A493C1D7C31F.jpeg",
        alt: "Ilario Simonetti ritratto in maglia da gioco con palla",
        caption: "Ritratto · focus e preparazione",
      },
      {
        src: "/athletes/B89BEAB8-56C7-4BC8-BE0F-BECBC5852334.jpeg",
        alt: "Ilario Simonetti esulta con i compagni dopo un canestro",
        caption: "Emozioni in campo · celebrazione",
      },
      {
        src: "/athletes/0CB8B452-7C7E-4003-9D57-BAEE435F0AF6_1_105_c.jpeg",
        alt: "Ilario Simonetti in maglia Viola con la palla tra le mani",
        caption: "Viola Basket · ritratto in palestra",
      },
    ],
  },
  career: [
    {
      season: "2025-26",
      club: "Benacquista Assicurazioni Latina",
      category: "Serie B · Girone B · LNP",
      notes: "LNP — medie da referto ufficiale; squadra attuale.",
      clubLogo: "/athletes/latinalogo.png",
    },
    {
      season: "2024-25",
      club: "Viola Basket",
      category: "Serie B · Interregionale",
      clubLogo: "/athletes/violalogo.png",
    },
    {
      season: "2023-24",
      club: "Pallacanestro Pozzuoli",
      category: "Serie B · Nazionale",
      clubLogo: "/athletes/pozzuolilogo.png",
    },
    {
      season: "2018-23",
      club: "Basket Vis Ferrara",
      category: "Giovanili",
      clubLogo: "/athletes/ferraralogo.png",
    },
    {
      season: "2014-18",
      club: "Eutimo Basket",
      category: "Giovanili",
      notes: "Avvio del percorso nel vivaio.",
      clubLogo: "/athletes/eutimologo.png",
    },
  ],
  honors: [
    {
      title: "Convocazione raduno Under 16 — Nazionale italiana",
      detail: "Raduno e attività tecnica con la nazionale giovanile FIP.",
      year: "2020",
    },
    {
      title: "Torneo delle Regioni — annata 2004",
      detail: "Convocato con la rappresentativa calabrese.",
      year: "2019",
    },
    {
      title: "Torneo LBL — Bassano",
      detail: "Impegno nel circuito Legabasket Junior con Bassano.",
      year: "2018",
    },
  ],
  verifications: [
    { id: "data", label: "Dati verificati", ok: true },
    { id: "video", label: "Video verificato", ok: true },
    { id: "contact", label: "Contatto verificato", ok: true },
    { id: "fresh", label: "Profilo aggiornato", ok: true },
    { id: "club", label: "Club confermato", ok: true },
  ],
  contacts: {
    agency: {
      name: "Brightside Sports SRL",
      website: "https://www.brightsidesports.com/contact/",
    },
    representative: {
      name: "Brightside Sports",
      role: "Management & scouting · Via Veneto 97, Capo d’Orlando (ME)",
      email: "info@brightsidesports.com",
      phonePublicLabel: "Su richiesta (club / scouting)",
    },
    whatsappPublicLabel: "Solo su richiesta — nessun numero pubblico",
    social: [
      { platform: "Instagram", handle: "@ilario.simonetti", url: "https://instagram.com" },
      { platform: "TikTok", handle: "@ilario7", url: "https://tiktok.com" },
    ],
  },
  agencyRoster: [],
};
