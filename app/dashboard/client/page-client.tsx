// app/dashboard/client/page-client.tsx
'use client';
import { BalanceCard } from "@/components/dashboard/balance-card";
import { ClientOrdersTable } from "@/components/dashboard/client-orders-table";
import { Wallet, ShoppingBag, Clock } from "lucide-react";
import { Order } from "@/lib/data";

export default function ClientDashboardClient({
  user,
  orders
}: {
  user: any;
  orders: Order[];
}) {
  // Calcula métricas desde los datos reales
  const activeOrders = orders.filter(order => order.status === 'pendiente' || order.status === 'procesando').length;
  const totalOrders = orders.length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 pt-24">
          Mi Dashboard
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Bienvenido, {user.name || 'Usuario'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 text-white">
        <BalanceCard
          title="Saldo Disponible"
          value={`$${(user.balance || 0).toFixed(2)}`}
          icon={Wallet}
          description="Tu saldo actual"
        />
        <BalanceCard
          title="Órdenes Activas"
          value={activeOrders.toString()}
          icon={Clock}
          description="En proceso"
        />
        <BalanceCard
          title="Total Órdenes"
          value={totalOrders.toString()}
          icon={ShoppingBag}
          description="Recientes"
        />
      </div>
      <div className="glass-card p-4 md:p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
          Mis Órdenes Recientes
        </h2>
        <ClientOrdersTable orders={orders} />
      </div>
    </div>
  );
}
