"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, UserCheck, Phone, Mail } from "lucide-react"

interface Owner {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  pets: string[]
}

const initialOwners: Owner[] = [
  {
    id: 1,
    name: "María González",
    email: "maria@email.com",
    phone: "+1 234-567-8901",
    avatar: "/placeholder.svg?height=60&width=60",
    pets: ["Max (Perro)", "Luna (Gato)"],
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "+1 234-567-8902",
    avatar: "/placeholder.svg?height=60&width=60",
    pets: ["Rocky (Perro)"],
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana@email.com",
    phone: "+1 234-567-8903",
    avatar: "/placeholder.svg?height=60&width=60",
    pets: ["Mimi (Gato)", "Coco (Loro)"],
  },
]

export function OwnersManagement() {
  const [owners, setOwners] = useState<Owner[]>(initialOwners)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null)
  const [viewMode, setViewMode] = useState<"add" | "edit" | "view" | "pets">("add")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (viewMode === "edit" && selectedOwner) {
      setOwners(owners.map((owner) => (owner.id === selectedOwner.id ? { ...owner, ...formData } : owner)))
    } else {
      const newOwner: Owner = {
        id: Date.now(),
        ...formData,
        avatar: "/placeholder.svg?height=60&width=60",
        pets: [],
      }
      setOwners([...owners, newOwner])
    }

    resetForm()
  }

  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner)
    setFormData({
      name: owner.name,
      email: owner.email,
      phone: owner.phone,
    })
    setViewMode("edit")
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setOwners(owners.filter((owner) => owner.id !== id))
  }

  const handleViewPets = (owner: Owner) => {
    setSelectedOwner(owner)
    setViewMode("pets")
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "" })
    setSelectedOwner(null)
    setViewMode("add")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Propietarios</h1>
          <p className="text-gray-600 mt-1">Administra la información de los dueños de mascotas</p>
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
              Agregar Propietario
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {viewMode === "add"
                  ? "Nuevo Propietario"
                  : viewMode === "edit"
                    ? "Editar Propietario"
                    : viewMode === "pets"
                      ? `Mascotas de ${selectedOwner?.name}`
                      : "Propietario"}
              </DialogTitle>
            </DialogHeader>

            {viewMode === "pets" ? (
              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={selectedOwner?.avatar || "/placeholder.svg"}
                    alt={selectedOwner?.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <h3 className="font-semibold text-gray-900">{selectedOwner?.name}</h3>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Mascotas registradas:</h4>
                  {selectedOwner?.pets.length ? (
                    <div className="space-y-2">
                      {selectedOwner.pets.map((pet, index) => (
                        <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="font-medium text-orange-800">{pet}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No hay mascotas registradas</p>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ingrese el nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="propietario@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Número de Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234-567-8900"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    {viewMode === "edit" ? "Actualizar" : "Crear Propietario"}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {owners.map((owner) => (
          <Card
            key={owner.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <img
                  src={owner.avatar || "/placeholder.svg"}
                  alt={owner.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-orange-200"
                />
                <h3 className="text-lg font-bold text-gray-900">{owner.name}</h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>{owner.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>{owner.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserCheck className="w-4 h-4 text-orange-500" />
                  <span>{owner.pets.length} mascota(s)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(owner)}
                  className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(owner.id)}
                  className="flex-1 hover:bg-red-50 hover:border-red-300 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleViewPets(owner)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
