"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Eye, Calendar, Clock, DollarSign } from "lucide-react"

interface Appointment {
  id: number
  date: string
  time: string
  pet: string
  owner: string
  service: string
  total: number
  payment: string
  status: string
  details: string
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    date: "2024-03-15",
    time: "09:00",
    pet: "Max (Perro)",
    owner: "María González",
    service: "Consulta General",
    total: 25.0,
    payment: "Pagado",
    status: "Completada",
    details: "Chequeo rutinario. Mascota en buen estado de salud. Se recomienda próxima visita en 6 meses.",
  },
  {
    id: 2,
    date: "2024-03-16",
    time: "14:30",
    pet: "Luna (Gato)",
    owner: "María González",
    service: "Vacunación",
    total: 12.0,
    payment: "Pendiente",
    status: "Programada",
    details: "Vacuna antirrábica programada. Recordar ayuno de 4 horas antes del procedimiento.",
  },
  {
    id: 3,
    date: "2024-03-17",
    time: "11:00",
    pet: "Rocky (Perro)",
    owner: "Carlos Rodríguez",
    service: "Peluquería",
    total: 15.0,
    payment: "Pagado",
    status: "En Proceso",
    details: "Servicio de baño y corte. Incluye limpieza de oídos y corte de uñas.",
  },
]

export function AppointmentsManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [viewMode, setViewMode] = useState<"add" | "details">("add")
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    pet: "",
    owner: "",
    service: "",
    total: "",
    details: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAppointment: Appointment = {
      id: Date.now(),
      ...formData,
      total: Number.parseFloat(formData.total),
      payment: "Pendiente",
      status: "Programada",
    }
    setAppointments([...appointments, newAppointment])
    resetForm()
  }

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setViewMode("details")
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({ date: "", time: "", pet: "", owner: "", service: "", total: "", details: "" })
    setSelectedAppointment(null)
    setViewMode("add")
    setIsDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completada":
        return "bg-green-100 text-green-800"
      case "Programada":
        return "bg-blue-100 text-blue-800"
      case "En Proceso":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentColor = (payment: string) => {
    return payment === "Pagado" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600 mt-1">Administra las citas y consultas veterinarias</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setViewMode("add")
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Añadir Cita
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {viewMode === "add" ? "Nueva Cita" : `Detalles de Cita #${selectedAppointment?.id}`}
              </DialogTitle>
            </DialogHeader>

            {viewMode === "details" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Fecha</Label>
                    <p className="font-semibold text-gray-900">{selectedAppointment?.date}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Hora</Label>
                    <p className="font-semibold text-gray-900">{selectedAppointment?.time}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Mascota</Label>
                    <p className="font-semibold text-gray-900">{selectedAppointment?.pet}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Propietario</Label>
                    <p className="font-semibold text-gray-900">{selectedAppointment?.owner}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Servicio</Label>
                    <p className="font-semibold text-gray-900">{selectedAppointment?.service}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Total</Label>
                    <p className="font-semibold text-orange-500">${selectedAppointment?.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Estado</Label>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedAppointment?.status || "")}`}
                    >
                      {selectedAppointment?.status}
                    </span>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Pago</Label>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPaymentColor(selectedAppointment?.payment || "")}`}
                    >
                      {selectedAppointment?.payment}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Detalles</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedAppointment?.details}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet">Mascota</Label>
                  <Input
                    id="pet"
                    value={formData.pet}
                    onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
                    placeholder="Nombre y especie de la mascota"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Propietario</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    placeholder="Nombre del propietario"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Servicio</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consulta General">Consulta General</SelectItem>
                        <SelectItem value="Vacunación">Vacunación</SelectItem>
                        <SelectItem value="Peluquería">Peluquería</SelectItem>
                        <SelectItem value="Cirugía">Cirugía</SelectItem>
                        <SelectItem value="Emergencia">Emergencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total">Total ($)</Label>
                    <Input
                      id="total"
                      type="number"
                      step="0.01"
                      value={formData.total}
                      onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Detalles</Label>
                  <textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Detalles adicionales de la cita..."
                    className="w-full p-2 border border-gray-300 rounded-md resize-none h-20"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Crear Cita
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Lista de Citas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cita</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Mascota</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pago</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{appointment.service}</p>
                        <p className="text-sm text-gray-600">{appointment.owner}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="font-medium text-gray-900">{appointment.date}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{appointment.pet}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-orange-500" />
                        <span className="font-semibold text-orange-500">{appointment.total.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(appointment.payment)}`}
                      >
                        {appointment.payment}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(appointment)}
                        className="hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Citas</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-green-500">
                  {appointments.filter((a) => a.status === "Completada").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {appointments.filter((a) => a.status === "Programada").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-500">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-orange-500">
                  ${appointments.reduce((total, appointment) => total + appointment.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
