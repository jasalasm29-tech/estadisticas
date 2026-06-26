// Integración con la API de Football-Data.org para obtener partidos reales.
// Docs: https://www.football-data.org/documentation/quickstart

const API_BASE = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_DATA_API_KEY ?? "";

export const isFootballConfigured = Boolean(API_KEY);

export interface FootballMatch {
  id: number;
  utcDate: string;
  status: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
}

interface RawMatch {
  id: number;
  utcDate: string;
  status: string;
  competition: { name: string };
  homeTeam: { name: string };
  awayTeam: { name: string };
}

/**
 * Obtiene los próximos partidos programados (status SCHEDULED/TIMED).
 * Devuelve [] si la API no está configurada o falla, para no romper la UI.
 */
export async function getUpcomingMatches(limit = 10): Promise<FootballMatch[]> {
  if (!isFootballConfigured) return [];

  try {
    const res = await fetch(`${API_BASE}/matches?status=SCHEDULED`, {
      headers: { "X-Auth-Token": API_KEY },
      // Cachea 5 min para respetar el rate limit del plan gratuito.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`Football-Data error ${res.status}`);
      return [];
    }

    const data = (await res.json()) as { matches: RawMatch[] };
    return (data.matches ?? []).slice(0, limit).map((m) => ({
      id: m.id,
      utcDate: m.utcDate,
      status: m.status,
      competition: m.competition.name,
      homeTeam: m.homeTeam.name,
      awayTeam: m.awayTeam.name,
    }));
  } catch (err) {
    console.error("Football-Data fetch falló:", err);
    return [];
  }
}
