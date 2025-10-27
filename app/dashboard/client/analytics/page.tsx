"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AnalyticsDashboard } from "@/components/dashboard/client-analytics"
import { AdminHeader } from "@/components/dashboard/admin-header"
import { Footer } from "@/components/footer"
import { validateSession } from "@/app/actions/auth/validate-session"
import { getOrders } from "@/app/actions/getOrders"
import { Order } from "@/lib/data"

export default function AnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession()
        if (result.valid && result.user) {
          setUser(result.user)
          const fetchedOrders = await getOrders(result.user.id as string)
          setOrders(fetchedOrders as Order[])
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
      <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex items-center justify-center">
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
        

        {/* Contenido principal */}
        <main className="flex-1 pt-4 px-4 sm:px-8 md:ml-64 transition-all duration-300">
          <h1 className="text-2xl font-semibold text-white">
            Bienvenido, {user.name}
          </h1>
          <hr></hr>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white pt-20">Analíticas</h1>
            <p className="text-white text-sm md:text-base pb-4">
                Mira en tiempo real las métricas de tu red social
              </p>
            <AnalyticsDashboard orders={orders} />
          </div>
        </main>
    </>
  )
}
