"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/dashboard/admin-header"
import { AdminCustomersTable } from "@/components/dashboard/admin-customers-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Footer } from "@/components/footer"
import { validateSession } from "@/app/actions/auth/validate-session"
import { getAllCustomersWithOrders } from "@/app/actions/admin-data"
import * as XLSX from "xlsx"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function AdminCustomersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const result = await validateSession()
      if (result.valid && result.user && result.user.role === 'admin') {
        setUser(result.user)
      } else {
        router.push("/auth/login")
      }
      setLoading(false)
    }
    fetchUser()
  }, [router])

  if (loading || !user) return null

  const handleExport = async () => {
    try {
      const customers = await getAllCustomersWithOrders()
      const data = customers.map((customer: any) => ({
        ID: customer.id,
        Nombre: customer.name,
        Email: customer.email,
        Teléfono: customer.phone,
        Saldo: customer.balance || 0,
        'Fecha Registro': new Date(customer.created_at).toLocaleDateString(),
        'Número de Órdenes': customer.orders_count,
        'Total Gastado': customer.total_spent
      }))

      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Clientes')
      XLSX.writeFile(wb, 'clientes.xlsx')
    } catch (error) {
      console.error('Error al exportar:', error)
      alert('Error al exportar los datos')
    }
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <AdminHeader
          userName={user.name}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Contenido principal */}
        <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 lg:ml-64 transition-all">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-4 pt-4">
              Bienvenido, {user.name}
            </h1>
            <hr></hr>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 pt-4">
                  Recarga de Saldo
                </h1>
                <p className="text-sm sm:text-base text-white">
                  Administra clientes y sus saldos
                </p>
              </div>
              <div className="flex justify-end">
              <Button
                              className="glass-button flex-none self-start w-auto px-2 py-1 sm:px-4 sm:py-2 h-8 sm:h-9"
                              onClick={handleExport}
                            >
                              <Download className="w-4 h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Exportar</span>
              </Button>
              </div>


            </div>

            <AdminCustomersTable />
          </div>
        </main>

    </>
  )
}
