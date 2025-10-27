"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AdminHeader } from "@/components/dashboard/admin-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";
import { Footer } from "@/components/footer";
import { validateSession } from "@/app/actions/auth/validate-session";
import { getAdminStats, getMonthlyRevenue, getRecentOrders, getAllOrders } from "@/app/actions/admin-data";
import { getSettings } from "@/app/actions/settings";

interface AdminHeaderProps {
  userName?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(4200);
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'COP'>('USD');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user && result.user.role === 'admin') {
          setUser(result.user);

          // Fetch admin data
          const statsData = await getAdminStats();
          const revenueData = await getMonthlyRevenue();
          const ordersData = await getRecentOrders();
          const allOrdersData = await getAllOrders();

          setStats(statsData);
          setMonthlyRevenue(revenueData);
          setRecentOrders(ordersData);
          setAllOrders(allOrdersData);
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  // Fetch exchange rate on mount
  useEffect(() => {
    const fetchExchangeRate = async () => {
      const settings = await getSettings();
      setExchangeRate(Number(settings.exchangeRate));
    };
    fetchExchangeRate();
  }, []);

  // Function to toggle currency mode
  const toggleCurrency = () => {
    setCurrencyMode(currencyMode === 'USD' ? 'COP' : 'USD');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>

      <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />

        <AdminHeader
          userName={user.name}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 pt-20">
                Dashboard Admin
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Bienvenido, {user.name}
              </p>
            </div>

            {/* Cards estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 text-white">
              <StatsCard
                title="Ingresos Totales"
                value={
                  currencyMode === 'USD'
                    ? `$${Number(stats?.totalRevenue || 0).toFixed(2)}`
                    : `COP $${(Number(stats?.totalRevenue || 0) * exchangeRate).toLocaleString('es-CO', { minimumFractionDigits: 2 })}`
                }
                change={`${stats?.revenueChange || 0}%`}
                icon={DollarSign}
                trend={Number(stats?.revenueChange || 0) >= 0 ? "up" : "down"}
                onClick={toggleCurrency}
                className="cursor-pointer hover:bg-white/10 transition-colors"
              />
              <StatsCard title="Órdenes" value={stats?.totalOrders?.toString() || '0'} change={`${stats?.ordersChange || 0}%`} icon={ShoppingCart} trend={Number(stats?.ordersChange || 0) >= 0 ? "up" : "down"} />
              <StatsCard title="Clientes" value={stats?.totalClients?.toString() || '0'} change={`${stats?.clientsChange || 0}%`} icon={Users} trend={Number(stats?.clientsChange || 0) >= 0 ? "up" : "down"} />
              <StatsCard title="Tasa de Conversión" value={`${stats?.conversionRate || 0}%`} change={`${stats?.conversionChange || 0}%`} icon={TrendingUp} trend={Number(stats?.conversionChange || 0) >= 0 ? "up" : "down"} />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <RevenueChart data={monthlyRevenue} />
              <RecentOrders orders={recentOrders} />
            </div>
          </div>
        </main>

    </>
  );
}
