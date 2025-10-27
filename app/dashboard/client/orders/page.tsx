"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClientOrdersTable } from "@/components/dashboard/client-orders-table";
import { validateSession } from "@/app/actions/auth/validate-session";
import { getOrders } from "@/app/actions/getOrders";
import { Order } from "@/lib/data";

export default function ClientOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user) {
          setUser(result.user);
          // Fetch orders
          const fetchedOrders = await getOrders(result.user.id as string);
          setOrders(fetchedOrders as Order[]);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Bienvenido, {user.name}
      </h1>
      <hr></hr>
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 pt-20">Mis Órdenes</h1>
        <p className="text-white text-sm sm:text-base">
          Historial completo de tus pedidos
        </p>
      </div>
      <div className="glass-card p-4 sm:p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg">
        <ClientOrdersTable orders={orders} />
      </div>
    </div>
  );
}
