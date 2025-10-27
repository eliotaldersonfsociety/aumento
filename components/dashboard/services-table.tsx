"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getServices, deleteService, getAllSocialNetworks } from "@/app/actions/services"
import { ServiceForm } from "@/components/dashboard/service-form"

interface ServicesTableProps {
  onEdit?: (service: any) => void
  onAdd?: () => void
}

export function ServicesTable({ onEdit }: ServicesTableProps) {
  const [socialNetworks, setSocialNetworks] = useState<string[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState<string>('')
  const [services, setServices] = useState<any>({})
  const [addingService, setAddingService] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const networks = await getAllSocialNetworks()
        setSocialNetworks(networks)
        if (networks.length > 0) {
          setSelectedNetwork(networks[0])
        }
      } catch (error) {
        console.error('Error fetching social networks:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(selectedNetwork)
        setServices(data)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    if (selectedNetwork) {
      fetchServices()
    }
  }, [selectedNetwork])

  const handleDelete = async (category: string, type: string) => {
    try {
      const result = await deleteService(selectedNetwork, category, type)
      if (result.success) {
        setServices((prev: any) => {
          const newServices = { ...prev }
          delete newServices[category]
          return newServices
        })
      } else {
        alert('Error deleting service: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Error deleting service')
    }
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setAddingService(false)
    setEditingService(null)
  }

  return (
    <>
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 flex gap-4 items-center">
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Seleccionar red social" />
            </SelectTrigger>
            <SelectContent>
              {socialNetworks.map(network => (
                <SelectItem key={network} value={network}>
                  {network}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setAddingService(true)} className="glass-button">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Servicio
          </Button>
        </div>
        {Object.keys(services).length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No hay servicios registrados. Agrega tu primer servicio.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(services).map(([category, types]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="px-4 py-3 text-white font-medium">
                  {category}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-2">
                    {Object.entries(types as any).map(([type, serviceData]) => (
                      <div key={type} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{type}</h4>
                          <p className="text-sm text-white/70">${(serviceData as any).pricePerUnit} - {(serviceData as any).minQuantity} - {(serviceData as any).maxQuantity} - {(serviceData as any).deliveryTime}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit({ socialNetwork: selectedNetwork, category, type, ...(serviceData as any) })}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(category, type)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <Dialog open={isModalOpen || addingService} onOpenChange={(open) => {
        setIsModalOpen(open)
        if (!open) setAddingService(false)
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingService ? "Editar Servicio" : "Agregar Servicio"}</DialogTitle>
          </DialogHeader>
          <ServiceForm service={editingService || (addingService ? { socialNetwork: selectedNetwork } : undefined)} onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </>
  )
}
