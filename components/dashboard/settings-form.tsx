"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, UserPlus } from "lucide-react"
import { getSettings, updateSettings, createAdminUser } from "@/app/actions/settings"

interface Settings {
  exchangeRate: string // 👈 string siempre
}

interface AdminData {
  name: string
  email: string
  password: string
}

export function SettingsForm() {
  const [settings, setSettings] = useState<Settings>({
    exchangeRate: "4200",
  })

  const [adminData, setAdminData] = useState<AdminData>({
    name: "",
    email: "",
    password: "",
  })

  // 🔹 Cargar configuración
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings()
        // aseguramos que sea string
        setSettings({
          exchangeRate: String(data.exchangeRate ?? "4200"),
        })
      } catch (error) {
        console.error("Error cargando configuración:", error)
      }
    }
    fetchSettings()
  }, [])

  // 🔹 Guardar configuración
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await updateSettings({
        exchangeRate: settings.exchangeRate, // 👈 ya es string
      })

      if (result.success) {
        alert("✅ Configuración guardada exitosamente")
      } else {
        alert("⚠️ Error al guardar configuración")
      }
    } catch (error) {
      console.error("Error al guardar configuración:", error)
      alert("⚠️ Error inesperado al guardar la configuración")
    }
  }

  // 🔹 Crear admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await createAdminUser(adminData)
      if (result.success) {
        alert("✅ Usuario admin creado exitosamente")
        setAdminData({ name: "", email: "", password: "" })
      } else {
        alert("⚠️ Error al crear usuario admin")
      }
    } catch (error) {
      console.error("Error al crear admin:", error)
      alert("⚠️ Error inesperado al crear el usuario admin")
    }
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Configuración */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            Configuración de Precios
          </h3>

          <div className="space-y-2">
            <Label htmlFor="exchangeRate" className="text-white">
              Tasa de Cambio (USD a COP)
            </Label>
            <Input
              id="exchangeRate"
              type="number"
              value={settings.exchangeRate}
              onChange={(e) =>
                setSettings({ ...settings, exchangeRate: e.target.value }) // 👈 sigue siendo string
              }
              className="glass-input w-full"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pb-4">
          <Button type="submit" className="glass-button">
            <Save className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </form>

      {/* Crear usuario admin */}
      <form onSubmit={handleCreateAdmin} className="space-y-6">
        <div className="glass-card p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            Crear Usuario Admin
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="adminName" className="text-white">
                Nombre
              </Label>
              <Input
                id="adminName"
                value={adminData.name}
                onChange={(e) =>
                  setAdminData({ ...adminData, name: e.target.value })
                }
                className="glass-input w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-white">
                Email
              </Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminData.email}
                onChange={(e) =>
                  setAdminData({ ...adminData, email: e.target.value })
                }
                className="glass-input w-full"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="adminPassword" className="text-white">
                Contraseña
              </Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminData.password}
                onChange={(e) =>
                  setAdminData({ ...adminData, password: e.target.value })
                }
                className="glass-input w-full"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pb-4">
          <Button type="submit" className="glass-button">
            <UserPlus className="w-4 h-4 mr-2" />
            Crear Admin
          </Button>
        </div>
      </form>
    </div>
  )
}
