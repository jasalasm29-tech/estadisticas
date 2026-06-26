import { supabase, isSupabaseConfigured } from "./supabase";
import { mockRecommendations, mockRoiData, mockWinLossData } from "./mockData";
import { Recommendation, RoiDataPoint } from "./types";

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
  source: "supabase" | "mock";
}> {
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

  return { data: mockRecommendations, source: "mock" };
}

/**
 * Calcula las métricas del dashboard a partir de las recomendaciones.
 * Si no hay datos reales, devuelve las series mock.
 */
export function computeStats(recs: Recommendation[], source: "supabase" | "mock") {
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
  const won = decided.filter((r) => r.status === "won").length;
  const lost = decided.filter((r) => r.status === "lost").length;
  const successRate = decided.length ? (won / decided.length) * 100 : 0;

  // ROI simple: suma de EV de las ganadas menos las stakes perdidas (aprox).
  const roi =
    decided.length
      ? decided.reduce(
          (acc, r) => acc + (r.status === "won" ? r.expectedValue : -10),
          0
        ) / decided.length
      : 0;

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
