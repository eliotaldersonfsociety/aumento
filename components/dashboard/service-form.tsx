"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { addService, updateService } from "@/app/actions/services"

interface ServiceFormProps {
  service?: any
  onClose: () => void
}

export function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    socialNetwork: "",
    category: "",
    service: "",
    pricePerUnit: "",
    minQuantity: "",
    maxQuantity: "",
    deliveryTime: "",
    description: "",
    features: "",
  })

  useEffect(() => {
    if (service) {
      setFormData({
        socialNetwork: service.socialNetwork || "",
        category: service.category || "",
        service: service.type || "",
        pricePerUnit: service.pricePerUnit?.toString() || "",
        minQuantity: service.minQuantity?.toString() || "",
        maxQuantity: service.maxQuantity?.toString() || "",
        deliveryTime: service.deliveryTime || "",
        description: service.description || "",
        features: service.features?.join(', ') || "",
      })
    } else {
      // Default to Instagram if available
      setFormData(prev => ({ ...prev, socialNetwork: prev.socialNetwork || 'Instagram' }))
    }
  }, [service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const serviceData = {
      pricePerUnit: parseFloat(formData.pricePerUnit),
      minQuantity: parseInt(formData.minQuantity),
      maxQuantity: parseInt(formData.maxQuantity),
      deliveryTime: formData.deliveryTime,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    }

    try {
      if (service && service.category && service.type) {
        // Update existing service
        const result = await updateService(service.socialNetwork, service.category, service.type, serviceData)
        if (!result.success) throw new Error(result.error)
      } else {
        // Add new service
        const result = await addService(formData.socialNetwork, formData.category, formData.service, serviceData)
        if (!result.success) throw new Error(result.error)
      }

      onClose()
      window.location.reload()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error al guardar el servicio: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">{service ? "Editar Servicio" : "Nuevo Servicio"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="socialNetwork">Red Social</Label>
            <Input
              id="socialNetwork"
              value={formData.socialNetwork}
              onChange={(e) => setFormData({ ...formData, socialNetwork: e.target.value })}
              placeholder="Instagram, TikTok, etc."
              required
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Seguidores, Likes, etc."
              required
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Servicio</Label>
            <Input
              id="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              placeholder="Seguidores Latinos, Likes Internacionales, etc."
              required
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerUnit">Precio por Unidad (USD)</Label>
            <Input
              id="pricePerUnit"
              type="number"
              step="0.001"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
              placeholder="0.001"
              required
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryTime">Tiempo de Entrega</Label>
            <Input
              id="deliveryTime"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              placeholder="1-3 días"
              required
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minQuantity">Cantidad Mínima</Label>
            <Input
              id="minQuantity"
              type="number"
              value={formData.minQuantity}
              onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
              placeholder="100"
              required
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxQuantity">Cantidad Máxima</Label>
            <Input
              id="maxQuantity"
              type="number"
              value={formData.maxQuantity}
              onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
              placeholder="100000"
              required
              className="glass-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descripción del servicio..."
            rows={3}
            required
            className="glass-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Características (separadas por coma)</Label>
          <Textarea
            id="features"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            placeholder="Entrega rápida, Garantía de calidad, Soporte 24/7"
            rows={2}
            className="glass-input"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose} className="glass-button bg-transparent">
            Cancelar
          </Button>
          <Button type="submit" className="glass-button">
            {service ? "Actualizar" : "Guardar"} Servicio
          </Button>
        </div>
      </form>
    </div>
  )
}
