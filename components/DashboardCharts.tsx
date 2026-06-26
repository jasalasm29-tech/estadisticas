"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { RoiDataPoint } from "@/lib/types";

// Verde (ganadas) y rojo (perdidas), estilo Google.
const PIE_COLORS = ["#34A853", "#EA4335"];

interface DashboardChartsProps {
  roiData: RoiDataPoint[];
  winLoss: { name: string; value: number }[];
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  color: "#111827",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
} as const;

/** Gráficos del dashboard: ROI semanal (línea) y ganadas/perdidas (pie). */
export default function DashboardCharts({ roiData, winLoss }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ROI semanal */}
      <div className="glass p-5">
        <h3 className="mb-4 font-semibold text-gray-900">ROI semanal</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#4285F4"
                strokeWidth={3}
                dot={{ fill: "#EA4335", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ganadas vs perdidas */}
      <div className="glass p-5">
        <h3 className="mb-4 font-semibold text-gray-900">Ganadas vs Perdidas</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={winLoss}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                label={({ value }) => `${value}%`}
              >
                {winLoss.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: "#6b7280", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
