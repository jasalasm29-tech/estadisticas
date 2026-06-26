import { Recommendation, RoiDataPoint } from "./types";

// Datos mock usados mientras no haya conexión a Supabase / API real.

/** 6 recomendaciones de ejemplo pre-cargadas */
export const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    match: "Brasil vs Argentina",
    type: "Combinada",
    recommendation: "Brasil gana + Over 2.5",
    probability: 72,
    odds: 3.2,
    expectedValue: 18.5,
    risk: "medium",
    status: "won",
  },
  {
    id: "2",
    match: "Francia vs España",
    type: "Doble Oportunidad",
    recommendation: "Francia gana o empate",
    probability: 85,
    odds: 1.45,
    expectedValue: 8.2,
    risk: "low",
    status: "won",
  },
  {
    id: "3",
    match: "Alemania vs Holanda",
    type: "Goles",
    recommendation: "Over 2.5",
    probability: 68,
    odds: 2.8,
    expectedValue: 15.3,
    risk: "medium",
    status: "pending",
  },
  {
    id: "4",
    match: "Portugal vs Italia",
    type: "Combinada",
    recommendation: "Portugal gana + ambos anotan",
    probability: 55,
    odds: 4.1,
    expectedValue: 21.8,
    risk: "high",
    status: "pending",
  },
  {
    id: "5",
    match: "Uruguay vs Perú",
    type: "Resultado",
    recommendation: "Uruguay gana",
    probability: 78,
    odds: 1.8,
    expectedValue: 10.2,
    risk: "low",
    status: "lost",
  },
  {
    id: "6",
    match: "Inglaterra vs Bélgica",
    type: "Goles",
    recommendation: "Ambos equipos anotan",
    probability: 70,
    odds: 1.95,
    expectedValue: 12.6,
    risk: "medium",
    status: "pending",
  },
];

/** ROI semanal (6 semanas de datos mock) */
export const mockRoiData: RoiDataPoint[] = [
  { week: "Sem 1", roi: 2.1 },
  { week: "Sem 2", roi: 5.4 },
  { week: "Sem 3", roi: 3.8 },
  { week: "Sem 4", roi: 8.2 },
  { week: "Sem 5", roi: 10.6 },
  { week: "Sem 6", roi: 12.4 },
];

/** Proporción de apuestas ganadas vs perdidas */
export const mockWinLossData = [
  { name: "Ganadas", value: 58 },
  { name: "Perdidas", value: 42 },
];
