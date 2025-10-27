"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueChartProps {
  data?: { month: string; revenue: number }[];
}

export function RevenueChart({ data = [] }: RevenueChartProps) {
  const defaultData = [
    { month: "Ene", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Abr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 },
    { month: "Ago", revenue: 0 },
    { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 },
    { month: "Nov", revenue: 0 },
    { month: "Dic", revenue: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const hasData = chartData.some(item => item.revenue > 0);

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6">Ingresos Mensuales</h3>
      {!hasData ? (
        <div className="flex items-center justify-center h-[300px] text-white/60">
          <p>No hay datos de ingresos disponibles.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,50,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(50,255,255,0.5)" />
            <YAxis stroke="rgba(50,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="revenue" fill="#77b6f5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
