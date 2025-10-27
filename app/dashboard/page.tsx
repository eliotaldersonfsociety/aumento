import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido al panel de administración</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Ingresos Totales" value="$45,231" change="+20.1%" icon={DollarSign} trend="up" />
            <StatsCard title="Órdenes" value="2,345" change="+15.3%" icon={ShoppingCart} trend="up" />
            <StatsCard title="Clientes" value="1,234" change="+8.2%" icon={Users} trend="up" />
            <StatsCard title="Tasa de Conversión" value="3.2%" change="-2.4%" icon={TrendingUp} trend="down" />
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <RecentOrders />
          </div>
        </div>
      </main>
    </div>
  )
}
