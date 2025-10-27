"use client"

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface RecentOrdersProps {
  orders?: any[];
}

export function RecentOrders({ orders = [] }: RecentOrdersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const defaultOrders = [
    { id: "1234", customer: "Juan Pérez", service: "Instagram Seguidores", amount: "$25.00", status: "completed" },
    { id: "1235", customer: "María García", service: "TikTok Likes", amount: "$30.00", status: "processing" },
    { id: "1236", customer: "Carlos López", service: "YouTube Views", amount: "$150.00", status: "pending" },
    { id: "1237", customer: "Ana Martínez", service: "Facebook Likes", amount: "$15.00", status: "completed" },
  ];

  const displayOrders = orders.length > 0 ? orders : defaultOrders;

  const totalPages = Math.ceil(displayOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = displayOrders.slice(startIndex, endIndex);

  // Reset page when orders change
  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      completado: "completed",
      procesando: "processing",
      pendiente: "pending",
    };

    const mappedStatus = statusMap[status] || "pending";

    const variants: Record<string, { label: string; className: string }> = {
      completed: { label: "Completado", className: "bg-green-100 text-green-500" },
      processing: { label: "Procesando", className: "bg-blue-100 text-blue-500" },
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-500" },
    }

    return variants[mappedStatus] || variants.pending
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6">Órdenes Recientes</h3>
      <div className="space-y-4">
        {paginatedOrders.map((order) => {
          const statusInfo = getStatusBadge(order.status)
          return (
            <div
              key={order.id}
              className="flex items-center text-white justify-between p-4 rounded-lg bg-white/20 hover:bg-white/10"
            >
              <div className="flex-1">
                <p className="font-medium text-white">{order.user_name || order.customer}</p>
                <p className="text-sm text-white">{order.servicio || order.service}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
                <p className="font-bold text-white">${Number(order.precio_usd || order.amount.replace('$', '')).toFixed(2)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Contador de páginas */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-white/80">
          Página {currentPage} de {totalPages} ({displayOrders.length} órdenes totales)
        </p>

        {/* Paginación */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
