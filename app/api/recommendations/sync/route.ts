import { NextResponse } from "next/server";
import { getUpcomingMatches, isFootballConfigured } from "@/lib/football";
import { generateRecommendations } from "@/lib/engine";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase";

/**
 * POST /api/recommendations/sync
 * Genera recomendaciones a partir de los próximos partidos reales y las
 * persiste en la tabla `recommendations` de Supabase.
 * Pensado para ejecutarse vía cron (p. ej. Vercel Cron) periódicamente.
 */
export async function POST() {
  if (!isFootballConfigured) {
    return NextResponse.json(
      { error: "FOOTBALL_DATA_API_KEY no configurada." },
      { status: 503 }
    );
  }
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json(
      { error: "Supabase admin no configurado." },
      { status: 503 }
    );
  }

  try {
    const matches = await getUpcomingMatches(20);
    const recs = generateRecommendations(matches).slice(0, 12);

    if (recs.length === 0) {
      return NextResponse.json({ inserted: 0, message: "Sin partidos de valor." });
    }

    const rows = recs.map((r) => ({
      match: r.match,
      type: r.type,
      recommendation: r.recommendation,
      probability: r.probability,
      odds: r.odds,
      expected_value: r.expectedValue,
      risk: r.risk,
      status: r.status,
      is_premium: r.risk === "high", // las de alto riesgo, solo Premium
    }));

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("recommendations").insert(rows);
    if (error) throw new Error(error.message);

    return NextResponse.json({ inserted: rows.length });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json({ error: "Fallo al sincronizar." }, { status: 500 });
  }
}
