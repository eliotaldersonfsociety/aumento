"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Key } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { updateUserPassword } from "@/app/actions/update-password"

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: string;
  joinDate: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {

  const [open, setOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[0] | null>(null)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleViewDetails = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer)
    setOpen(true)
    setShowChangePassword(false)
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)
    try {
      const result = await updateUserPassword(selectedCustomer!.id, newPassword)
      if (result.success) {
        alert("Contraseña actualizada exitosamente")
        setShowChangePassword(false)
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      alert("Error al actualizar la contraseña")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-white">Cliente</th>
                <th className="text-left p-4 text-sm font-medium text-white">Contacto</th>
                <th className="text-left p-4 text-sm font-medium text-white">Órdenes</th>
                <th className="text-left p-4 text-sm font-medium text-white">Total Gastado</th>
                <th className="text-left p-4 text-sm font-medium text-white">Fecha Registro</th>
                <th className="text-right p-4 text-sm font-medium text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.email} className="border-b border-white/5 hover:bg-white/5 text-white">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">{customer.name}</p>
                      <p className="text-sm text-muted">ID: #{customer.id}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted">{customer.orders}</td>
                  <td className="p-4 font-medium text-muted">{customer.totalSpent}</td>
                  <td className="p-4 text-muted">{customer.joinDate}</td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-button bg-transparent"
                        onClick={() => handleViewDetails(customer)}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass-card sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Detalles del Cliente</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4 text-white">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">Nombre:</span>
                <span className="col-span-3 font-medium">{selectedCustomer.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">Email:</span>
                <span className="col-span-3 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {selectedCustomer.email}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">Teléfono:</span>
                <span className="col-span-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {selectedCustomer.phone}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">Órdenes:</span>
                <span className="col-span-3">{selectedCustomer.orders}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">Total Gastado:</span>
                <span className="col-span-3 font-medium">{selectedCustomer.totalSpent}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">Fecha de Registro:</span>
                <span className="col-span-3">{selectedCustomer.joinDate}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-muted">ID:</span>
                <span className="col-span-3">#{selectedCustomer.id}</span>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="glass-button flex-1 text-white"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              <Key className="w-4 h-4 mr-2" />
              Cambiar Contraseña
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="glass-button flex-1 text-white">
                Cerrar
              </Button>
            </DialogClose>
          </div>

          {showChangePassword && (
            <div className="mt-4 p-4 border-t border-white/10">
              <h4 className="text-white font-semibold mb-3">Cambiar Contraseña</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="newPassword" className="text-white">Nueva Contraseña</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="glass-input w-full"
                    placeholder="Ingresa la nueva contraseña"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-white">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="glass-input w-full"
                    placeholder="Confirma la nueva contraseña"
                  />
                </div>
                <Button
                  onClick={handleChangePassword}
                  disabled={loading || !newPassword || !confirmPassword}
                  className="glass-button w-full"
                >
                  {loading ? "Actualizando..." : "Actualizar Contraseña"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}