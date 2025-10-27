"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Mail, Phone } from "lucide-react"
import { getAllCustomersWithOrders, addBalanceToUser } from "@/app/actions/admin-data"

export function AdminCustomersTable() {
  const [customers, setCustomers] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [amount, setAmount] = useState("")

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    const data = await getAllCustomersWithOrders()
    setCustomers(data)
  }

  const handleAddBalance = async () => {
    if (!selectedCustomer || !amount) return

    const result = await addBalanceToUser(selectedCustomer.id, Number.parseFloat(amount))
    if (result.success) {
      setAmount("")
      setSelectedCustomer(null)
      loadCustomers()
      alert("Saldo agregado exitosamente")
    } else {
      alert("Error al agregar saldo: " + result.error)
    }
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white">Cliente</th>
              <th className="text-left p-4 text-sm font-medium text-white">Contacto</th>
              <th className="text-left p-4 text-sm font-medium text-white">Saldo</th>
              <th className="text-left p-4 text-sm font-medium text-white">Fecha Registro</th>
              <th className="text-right p-4 text-sm font-medium text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.filter(customer => customer.id).map((customer, index) => (
              <tr key={`${customer.id}-${index}`} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-white">{customer.name}</p>
                    <p className="text-sm text-white">ID: #{customer.id}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-white">
                      <Mail className="w-4 h-4 text-white" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <Phone className="w-4 h-4 text-white" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="p-4 font-bold text-white">${(customer.balance || 0).toFixed(2)}</td>
                <td className="p-4 text-white">{new Date(customer.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="glass-button" onClick={() => setSelectedCustomer(customer)}>
                          <Plus className="w-4 h-4 mr-1 text-white" />
                          Agregar Saldo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-white/10">
                        <DialogHeader>
                          <DialogTitle className="text-white">Agregar Saldo a {customer.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="amount" className="text-white">Monto (USD)</Label>
                            <Input
                              id="amount"
                              type="number"
                              step="0.01"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="100.00"
                              className="glass-input"
                            />
                          </div>
                          <div className="glass-card bg-white/5 p-4">
                            <p className="text-sm text-white">Saldo actual:</p>
                            <p className="text-2xl font-bold text-white">${(customer.balance || 0).toFixed(2)}</p>
                            {amount && (
                              <>
                                <p className="text-sm text-muted-foreground mt-2">Nuevo saldo:</p>
                                <p className="text-2xl font-bold text-green-500">
                                  ${((customer.balance || 0) + Number.parseFloat(amount || "0")).toFixed(2)}
                                </p>
                              </>
                            )}
                          </div>
                          <Button onClick={handleAddBalance} className="w-full glass-button">
                            Confirmar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
