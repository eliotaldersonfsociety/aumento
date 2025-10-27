"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ServiceForm } from "@/components/dashboard/service-form"
import { ServicesTable } from "@/components/dashboard/services-table"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/dashboard/admin-header"
import { Footer } from "@/components/footer"
import { validateSession } from "@/app/actions/auth/validate-session"

export default function ServicesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession()
        if (result.valid && result.user) {
          setUser(result.user)
        } else {
          router.replace("/auth/login")
        }
      } catch (error) {
        console.error("Error verificando sesión:", error)
        router.replace("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!user) return null


  return (
    <>
      {/* Header fijo */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AdminHeader
          userName={user.name}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* Sidebar (visible solo en desktop o si se abre en móvil) */}
      <Sidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />


      {/* Contenido principal */}
      <main
        className={`
          flex-1 transition-all duration-300
          pt-28 md:pt-24
          px-4 sm:px-6 md:px-8
          ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0"}
        `}
      >
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-semibold text-white mb-4">
        Bienvenido, {user.name}
      </h1>
      <hr></hr>
          {/* Encabezado de página */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1 pt-4">
                Servicios
              </h1>
              <p className="text-white text-sm sm:text-base">
                Gestiona todos los servicios disponibles
              </p>
            </div>

          </div>

          {/* Tabla de servicios */}
          <ServicesTable />
        </div>
      </main>
    </>
  )
}
