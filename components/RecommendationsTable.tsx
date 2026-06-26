"use client";

import { useMemo, useState } from "react";
import { Recommendation, RecommendationStatus } from "@/lib/types";
import { riskStyles, statusStyles, statusLabels } from "@/lib/ui";
import RecommendationCard from "./RecommendationCard";

type Filter = "all" | RecommendationStatus;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "won", label: "Ganadas" },
  { value: "lost", label: "Perdidas" },
];

/** Tabla de recomendaciones activas con filtros por estado. */
export default function RecommendationsTable({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? recommendations
        : recommendations.filter((r) => r.status === filter),
    [filter, recommendations]
  );

  return (
    <section className="glass p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-gray-900">Recomendaciones activas</h3>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por estado">
          {filters.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-google-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla (desktop) */}
      <div className="mt-6 hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-3 py-3">Match</th>
              <th className="px-3 py-3">Tipo</th>
              <th className="px-3 py-3">Recomendación</th>
              <th className="px-3 py-3">Prob.</th>
              <th className="px-3 py-3">Cuota</th>
              <th className="px-3 py-3">EV</th>
              <th className="px-3 py-3">Riesgo</th>
              <th className="px-3 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rec) => (
              <tr
                key={rec.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-3 py-4 font-medium text-gray-900">{rec.match}</td>
                <td className="px-3 py-4 text-gray-600">{rec.type}</td>
                <td className="px-3 py-4 text-gray-600">{rec.recommendation}</td>
                <td className="px-3 py-4 text-gray-600">{rec.probability}%</td>
                <td className="px-3 py-4 text-gray-600">{rec.odds.toFixed(2)}x</td>
                <td className="px-3 py-4 font-semibold text-google-green">+{rec.expectedValue}%</td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${riskStyles[rec.risk]}`}>
                    {rec.risk}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[rec.status]}`}>
                    {statusLabels[rec.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            No hay recomendaciones para este filtro.
          </p>
        )}
      </div>

      {/* Cards (móvil) */}
      <div className="mt-6 grid gap-4 md:hidden">
        {filtered.map((rec) => (
          <RecommendationCard key={rec.id} rec={rec} />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            No hay recomendaciones para este filtro.
          </p>
        )}
      </div>
    </section>
  );
}
