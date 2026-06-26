import { NextResponse } from "next/server";
import { getUpcomingMatches, isFootballConfigured } from "@/lib/football";

/**
 * GET /api/matches
 * Devuelve los próximos partidos reales desde Football-Data.org.
 * Útil para alimentar el motor de recomendaciones.
 */
export async function GET() {
  if (!isFootballConfigured) {
    return NextResponse.json(
      { configured: false, matches: [], message: "FOOTBALL_DATA_API_KEY no configurada." },
      { status: 200 }
    );
  }

  const matches = await getUpcomingMatches(20);
  return NextResponse.json({ configured: true, matches });
}
