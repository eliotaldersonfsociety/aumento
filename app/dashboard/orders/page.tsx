"use client";

import { useState, useEffect } from "react";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AdminHeader } from "@/components/dashboard/admin-header";
import { Footer } from "@/components/footer";
import { validateSession } from "@/app/actions/auth/validate-session";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getAllOrders } from "@/app/actions/admin-data";
import * as XLSX from "xlsx";

export default function OrdersPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const exportToExcel = async () => {
    try {
      const orders = await getAllOrders();
      const data = orders.map((order:any) => ({
        ID: order.id,
        Cliente: order.user_name,
        Servicio: order.servicio,
        Cantidad: order.cantidad,
        Total: order.precio_usd,
        Estado: order.status,
        Fecha: new Date(Number(order.created_at) * 1000).toLocaleDateString("es-CO")
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Órdenes");
      XLSX.writeFile(wb, "ordenes.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error al exportar las órdenes.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const result = await validateSession();
      if (result.valid && result.user && result.user.role === 'admin') {
        setUser(result.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading || !user) return null;

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />

        <AdminHeader
          userName={user.name}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-4 pt-20">
              Bienvenido, {user.name}
            </h1>
            <hr></hr>
            {/* Título y acciones */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 pt-4">
                Órdenes
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Gestiona todas las órdenes de clientes
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
              {/* Botones de acción */}
              <div className="flex gap-2 md:gap-3 justify-end">
                <Button
                  size="icon"
                  className="glass-button p-2 h-8 w-8 md:h-auto md:w-auto"
                  onClick={exportToExcel}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline ml-2 text-white">Exportar</span>
                </Button>
              </div>
            </div>

            {/* Tabla de órdenes */}
            <div>
              <OrdersTable />
            </div>
          </div>
        </main>

    </>
  );
}
