import { RecommendationStatus, RiskLevel } from "./types";

// Mapeos de estilos reutilizables para badges de riesgo y estado.
// Paleta Google: verde (bajo/ganada), amarillo (medio/pendiente), rojo (alto/perdida), azul.

export const riskStyles: Record<RiskLevel, string> = {
  low: "bg-google-green/10 text-google-green border border-google-green/30",
  medium: "bg-google-yellow/15 text-[#b8860b] border border-google-yellow/40",
  high: "bg-google-red/10 text-google-red border border-google-red/30",
};

export const statusStyles: Record<RecommendationStatus, string> = {
  pending: "bg-google-blue/10 text-google-blue border border-google-blue/30",
  won: "bg-google-green/10 text-google-green border border-google-green/30",
  lost: "bg-google-red/10 text-google-red border border-google-red/30",
};

export const statusLabels: Record<RecommendationStatus, string> = {
  pending: "Pendiente",
  won: "Ganada",
  lost: "Perdida",
};
