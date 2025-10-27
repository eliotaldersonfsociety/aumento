"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart } from "lucide-react"

interface ServiceCatalogProps {
  user: any
}

export function ServiceCatalog({ user }: ServiceCatalogProps) {
  const [services, setServices] = useState<any[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services") || "[]")
    setServices(storedServices)
  }, [])

  const handlePurchase = (service: any) => {
    const quantity = quantities[service.id] || service.minQuantity
    const total = quantity * service.pricePerUnit

    if (user.balance < total) {
      alert("Saldo insuficiente. Por favor, contacta al administrador para recargar tu cuenta.")
      return
    }

    // Deduct balance
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, balance: u.balance - total }
      }
      return u
    })
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("currentUser", JSON.stringify({ ...user, balance: user.balance - total }))

    alert(`Orden creada exitosamente! Total: $${total.toFixed(2)}`)
    window.location.reload()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const quantity = quantities[service.id] || service.minQuantity
        const total = quantity * service.pricePerUnit

        return (
          <div key={service.id} className="glass-card p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-1">{service.platform}</h3>
              <p className="text-sm text-muted-foreground">{service.serviceType}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor={`quantity-${service.id}`}>Cantidad</Label>
                <Input
                  id={`quantity-${service.id}`}
                  type="number"
                  min={service.minQuantity}
                  max={service.maxQuantity}
                  value={quantity}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [service.id]: Number.parseInt(e.target.value) || service.minQuantity,
                    })
                  }
                  className="glass-input mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Min: {service.minQuantity} - Max: {service.maxQuantity}
                </p>
              </div>

              <div className="glass-card bg-white/5 p-4">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">${total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">${(total * 4200).toLocaleString()} COP</p>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>⏱️ Entrega: {service.deliveryTime}</p>
                <p className="mt-1">📝 {service.description}</p>
              </div>
            </div>

            <Button onClick={() => handlePurchase(service)} className="w-full glass-button">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar Ahora
            </Button>
          </div>
        )
      })}

      {services.length === 0 && (
        <div className="col-span-full text-center p-12 glass-card">
          <p className="text-muted-foreground">No hay servicios disponibles en este momento.</p>
        </div>
      )}
    </div>
  )
}
