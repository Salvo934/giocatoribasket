import type { StatsUi } from "./profile-ui";

/** Etichette pannello statistiche quando `header.sport === "Calcio"`. */
export const FOOTBALL_STATS_UI: Partial<StatsUi> = {
  points: "Gol",
  assists: "Assist",
  rebounds: "Tiri",
  steals: "Tackle",
  turnovers: "Falli",
  twoAttempts: "Tiri",
  threeAttempts: "Passaggi chiave",
  astToRatio: "Assist / gol",
  effectiveFg: "Precisione passaggi",
  shootingEfficiency: "Efficienza e duelli",
  shootingHint: "Percentuali stagione — passaggi, tiri in porta e contrasti.",
  fg: "Passaggi riusciti",
  twoPt: "Tiri in porta",
  threePt: "Duel vinti",
  ft: "Lunghe riuscite",
  volumeSelection: "Volume offensivo",
  volumeHint: "Tiri e passaggi chiave medi a partita.",
  volumeShare: (pct) => `${pct}% del volume (tiri vs passaggi chiave).`,
  totalAttempts: "Azioni offensive / partita",
  pts: "Gol",
  reb: "Pass",
  stl: "Tkl",
  to: "Falli",
  pointsMobile: "gol",
};

export function statsUiForSport(ui: StatsUi, sport: string): StatsUi {
  if (sport !== "Calcio") return ui;
  return { ...ui, ...FOOTBALL_STATS_UI };
}
