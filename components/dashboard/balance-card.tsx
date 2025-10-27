import type { LucideIcon } from "lucide-react"

interface BalanceCardProps {
  title: string
  value: string
  icon: LucideIcon
  description: string
}

export function BalanceCard({ title, value, icon: Icon, description }: BalanceCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-white">{title}</p>
        <div className="p-2 rounded-lg bg-primary/20">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  )
}
