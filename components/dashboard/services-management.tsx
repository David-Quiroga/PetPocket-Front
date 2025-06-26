"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Stethoscope, Scissors, Syringe, Heart, Zap, Eye, Edit, Plus } from "lucide-react"

interface Service {
  id: number
  name: string
  description: string
  price: string
  icon: any
  color: string
  details: string
}

const initialServices: Service[] = [
  {
    id: 1,
    name: "Consulta General",
    description: "Examen médico completo para diagnóstico y seguimiento",
    price: "$25.00",
    icon: Stethoscope,
    color: "bg-blue-500",
    details:
      "Incluye examen físico completo, toma de signos vitales, evaluación del estado general de salud, recomendaciones preventivas y plan de tratamiento si es necesario.",
  },
  {
    id: 2,
    name: "Peluquería",
    description: "Servicios de aseo y estética para mascotas",
    price: "$15.00",
    icon: Scissors,
    color: "bg-pink-500",
    details:
      "Baño con productos especializados, corte de pelo según raza, limpieza de oídos, corte de uñas, cepillado dental básico y perfumado.",
  },
  {
    id: 3,
    name: "Vacunas",
    description: "Programa completo de vacunación preventiva",
    price: "$12.00",
    icon: Syringe,
    color: "bg-green-500",
    details:
      "Vacunas esenciales y opcionales según edad y especie, calendario de vacunación personalizado, certificado de vacunación y seguimiento post-vacunal.",
  },
  {
    id: 4,
    name: "Eutanasia",
    description: "Procedimiento humanitario con acompañamiento",
    price: "$50.00",
    icon: Heart,
    color: "bg-gray-500",
    details:
      "Procedimiento realizado con máxima compasión y profesionalismo, acompañamiento emocional a la familia, opciones de cremación y servicios funerarios.",
  },
  {
    id: 5,
    name: "Cirugía",
    description: "Procedimientos quirúrgicos especializados",
    price: "$150.00",
    icon: Zap,
    color: "bg-red-500",
    details:
      "Cirugías menores y mayores, esterilizaciones, extracciones, cirugías ortopédicas, anestesia segura y cuidados post-operatorios completos.",
  },
]

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    details: "",
  })

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.replace("$", ""),
      details: service.details,
    })
    setIsEditDialogOpen(true)
  }

  const handleView = (service: Service) => {
    setSelectedService(service)
    setIsViewDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingService(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      details: "",
    })
    setIsAddDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingService) {
      // Editar servicio existente
      setServices(
        services.map((service) =>
          service.id === editingService.id
            ? {
                ...service,
                name: formData.name,
                description: formData.description,
                price: `$${formData.price}`,
                details: formData.details,
              }
            : service,
        ),
      )
      setIsEditDialogOpen(false)
    } else {
      // Agregar nuevo servicio
      const newService: Service = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: `$${formData.price}`,
        details: formData.details,
        icon: Stethoscope, // Icono por defecto
        color: "bg-blue-500", // Color por defecto
      }
      setServices([...services, newService])
      setIsAddDialogOpen(false)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      details: "",
    })
    setEditingService(null)
  }

  const handleDelete = (serviceId: number) => {
    setServices(services.filter((service) => service.id !== serviceId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Servicios Veterinarios</h1>
          <p className="text-gray-600 mt-1">Gestiona los servicios disponibles en la clínica</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl active:scale-95 relative overflow-hidden group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:animate-spin" />
              <span className="relative z-10">Agregar Servicio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">Nuevo Servicio</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Servicio</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Consulta General"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción Corta</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción breve del servicio"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio (sin símbolo $)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="25.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Descripción Detallada</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Descripción completa del servicio, qué incluye, procedimientos, etc."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Crear Servicio
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${service.color}`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-orange-500">{service.price}</span>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mt-4">{service.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>

              <div className="flex gap-2">
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(service)}
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-md group relative overflow-hidden"
                    >
                      <Eye className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      <span className="relative z-10">Ver</span>
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                        <div className={`p-2 rounded-full ${selectedService?.color}`}>
                          {selectedService?.icon && <selectedService.icon className="w-5 h-5 text-white" />}
                        </div>
                        {selectedService?.name}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                        <span className="font-medium text-gray-700">Precio del servicio:</span>
                        <span className="text-2xl font-bold text-orange-500">{selectedService?.price}</span>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Descripción detallada:</h4>
                        <p className="text-gray-600 leading-relaxed">{selectedService?.details}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => handleEdit(service)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md group relative overflow-hidden"
                    >
                      <Edit className="w-4 h-4 mr-2 group-hover:animate-spin" />
                      <span className="relative z-10">Editar</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-gray-900">
                        Editar Servicio: {editingService?.name}
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Nombre del Servicio</Label>
                        <Input
                          id="edit-name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ej: Consulta General"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Descripción Corta</Label>
                        <Input
                          id="edit-description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Descripción breve del servicio"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-price">Precio (sin símbolo $)</Label>
                        <Input
                          id="edit-price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="25.00"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-details">Descripción Detallada</Label>
                        <Textarea
                          id="edit-details"
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          placeholder="Descripción completa del servicio"
                          className="min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Actualizar Servicio
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Botón de eliminar opcional */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(service.id)}
                className="w-full hover:bg-red-50 hover:border-red-300 text-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md group"
              >
                <span className="group-hover:animate-bounce">🗑️ Eliminar Servicio</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Estadísticas de Servicios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {services.map((service) => (
              <div key={service.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${service.color} mx-auto mb-2 w-fit`}>
                  <service.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">{service.name}</p>
                <p className="text-lg font-bold text-orange-500 mt-1">{Math.floor(Math.random() * 50) + 10}</p>
                <p className="text-xs text-gray-500">Este mes</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
