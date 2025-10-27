"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getAllOrders } from "@/app/actions/admin-data";
import { updateOrderStatusAction } from "@/app/actions/updateOrderStatus";

export function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };
    loadOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      completado: { label: "Completado", className: "bg-green-500/20 text-green-500" },
      procesando: { label: "Procesando", className: "bg-blue-500/20 text-blue-500" },
      pendiente: { label: "Pendiente", className: "bg-yellow-500/20 text-yellow-500" },
    };
    const variant = variants[status] || variants.pendiente;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm) ||
    order.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-card overflow-hidden">

      <div className="p-4 border-b border-white/10">
        <Input
          placeholder="Buscar por ID de orden o nombre del cliente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="overflow-x-auto hidden md:block">
        {/* 🖥️ Versión escritorio */}
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white">ID</th>
              <th className="text-left p-4 text-sm font-medium text-white">Cliente</th>
              <th className="text-left p-4 text-sm font-medium text-white">Servicio</th>
              <th className="text-left p-4 text-sm font-medium text-white">Cantidad</th>
              <th className="text-left p-4 text-sm font-medium text-white">Total</th>
              <th className="text-left p-4 text-sm font-medium text-white">Estado</th>
              <th className="text-left p-4 text-sm font-medium text-white">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium text-white">#{order.id}</td>
                <td className="p-4 text-white">{order.user_name}</td>
                <td className="p-4 text-white">{order.servicio}</td>
                <td className="p-4 text-white">{order.cantidad.toLocaleString("es-CO")}</td>
                <td className="p-4 text-white font-medium">${order.precio_usd}</td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4 text-white">{new Date(Number(order.created_at) * 1000).toLocaleDateString("es-CO")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Versión móvil */}
      <div className="md:hidden divide-y divide-white/10">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="p-4 flex justify-between items-center hover:bg-white/10 transition rounded-lg cursor-pointer"
          >
            <div>
              <p className="text-white font-medium">{order.user_name}</p>
              <p className="text-sm text-white">{order.servicio}</p>
            </div>
            <div>{getStatusBadge(order.status)}</div>
          </div>
        ))}
      </div>

      {/* 🪟 Modal detalle de orden */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Detalle de la orden #{selectedOrder?.id}</DialogTitle>

            <DialogDescription className="text-white">
              Información completa del pedido seleccionado. Puedes cambiar el estado aquí.
            </DialogDescription>

          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-3 mt-3">
              <p><span className="font-medium">Cliente:</span> {selectedOrder.user_name}</p>
              <p><span className="font-medium">Servicio:</span> {selectedOrder.servicio}</p>
              <p><span className="font-medium">Cantidad:</span> {selectedOrder.cantidad.toLocaleString()}</p>
              <p><span className="font-medium">Total:</span> ${selectedOrder.precio_usd}</p>
              <p><span className="font-medium">Fecha:</span> {new Date(Number(selectedOrder.created_at) * 1000).toLocaleDateString("es-CO")}</p>

              <div className="space-y-2">
                <label className="font-medium">Estado:</label>
                <Select value={newStatus || selectedOrder.status} onValueChange={setNewStatus}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/10 border-white/20 text-white">
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="procesando">Procesando</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={async () => {
                  if (newStatus && newStatus !== selectedOrder.status) {
                    const result = await updateOrderStatusAction(selectedOrder.id, newStatus);
                    if (result.success) {
                      setOrders(orders.map(order =>
                        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
                      ));
                      setSelectedOrder({ ...selectedOrder, status: newStatus });
                      setNewStatus("");
                    } else {
                      alert("Error al actualizar el estado: " + result.error);
                    }
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Actualizar Estado
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
