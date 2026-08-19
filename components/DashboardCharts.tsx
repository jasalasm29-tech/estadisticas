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

// Semánticos de marca: verde valor (ganadas), rojo riesgo (perdidas).
// Ver brand/BRAND.md §3.3 — el verde y el rojo aquí significan algo.
const PIE_COLORS = ["#159B6B", "#D24B3E"];

interface DashboardChartsProps {
  roiData: RoiDataPoint[];
  winLoss: { name: string; value: number }[];
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #DDE3EC",
  borderRadius: 14,
  color: "#0F2140",
  fontVariantNumeric: "tabular-nums",
  boxShadow: "0 8px 24px -8px rgba(21, 43, 79, 0.18)",
} as const;

/** Gráficos del dashboard: ROI semanal (línea) y ganadas/perdidas (pie). */
export default function DashboardCharts({ roiData, winLoss }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ROI semanal */}
      <div className="glass p-5">
        <h3 className="mb-4 font-semibold text-navy-800">ROI semanal</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDE3EC" />
              <XAxis dataKey="week" stroke="#5B6B85" fontSize={12} />
              <YAxis stroke="#5B6B85" fontSize={12} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#2E6FD8"
                strokeWidth={3}
                dot={{ fill: "#2E6FD8", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ganadas vs perdidas */}
      <div className="glass p-5">
        <h3 className="mb-4 font-semibold text-navy-800">Ganadas vs Perdidas</h3>
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
              <Legend wrapperStyle={{ color: "#5B6B85", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
