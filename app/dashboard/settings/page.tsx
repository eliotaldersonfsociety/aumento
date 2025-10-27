"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { AdminHeader } from "@/components/dashboard/admin-header"
import { Footer } from "@/components/footer"
import { validateSession } from "@/app/actions/auth/validate-session"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const result = await validateSession()
      if (result.valid && result.user && result.user.role === 'admin') {
        setUser(result.user)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading || !user) return null

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />

        <AdminHeader
          userName={user.name}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 pt-20">
                Configuración
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Administra la configuración de tu plataforma
              </p>
            </div>

            <SettingsForm />
          </div>
        </main>

    </>
  )
}
