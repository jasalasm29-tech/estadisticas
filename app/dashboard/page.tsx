import type { Metadata } from "next";
import StatCard from "@/components/StatCard";
import DashboardCharts from "@/components/DashboardCharts";
import RecommendationsTable from "@/components/RecommendationsTable";
import PremiumCheckout from "@/components/PremiumCheckout";
import { getRecommendations, computeStats } from "@/lib/recommendations";
import { Stat } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard · PRISM",
  description: "Tus métricas, ROI y recomendaciones activas en PRISM.",
};

// Datos siempre frescos en cada request (lee de Supabase si está configurado).
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: recommendations, source } = await getRecommendations();
  const metrics = computeStats(recommendations, source);

  const stats: Stat[] = [
    { label: "Total recomendaciones", value: String(metrics.total) },
    {
      label: "Tasa de éxito",
      value: `${metrics.successRate}%`,
      trend: source === "mock" ? "+3.1%" : undefined,
      positive: true,
    },
    {
      label: "ROI",
      value: `${metrics.roi > 0 ? "+" : ""}${metrics.roi}%`,
      positive: metrics.roi >= 0,
    },
    { label: "Bankroll", value: "$9.200", trend: "CLP" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Resumen de tu rendimiento y recomendaciones del día.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            source === "supabase"
              ? "bg-google-green/10 text-google-green"
              : "bg-google-yellow/15 text-[#b8860b]"
          }`}
        >
          {source === "supabase" ? "● Datos en vivo" : "● Datos de ejemplo"}
        </span>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* Gráficos */}
      <section className="mt-8">
        <DashboardCharts roiData={metrics.roiData} winLoss={metrics.winLoss} />
      </section>

      {/* Tabla de recomendaciones */}
      <div className="mt-8">
        <RecommendationsTable recommendations={recommendations} />
      </div>

      {/* Premium CTA */}
      <section className="glass mt-8 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-xl font-semibold text-gradient">
            Desbloquea todo el potencial de PRISM
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Recomendaciones ilimitadas, alertas y análisis avanzado por $6.990 CLP/mes.
          </p>
        </div>
        <PremiumCheckout />
      </section>
    </div>
  );
}
