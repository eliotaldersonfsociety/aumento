"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Order } from "@/lib/data";

interface ClientOrdersTableProps {
  orders: Order[];
}

export function ClientOrdersTable({ orders }: ClientOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      completado: "completed",
      procesando: "processing",
      pendiente: "pending",
    };

    const mappedStatus = statusMap[status] || "pending";

    const variants: Record<string, { label: string; className: string }> = {
      completed: { label: "Completado", className: "bg-green-500/20 text-green-500" },
      processing: { label: "Procesando", className: "bg-blue-500/20 text-blue-500" },
      pending: { label: "Pendiente", className: "bg-yellow-500/20 text-yellow-500" },
    };

    const variant = variants[mappedStatus] || variants.pending;

    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <>
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white">ID</th>
              <th className="text-left p-4 text-sm font-medium text-white">Servicio</th>
              <th className="text-left p-4 text-sm font-medium text-white">Cantidad</th>
              <th className="text-left p-4 text-sm font-medium text-white">Total</th>
              <th className="text-left p-4 text-sm font-medium text-white">Estado</th>
              <th className="text-left p-4 text-sm font-medium text-white">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="border-b border-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <td className="p-4 font-medium text-white">#{order.id}</td>
                <td className="p-4 text-white">{order.servicio}</td>
                <td className="p-4 text-white">{Number(order.cantidad).toLocaleString()}</td>
                <td className="p-4 text-white font-medium">${Number(order.precio_usd).toFixed(2)}</td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4 text-white">{new Date(Number(order.created_at) * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal (Dialog) */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del Pedido #{selectedOrder.id}</DialogTitle>
                <DialogDescription className="text-white/80">
                  Información completa del servicio solicitado.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                <p><span className="font-semibold">Servicio:</span> {selectedOrder.servicio}</p>
                <p><span className="font-semibold">Cantidad:</span> {Number(selectedOrder.cantidad).toLocaleString()}</p>
                <p><span className="font-semibold">Total:</span> ${Number(selectedOrder.precio_usd).toFixed(2)}</p>
                <p><span className="font-semibold">Estado:</span> {getStatusBadge(selectedOrder.status)}</p>
                <p><span className="font-semibold">Fecha:</span> {new Date(Number(selectedOrder.created_at) * 1000).toLocaleDateString()}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
