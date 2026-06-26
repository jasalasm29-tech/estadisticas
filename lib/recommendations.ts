import { supabase, isSupabaseConfigured } from "./supabase";
import { mockRecommendations, mockRoiData, mockWinLossData } from "./mockData";
import { Recommendation, RoiDataPoint } from "./types";
import { getUpcomingMatches, isFootballConfigured } from "./football";
import { generateRecommendations } from "./engine";

export type DataSource = "supabase" | "engine" | "mock";

// Fila tal como se almacena en la tabla `recommendations` de Supabase.
interface RecommendationRow {
  id: string;
  match: string;
  type: string;
  recommendation: string;
  probability: number;
  odds: number;
  expected_value: number;
  risk: string;
  status: string;
}

function mapRow(row: RecommendationRow): Recommendation {
  return {
    id: row.id,
    match: row.match,
    type: row.type as Recommendation["type"],
    recommendation: row.recommendation,
    probability: Number(row.probability),
    odds: Number(row.odds),
    expectedValue: Number(row.expected_value),
    risk: row.risk as Recommendation["risk"],
    status: row.status as Recommendation["status"],
  };
}

/**
 * Devuelve las recomendaciones. Usa Supabase si está configurado y tiene
 * filas; de lo contrario recurre a los datos mock para no romper la demo.
 */
export async function getRecommendations(): Promise<{
  data: Recommendation[];
  source: DataSource;
}> {
  // 1) Supabase: recomendaciones persistidas (curadas o sincronizadas).
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return { data: (data as RecommendationRow[]).map(mapRow), source: "supabase" };
    }
    if (error) console.error("Supabase recommendations error:", error.message);
  }

  // 2) Motor sobre partidos reales de Football-Data.
  if (isFootballConfigured) {
    const matches = await getUpcomingMatches(20);
    const recs = generateRecommendations(matches);
    if (recs.length > 0) {
      return { data: recs.slice(0, 12), source: "engine" };
    }
  }

  // 3) Fallback a datos de ejemplo.
  return { data: mockRecommendations, source: "mock" };
}

/**
 * Calcula las métricas del dashboard a partir de las recomendaciones.
 * Si no hay datos reales, devuelve las series mock.
 */
export function computeStats(recs: Recommendation[], source: DataSource) {
  if (source === "mock") {
    return {
      total: 124,
      successRate: 58.5,
      roi: 12.4,
      roiData: mockRoiData as RoiDataPoint[],
      winLoss: mockWinLossData,
    };
  }

  const decided = recs.filter((r) => r.status !== "pending");

  if (decided.length > 0) {
    // Hay histórico real: métricas a partir de resultados.
    const won = decided.filter((r) => r.status === "won").length;
    const lost = decided.filter((r) => r.status === "lost").length;
    const successRate = (won / decided.length) * 100;
    const roi =
      decided.reduce(
        (acc, r) => acc + (r.status === "won" ? r.expectedValue : -10),
        0
      ) / decided.length;

    return {
      total: recs.length,
      successRate: Number(successRate.toFixed(1)),
      roi: Number(roi.toFixed(1)),
      roiData: mockRoiData as RoiDataPoint[], // serie temporal: requiere histórico
      winLoss: [
        { name: "Ganadas", value: won },
        { name: "Perdidas", value: lost },
      ],
    };
  }

  // Solo recomendaciones pendientes (p. ej. motor sobre partidos próximos):
  // mostramos métricas PROYECTADAS a partir de probabilidad y EV.
  const avgProb =
    recs.reduce((a, r) => a + r.probability, 0) / (recs.length || 1);
  const avgEv = recs.reduce((a, r) => a + r.expectedValue, 0) / (recs.length || 1);
  const projWon = Math.round((avgProb / 100) * recs.length);

  return {
    total: recs.length,
    successRate: Number(avgProb.toFixed(1)),
    roi: Number(avgEv.toFixed(1)),
    roiData: mockRoiData as RoiDataPoint[],
    winLoss: [
      { name: "Prob. acierto", value: projWon },
      { name: "Prob. fallo", value: Math.max(recs.length - projWon, 0) },
    ],
  };
}
