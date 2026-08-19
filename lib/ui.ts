import { RecommendationStatus, RiskLevel } from "./types";

// Mapeos de estilos reutilizables para badges de riesgo y estado.
// Paleta Google: verde (bajo/ganada), amarillo (medio/pendiente), rojo (alto/perdida), azul.

export const riskStyles: Record<RiskLevel, string> = {
  low: "bg-value/10 text-value border border-value/30",
  medium: "bg-warn/15 text-bronze-700 border border-warn/40",
  high: "bg-risk/10 text-risk border border-risk/30",
};

export const statusStyles: Record<RecommendationStatus, string> = {
  pending: "bg-signal-500/10 text-signal-600 border border-signal-500/30",
  won: "bg-value/10 text-value border border-value/30",
  lost: "bg-risk/10 text-risk border border-risk/30",
};

export const statusLabels: Record<RecommendationStatus, string> = {
  pending: "Pendiente",
  won: "Ganada",
  lost: "Perdida",
};
