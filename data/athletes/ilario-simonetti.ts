import type { AthleteProfile } from "@/lib/types/athlete";

/** Demo dati — valorizzare con numeri ufficiali, video e contatti reali. */
export const ilarioSimonetti: AthleteProfile = {
  slug: "ilario-simonetti",
  seo: {
    title: "Ilario Simonetti · Ala piccola Serie B | Player Card",
    description:
      "Ilario Simonetti (2004), ala piccola 200 cm, Serie B nazionale: profilo fisico, mano destra dominante e finiture con la sinistra, highlights e numeri. Scheda operativa per club e scouting.",
    publicSiteUrl: "https://ilariosimonetti7.katahero.com",
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
      "Ala piccola con corpo da elite fisica: spalle larghe, compattezza nei contatti e capacità di finire attraverso il fisico. Mano dominante destra, uso avanzato della sinistra in penetrazione, passaggio e galleggi verso il ferro.",
    dashboardIntro:
      "Ala piccola classe 2004, 200 cm, in contesto Serie B nazionale: profilo orientato a spacing e versatilità sulle ali, con valore nel mismatch e nel gioco vicino alla zona. Scheda per valutazione rapida: identità fisico-tecnica, numeri, clip e contatto col referente.",
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
      "Due righe operative: chi è sul campo, perché uno staff Serie B dovrebbe volerlo, dove lo massimi — il resto lo validi con film e contesto vivo.",
    shortProfile:
      "Ala 200 cm classe ’04 già utilizzabile in Serie B: finisce dentro con senso (63% da 2 sul referto in corso), usa il corpo nei mismatch sulle ali, destra dominante sinistra già spendibile su galleggio e passaggi ravvicinati. Non è high‑usage scorer: vale come economia del possesso vicino al ferro, difesa fisica leggibile e connectività leggera (~1 ast). Profilo ~15′: ~5,7 ppg, ~1,8 rpg; tripli e lunetta sono il tema di crescita.",
    idealFit:
      "Ideale se cerchi un’ala corpo‑mani da 2ª–3ª rotazione (15′–22′) in sistemi che muovono palla e hanno lunghi esterni: chiudi, taglio, second side dopo vantaggi creati altrove. Non forzare volume da creatore primario: il sistema valorizza ciò che già converte oggi.",
    whyWatch:
      "Perché tenerlo nel roster: risolve possessi con chilometri nel 1v1 fisico, chiude spazi in area e ha margine giovanile se il perimetro cresce. È la carta della specializzazione che ti dà efficienza dove il gioco si fa stretto.",
    toVerify:
      "Lunetta e tre sotto pressione; continuità se salgono i minuti; difesa quando il mismatch si fa rapido. Incrocia con il film più che col solo box score.",
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
    regionsEvaluated: ["Italia centro-sud", "Europa (tier B)", "NBA Global Academy network (contatti)"],
    opportunitySought:
      "Ruolo da ala piccola con minuti in rotazione Serie B, staff che valorizzi versatilità e fisico; eventuale step successivo verso alta B o prestiti brevi.",
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
        title: "Film room — clip 1",
        url: "https://www.youtube.com/watch?v=JYJfGWHTEho",
      },
      {
        title: "Film room — clip 2",
        url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU",
      },
    ],
    categories: [
      {
        id: "shooting",
        label: "Tiro",
        clips: [
          { title: "Catch & shoot da angolo", url: "https://www.youtube.com/watch?v=lVvjB86NlPM" },
          { title: "Tiro dopo pick alt", url: "https://www.youtube.com/watch?v=JYJfGWHTEho" },
        ],
      },
      {
        id: "defense",
        label: "Difesa",
        clips: [{ title: "Pressing full court + recovery", url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU" }],
      },
      {
        id: "transition",
        label: "Transizione",
        clips: [{ title: "Decisioni early offense", url: "https://www.youtube.com/watch?v=lVvjB86NlPM" }],
      },
      {
        id: "playmaking",
        label: "Playmaking",
        clips: [{ title: "Assist in penetrazione", url: "https://www.youtube.com/watch?v=JYJfGWHTEho" }],
      },
      {
        id: "pnr",
        label: "Pick & roll",
        clips: [{ title: "Lettura blocco alto", url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU" }],
      },
      {
        id: "iso",
        label: "1v1",
        clips: [{ title: "Split, change e finish", url: "https://www.youtube.com/watch?v=lVvjB86NlPM" }],
      },
      {
        id: "rebounding",
        label: "Rimbalzo",
        clips: [{ title: "Tag e second chance", url: "https://www.youtube.com/watch?v=JYJfGWHTEho" }],
      },
      {
        id: "athleticism",
        label: "Atletismo",
        clips: [{ title: "Accelerazioni e chiusure", url: "https://www.youtube.com/watch?v=Zvu_SEi4XdU" }],
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
      "Ilario Simonetti · ala 200 cm (2004) · Benacquista Assicurazioni Latina, Serie B LNP — rotazione da ~15′ con identità fisico‑mani: pesa nei contatti, chiede palla nell’area (63% da 2 sul referto), seconda mano già nel repertorio. Non alimenta il tiro ad alto volume: vince possessi nel traffico, mismatch e finalizzazioni ragionate.",
    strengths: [
      "Area e mezza distanza: priorità al ferro coerente col dato LNP (63% da 2) — sa dove prendersi punti senza forzare da creatore primario",
      "Sinistra nel pacchetto: galleggio, passaggi in traffic e finiture quando il contact apre il ferro; estende il repertorio sotto pressione",
      "Cornice 200 cm per chiudere linee sulle ali e reggere mismatch 3/4 — corpo che può fare la guardia senza vivere da palleggio puro",
      "Connettività quando la palla gira (~1 ast nel minutaggio attuale): margini da strutturare se il ruolo allarga compiti",
    ],
    improvements: [
      "Perimetro come proiezione: ~31% da tre su volume ancora modesto — scelta e qualità di tiro se il minutaggio chiede più spacing",
      "Lunetta al 52%: con più possessi “lenti” i liberi devono diventare certezza",
      "Continuità tra serate e rimbalzo d’attacco (~1,8 rpg oggi): più second chance coerenti col fisico",
    ],
    idealSystem:
      "Offese che muovono la palla (motion, tagli, second side) con lunghi esterni — lui massimizza catch dalla media, backdoor e finish al contatto quando difesa e aiuti sono leggibili. Evita di fargli tenere il cronometro in lunghi isolamenti: rende meglio in possessi che girano e nei mismatch creati altrove. In difesa: meno switch “automatico” sulle ali dove il recupero sul tiratore conta; aiuti prevedibili dove il suo due punti e la mano debole restano armi.",
    idealRole:
      "Ala piccola — in certe linee anche piccolo 4 situazionale — da 2ª–3ª rotazione Serie B, fascia 15′–22′ tra chiudi forti da blocco, taglio, second side e porzioni di corto roll quando la mappa glielo permette. Oggi è finisher‑connettore più che spacer puro: il salto passa da ruoli chiari (chiudi, mismatch, incarichi difensivi) e dalla crescita triplo–lunetta, senza vestirlo da playmaker d’ingresso.",
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
        alt: "Ilario Simonetti in possesso di palla con sorriso durante un possesso",
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
    whatsappPublicLabel: "Gestito su richiesta · nessun numero pubblico",
    social: [
      { platform: "Instagram", handle: "@ilario.simonetti", url: "https://instagram.com" },
      { platform: "TikTok", handle: "@ilario7", url: "https://tiktok.com" },
    ],
  },
  agencyRoster: [],
};
