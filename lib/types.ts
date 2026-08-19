// Tipos TypeScript compartidos en toda la plataforma Prisma 137

/** Nivel de riesgo asociado a una recomendación */
export type RiskLevel = "low" | "medium" | "high";

/** Estado de una recomendación de apuesta */
export type RecommendationStatus = "pending" | "won" | "lost";

/** Tipo de apuesta recomendada */
export type BetType =
  | "Combinada"
  | "Doble Oportunidad"
  | "Goles"
  | "Resultado";

/** Recomendación de apuesta inteligente */
export interface Recommendation {
  id: string;
  /** Encuentro deportivo, ej: "Brasil vs Argentina" */
  match: string;
  /** Tipo de apuesta */
  type: BetType;
  /** Texto de la recomendación */
  recommendation: string;
  /** Probabilidad estimada (0-100) */
  probability: number;
  /** Cuota estimada (multiplicador) */
  odds: number;
  /** Expected Value en porcentaje */
  expectedValue: number;
  /** Nivel de riesgo */
  risk: RiskLevel;
  /** Estado actual */
  status: RecommendationStatus;
}

/** Punto de datos para el gráfico de ROI semanal */
export interface RoiDataPoint {
  week: string;
  roi: number;
}

/** Métrica mostrada en una StatCard */
export interface Stat {
  label: string;
  value: string;
  /** Variación opcional, ej: "+12.4%" */
  trend?: string;
  /** Si la tendencia es positiva (para colorear) */
  positive?: boolean;
}
