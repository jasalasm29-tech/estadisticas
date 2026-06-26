import { FootballMatch } from "./football";
import { BetType, Recommendation, RiskLevel } from "./types";

// Motor de recomendaciones: convierte partidos reales en sugerencias de apuesta.
//
// NOTA: sin datos de cuotas/forma de un proveedor de odds, este motor usa un
// modelo heurístico determinista (basado en el id del partido) para generar
// probabilidad, cuota y EV plausibles y reproducibles. La arquitectura permite
// sustituir `derive()` por un modelo estadístico real sin tocar el resto.

const BET_TYPES: BetType[] = ["Combinada", "Doble Oportunidad", "Goles", "Resultado"];

/** Genera un número pseudoaleatorio determinista en [0,1) a partir de una semilla. */
function seeded(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function riskFromProbability(prob: number): RiskLevel {
  if (prob >= 75) return "low";
  if (prob >= 60) return "medium";
  return "high";
}

/**
 * Deriva una recomendación a partir de un partido.
 * El Expected Value se calcula como: prob * cuota - 1 (en %).
 */
function derive(match: FootballMatch): Recommendation {
  const r1 = seeded(match.id);
  const r2 = seeded(match.id + 1);

  const probability = Math.round(50 + r1 * 40); // 50-90 %
  const odds = Number((1.3 + r2 * 3).toFixed(2)); // 1.30 - 4.30
  const p = probability / 100;
  const expectedValue = Number(((p * odds - 1) * 100).toFixed(1));
  const type = BET_TYPES[match.id % BET_TYPES.length];

  const recommendationText =
    type === "Doble Oportunidad"
      ? `${match.homeTeam} gana o empate`
      : type === "Goles"
      ? "Over 2.5"
      : type === "Combinada"
      ? `${match.homeTeam} gana + ambos anotan`
      : `${match.homeTeam} gana`;

  return {
    id: String(match.id),
    match: `${match.homeTeam} vs ${match.awayTeam}`,
    type,
    recommendation: recommendationText,
    probability,
    odds,
    expectedValue,
    risk: riskFromProbability(probability),
    status: "pending",
  };
}

/**
 * Genera recomendaciones a partir de una lista de partidos, devolviendo solo
 * las de Expected Value positivo (apuestas de valor), ordenadas por EV.
 */
export function generateRecommendations(matches: FootballMatch[]): Recommendation[] {
  return matches
    .map(derive)
    .filter((r) => r.expectedValue > 0)
    .sort((a, b) => b.expectedValue - a.expectedValue);
}
