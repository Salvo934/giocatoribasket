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
      "Ilario Simonetti: ala 200 cm (2004), Serie B LNP — campionato in corso su ~15′ e ~5,7 ppg con efficienza forte da due. In 60 secondi: cosa porta subito, dove guardare il film e che tipo di roster lo massimizza.",
    shortProfile:
      "Ala del 2004, 200 cm, in Serie B con la Benacquista Assicurazioni Latina (Girone B): oggi è un profilo da rotazione da ~15′ con numeri LNP che raccontano più efficienza in area che volume da fuori — 5,7 punti, 1,8 rimbalzi e 1 assist di media, con 63% da due su un campionario ancora contenuto da tre (31%, ~1,7 tentativi a partita) e 52% ai liberi. Coerente con quanto emerge dal vivo: telaio e contatto, mano destra dominante e sinistra già credibile su finiture e passaggi in traffic; non è un high-usage scorer, ma può sostenere possessi corti e chiudere spazi con il corpo.",
    idealFit:
      "Sistemi spacing e movimento in Serie B (o step verso alta B) dove il ruolo è chiaro: ala piccola di 2ª–3ª rotazione, minuti in 15′–22′ con compiti su chiudi, taglio e second side, senza chiedergli da subito il volume di un marcatore primario. Ideale con 4/5 che aprono il pitturato e guardie che creano vantaggi: così scala il valore del due punti e delle letture, mentre si costruisce piano sul perimetro (tre e lunetta) se il minutaggio cresce.",
    whyWatch:
      "Perché a 21 anni il suo rendimento dal vivo (e il 63% da due sul referto) meritano un occhio veloce: può finire in meta e caricare penetrazioni senza forzare tiragol; quando trova ritmo mostra picchi utili in serate LNP anche con minuti ancora a intermittenza. La seconda mano è il tema esplorativo più interessante per chi cerca ali corpo‑mani più che sole atlete.",
    toVerify:
      "Continuità oltre la fascia di minuti attuale: liberi al 52% e tre al 31% con volume ancora basso — come reggono sotto pressione se sale il ruolo? Gestione errore nelle serate a zero punti rispetto a quelle da 6–7 punti in 17′–23′. Rimbalzo offensivo e falli quando cambia su piccoli rapidi; decisioni vs aiuti visti gli assist nello slot odierno. Da incrociare con film difensivo (chiudi, recoveries) più che solo box score.",
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
          { title: "Catch & shoot da angolo", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" },
          { title: "Tiro dopo pick alt", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" },
        ],
      },
      {
        id: "defense",
        label: "Difesa",
        clips: [{ title: "Pressing full court + recovery", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
      },
      {
        id: "transition",
        label: "Transizione",
        clips: [{ title: "Decisioni early offense", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
      },
      {
        id: "playmaking",
        label: "Playmaking",
        clips: [{ title: "Assist in penetrazione", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
      },
      {
        id: "pnr",
        label: "Pick & roll",
        clips: [{ title: "Lettura blocco alto", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
      },
      {
        id: "iso",
        label: "1v1",
        clips: [{ title: "Split, change e finish", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
      },
      {
        id: "rebounding",
        label: "Rimbalzo",
        clips: [{ title: "Tag e second chance", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
      },
      {
        id: "athleticism",
        label: "Atletismo",
        clips: [{ title: "Accelerazioni e chiusure", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" }],
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
      "Ala 200 cm (2004) in Serie B LNP: contributo da rotazione (~15′, referto in corso) orientato a efficienza da due e connettività leggera (≈1 apg) più che a volume scoring; identità fisico‑mani (destra dominante, sinistra utile) coerente con il mismatch da ala.",
    strengths: [
      "Finire e percentuale da due in linea con il ruolo (LNP ~63% da 2): priorità al ferro e alla mezzafonte corta",
      "Sinistra come leva su galleggi, passaggi ravvicinati e finiture quando il corpo crea slivaggio",
      "Telaio 200 cm per tenere linee di passaggio e lavorare da ala “corpo” senza forzare da guardia pura",
      "Segnali di lettura quando la palla gira (assist reali nel minutaggio attuale) — margine per evolvere da connettore a ruoli più larghi",
    ],
    improvements: [
      "Scalare qualità e volume dal perimetro (31% da tre su ~1,7 T3/g) e stabilità lunetta (52% TL) se il minutaggio cresce",
      "Continuità di impact: alternanza tra serate negative in pochi minuti e outputs positivi con 17′–23′ — ritmo ed errori",
      "Rimbalzo d’attacco e second chance: 1,8 rpg nella fascia attuale — chiedere più tag e box-out offensivo sul fisico",
    ],
    idealSystem:
      "Offese che aprono il pitturato (pick/pop 5, spacing laterale) e muovono la palla su short roll e ricicli: massimizza catch dalla media, backdoor e finalizzazioni senza isolamenti lunghi. Difese che switchano poco sulle ali o che concedono aiuti leggibili — dove il due punti e la mano debole diventano leve.",
    idealRole:
      "Ala piccola 2ª–3ª rotazione in B (target 15′–22′) con profilo 3&D in costruzione: oggi è più finisher‑connettore che spacer puro; il passo successivo è definire il ruolo chiave (chiudi, taglio, mani in zona) mentre tiro esterno e liberi consolidano la proiezione verso combo forward.",
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
    },
    social: [
      { platform: "Instagram", handle: "@ilario.simonetti", url: "https://instagram.com" },
      { platform: "TikTok", handle: "@ilario7", url: "https://tiktok.com" },
    ],
  },
  agencyRoster: [],
};
