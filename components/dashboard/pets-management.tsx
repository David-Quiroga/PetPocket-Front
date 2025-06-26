"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Eye, FileText, Heart, Calendar, User } from "lucide-react"

interface Pet {
  id: number
  name: string
  age: number
  owner: string
  status: string
  species: string
  breed: string
  medicalHistory: string[]
}

const initialPets: Pet[] = [
  {
    id: 1,
    name: "Max",
    age: 3,
    owner: "María González",
    status: "Saludable",
    species: "Perro",
    breed: "Golden Retriever",
    medicalHistory: ["Vacunación completa - 2024", "Desparasitación - Enero 2024", "Chequeo general - Febrero 2024"],
  },
  {
    id: 2,
    name: "Luna",
    age: 2,
    owner: "María González",
    status: "En tratamiento",
    species: "Gato",
    breed: "Persa",
    medicalHistory: ["Vacunación - 2024", "Tratamiento dermatológico - Marzo 2024"],
  },
  {
    id: 3,
    name: "Rocky",
    age: 5,
    owner: "Carlos Rodríguez",
    status: "Saludable",
    species: "Perro",
    breed: "Pastor Alemán",
    medicalHistory: ["Cirugía menor - 2023", "Vacunación completa - 2024"],
  },
]

export function PetsManagement() {
  const [pets, setPets] = useState<Pet[]>(initialPets)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [viewMode, setViewMode] = useState<"add" | "edit" | "view" | "history">("add")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    owner: "",
    status: "",
    species: "",
    breed: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (viewMode === "edit" && selectedPet) {
      setPets(
        pets.map((pet) =>
          pet.id === selectedPet.id ? { ...pet, ...formData, age: Number.parseInt(formData.age) } : pet,
        ),
      )
    } else {
      const newPet: Pet = {
        id: Date.now(),
        ...formData,
        age: Number.parseInt(formData.age),
        medicalHistory: [],
      }
      setPets([...pets, newPet])
    }

    resetForm()
  }

  const handleEdit = (pet: Pet) => {
    setSelectedPet(pet)
    setFormData({
      name: pet.name,
      age: pet.age.toString(),
      owner: pet.owner,
      status: pet.status,
      species: pet.species,
      breed: pet.breed,
    })
    setViewMode("edit")
    setIsDialogOpen(true)
  }

  const handleView = (pet: Pet) => {
    setSelectedPet(pet)
    setViewMode("view")
    setIsDialogOpen(true)
  }

  const handleViewHistory = (pet: Pet) => {
    setSelectedPet(pet)
    setViewMode("history")
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({ name: "", age: "", owner: "", status: "", species: "", breed: "" })
    setSelectedPet(null)
    setViewMode("add")
    setIsDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Saludable":
        return "bg-green-100 text-green-800"
      case "En tratamiento":
        return "bg-yellow-100 text-yellow-800"
      case "Crítico":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Mascotas</h1>
          <p className="text-gray-600 mt-1">Administra la información de las mascotas</p>
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
              Agregar Mascota
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {viewMode === "add"
                  ? "Nueva Mascota"
                  : viewMode === "edit"
                    ? "Editar Mascota"
                    : viewMode === "view"
                      ? `Información de ${selectedPet?.name}`
                      : `Historial Médico de ${selectedPet?.name}`}
              </DialogTitle>
            </DialogHeader>

            {viewMode === "view" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nombre</Label>
                    <p className="font-semibold text-gray-900">{selectedPet?.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Edad</Label>
                    <p className="font-semibold text-gray-900">{selectedPet?.age} años</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Especie</Label>
                    <p className="font-semibold text-gray-900">{selectedPet?.species}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Raza</Label>
                    <p className="font-semibold text-gray-900">{selectedPet?.breed}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Propietario</Label>
                    <p className="font-semibold text-gray-900">{selectedPet?.owner}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Estado</Label>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedPet?.status || "")}`}
                    >
                      {selectedPet?.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : viewMode === "history" ? (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900">{selectedPet?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedPet?.species} - {selectedPet?.breed}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Historial Médico:</h4>
                  {selectedPet?.medicalHistory.length ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedPet.medicalHistory.map((record, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-blue-800 text-sm">{record}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No hay registros médicos</p>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Mascota</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ingrese el nombre"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad (años)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="species">Especie</Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) => setFormData({ ...formData, species: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Perro">Perro</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Ave">Ave</SelectItem>
                        <SelectItem value="Conejo">Conejo</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breed">Raza</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    placeholder="Ingrese la raza"
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

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Saludable">Saludable</SelectItem>
                      <SelectItem value="En tratamiento">En tratamiento</SelectItem>
                      <SelectItem value="Crítico">Crítico</SelectItem>
                      <SelectItem value="Recuperándose">Recuperándose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    {viewMode === "edit" ? "Actualizar" : "Crear Mascota"}
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
        {pets.map((pet) => (
          <Card
            key={pet.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-orange-500 fill-current" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                <p className="text-sm text-gray-600">
                  {pet.species} - {pet.breed}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{pet.age} años</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-orange-500" />
                  <span>{pet.owner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pet.status)}`}>
                    {pet.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(pet)}
                  className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(pet)}
                  className="flex-1 hover:bg-green-50 hover:border-green-300"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleViewHistory(pet)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
