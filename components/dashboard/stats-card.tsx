import type { LucideIcon } from "lucide-react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend: "up" | "down"
  onClick?: () => void
  className?: string
}

export function StatsCard({ title, value, change, icon: Icon, trend, onClick, className }: StatsCardProps) {
  return (
    <div className={`glass-card p-6 ${className || ''}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-white">{title}</p>
        <div className="p-2 rounded-lg bg-white/20 text-white">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <div className="flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
          <span className="text-sm font-extralight text-white ml-1">vs mes anterior</span>
        </div>
      </div>
    </div>
  )
}
