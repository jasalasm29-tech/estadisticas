import { Stat } from "@/lib/types";

/** Tarjeta para mostrar una métrica del dashboard. */
export default function StatCard({ label, value, trend, positive }: Stat) {
  return (
    <div className="glass animate-fade-in-up p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-bold text-navy-800">{value}</span>
        {trend && (
          <span
            className={`text-sm font-semibold ${
              positive ? "text-value" : "text-muted/70"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
