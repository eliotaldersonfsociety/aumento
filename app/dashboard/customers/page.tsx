"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { CustomersTable } from "@/components/dashboard/customers-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, UserPlus, Search } from "lucide-react"
import { AdminHeader } from "@/components/dashboard/admin-header"
import { validateSession } from "@/app/actions/auth/validate-session"
import { getAllCustomersWithOrders, createCustomer } from "@/app/actions/admin-data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: string;
  joinDate: string;
}

export default function CustomersPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', password: '' })
  const [adding, setAdding] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      const result = await validateSession()
      if (result.valid && result.user && result.user.role === 'admin') {
        setUser(result.user)

        // Fetch customers data
        const customersData = await getAllCustomersWithOrders()
        const formattedCustomers: Customer[] = customersData.map((c: any) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || 'N/A',
          orders: c.orders_count,
          totalSpent: `$${Number(c.total_spent).toFixed(2)}`,
          joinDate: new Date(c.created_at).toLocaleDateString(),
        }))
        setCustomers(formattedCustomers)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.password) {
      alert('Nombre, email y contraseña son requeridos')
      return
    }
    setAdding(true)
    try {
      const result = await createCustomer(newCustomer.name, newCustomer.email, newCustomer.phone, newCustomer.password)
      if (result.success) {
        // Refresh customers
        const customersData = await getAllCustomersWithOrders()
        const formattedCustomers: Customer[] = customersData.map((c: any) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || 'N/A',
          orders: c.orders_count,
          totalSpent: `$${Number(c.total_spent).toFixed(2)}`,
          joinDate: new Date(c.created_at).toLocaleDateString(),
        }))
        setCustomers(formattedCustomers)
        setCurrentPage(1)
        setCurrentPage(1) // Reset to first page
        setOpenAddModal(false)
        setNewCustomer({ name: '', email: '', phone: '', password: '' })
        alert('Cliente agregado exitosamente')
      } else {
        alert('Error al agregar cliente')
      }
    } catch (error) {
      alert('Error al agregar cliente')
    } finally {
      setAdding(false)
    }
  }

  const handleExport = () => {
    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Órdenes', 'Total Gastado', 'Fecha de Registro']
    const csvContent = [
      headers.join(','),
      ...filteredCustomers.map(c => [
        c.id,
        `"${c.name}"`,
        `"${c.email}"`,
        `"${c.phone}"`,
        c.orders,
        c.totalSpent,
        c.joinDate
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clientes.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

  if (loading || !user) return null

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />

        <AdminHeader
          userName={user.name}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-4 pt-20">
              Bienvenido, {user.name}
            </h1>
            <hr></hr>
            {/* Encabezado */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 pt-4">
                Clientes
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Gestiona tu base de clientes
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
              {/* Botones */}
              <div className="flex gap-2 md:gap-3 justify-end">
                <Button
                  variant="outline"
                  className="glass-button bg-transparent flex items-center justify-center p-2 md:p-3"
                  onClick={() => setOpenAddModal(true)}
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  <span className="hidden md:inline ml-2 text-white">Agregar</span>
                </Button>
                <Button
                  variant="outline"
                  className="glass-button bg-transparent flex items-center justify-center p-2 md:p-3"
                  onClick={() => setOpenSearch(true)}
                >
                  <Search className="w-4 h-4 text-white" />
                  <span className="hidden md:inline ml-2 text-white">Buscar</span>
                </Button>
                <Button className="glass-button flex items-center justify-center p-2 md:p-3" onClick={handleExport}>
                  <Download className="w-4 h-4 text-white" />
                  <span className="hidden md:inline ml-2 text-white">Exportar</span>
                </Button>
              </div>
            </div>

            {/* Tabla de clientes */}
            <div className="overflow-x-auto">
              <CustomersTable customers={paginatedCustomers} />
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </main>

        {/* Modal para agregar cliente */}
        <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
          <DialogContent className="glass-card sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-white">Agregar Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-white">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-white">Nombre</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="col-span-3 glass-input"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="col-span-3 glass-input"
                  placeholder="Email del cliente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-white">Teléfono</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="col-span-3 glass-input"
                  placeholder="Teléfono del cliente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right text-white">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={newCustomer.password}
                  onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
                  className="col-span-3 glass-input"
                  placeholder="Contraseña inicial"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddCustomer}
                disabled={adding || !newCustomer.name || !newCustomer.email || !newCustomer.password}
                className="glass-button flex-1"
              >
                {adding ? 'Agregando...' : 'Agregar Cliente'}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="glass-button flex-1 text-white">
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal para buscar cliente */}
        <Dialog open={openSearch} onOpenChange={setOpenSearch}>
          <DialogContent className="glass-card sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-white">Buscar Clientes</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-white">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="search" className="text-right text-white">Búsqueda</Label>
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="col-span-3 glass-input"
                  placeholder="Nombre, email o teléfono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="glass-button flex-1 text-white">
                  Cerrar
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

    </>
  )
}
