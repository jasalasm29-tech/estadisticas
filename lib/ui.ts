import { RecommendationStatus, RiskLevel } from "./types";

// Mapeos de estilos reutilizables para badges de riesgo y estado.

export const riskStyles: Record<RiskLevel, string> = {
  low: "bg-cyan/10 text-cyan border border-cyan/30",
  medium: "bg-amber-400/10 text-amber-300 border border-amber-400/30",
  high: "bg-magenta/10 text-magenta border border-magenta/30",
};

export const statusStyles: Record<RecommendationStatus, string> = {
  pending: "bg-gray-500/15 text-gray-300 border border-gray-400/30",
  won: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  lost: "bg-red-500/15 text-red-300 border border-red-500/30",
};

export const statusLabels: Record<RecommendationStatus, string> = {
  pending: "Pendiente",
  won: "Ganada",
  lost: "Perdida",
};
