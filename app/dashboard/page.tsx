import type { Metadata } from "next";
import StatCard from "@/components/StatCard";
import DashboardCharts from "@/components/DashboardCharts";
import RecommendationsTable from "@/components/RecommendationsTable";
import PremiumCheckout from "@/components/PremiumCheckout";
import { mockRecommendations } from "@/lib/mockData";
import { Stat } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard · PRISM",
  description: "Tus métricas, ROI y recomendaciones activas en PRISM.",
};

const stats: Stat[] = [
  { label: "Total recomendaciones", value: "124" },
  { label: "Tasa de éxito", value: "58.5%", trend: "+3.1%", positive: true },
  { label: "ROI", value: "+12.4%", trend: "+2.0%", positive: true },
  { label: "Bankroll", value: "$9.200", trend: "CLP" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-gray-400">
          Resumen de tu rendimiento y recomendaciones del día.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* Gráficos */}
      <section className="mt-8">
        <DashboardCharts />
      </section>

      {/* Tabla de recomendaciones */}
      <div className="mt-8">
        <RecommendationsTable recommendations={mockRecommendations} />
      </div>

      {/* Premium CTA */}
      <section className="glass mt-8 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-xl font-semibold text-gradient">
            Desbloquea todo el potencial de PRISM
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Recomendaciones ilimitadas, alertas y análisis avanzado por $6.990 CLP/mes.
          </p>
        </div>
        <PremiumCheckout />
      </section>
    </div>
  );
}
