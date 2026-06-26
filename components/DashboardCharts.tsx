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
import { mockRoiData, mockWinLossData } from "@/lib/mockData";

const PIE_COLORS = ["#06B6D4", "#EC4899"];

/** Gráficos del dashboard: ROI semanal (línea) y ganadas/perdidas (pie). */
export default function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ROI semanal */}
      <div className="glass p-5">
        <h3 className="mb-4 font-semibold text-white">ROI semanal</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRoiData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} unit="%" />
              <Tooltip
                contentStyle={{
                  background: "#1F2937",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{ fill: "#EC4899", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ganadas vs perdidas */}
      <div className="glass p-5">
        <h3 className="mb-4 font-semibold text-white">Ganadas vs Perdidas</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockWinLossData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                label={({ value }) => `${value}%`}
              >
                {mockWinLossData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1F2937",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#9CA3AF", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
