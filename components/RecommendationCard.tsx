import { Recommendation } from "@/lib/types";
import { riskStyles, statusStyles, statusLabels } from "@/lib/ui";

/** Tarjeta para una recomendación (vista móvil del listado). */
export default function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="glass animate-fade-in-up p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-navy-800">{rec.match}</h4>
          <p className="text-xs text-muted">{rec.type}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[rec.status]}`}
        >
          {statusLabels[rec.status]}
        </span>
      </div>

      <p className="mt-3 text-sm text-navy-700">{rec.recommendation}</p>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <dt className="text-xs text-muted">Prob.</dt>
          <dd className="text-sm font-semibold text-navy-800">{rec.probability}%</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Cuota</dt>
          <dd className="text-sm font-semibold text-navy-800">{rec.odds.toFixed(2)}x</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">EV</dt>
          <dd className="text-sm font-semibold text-value">+{rec.expectedValue}%</dd>
        </div>
      </dl>

      <div className="mt-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${riskStyles[rec.risk]}`}
        >
          Riesgo {rec.risk}
        </span>
      </div>
    </div>
  );
}
