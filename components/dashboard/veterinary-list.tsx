"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Phone, Clock, Star, LogOut, Heart } from "lucide-react"

const veterinaries = [
  {
    id: 1,
    name: "PET POCKET",
    address: "Av. Principal 123, Centro",
    phone: "+1 234-567-8900",
    hours: "Lun-Vie: 8:00-18:00, Sáb: 8:00-14:00",
    rating: 4.8,
    services: ["Consultas", "Cirugía", "Emergencias", "Peluquería"],
    status: "Activa",
  },
  {
    id: 2,
    name: "Clínica Veterinaria Los Andes",
    address: "Calle 45 #67-89, Norte",
    phone: "+1 234-567-8901",
    hours: "Lun-Dom: 24 horas",
    rating: 4.9,
    services: ["Emergencias 24h", "Hospitalización", "Laboratorio"],
    status: "Activa",
  },
  {
    id: 3,
    name: "Pet Care Center",
    address: "Carrera 12 #34-56, Sur",
    phone: "+1 234-567-8902",
    hours: "Lun-Vie: 7:00-19:00",
    rating: 4.7,
    services: ["Consultas", "Vacunación", "Peluquería", "Hotel"],
    status: "Activa",
  },
]

interface VeterinaryListProps {
  onVeterinarySelect: (vet: string) => void
  onLogout: () => void
}

export function VeterinaryList({ onVeterinarySelect, onLogout }: VeterinaryListProps) {
  return (
    <div className="min-h-screen p-6">
      {/* Header con logout */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg shadow-lg animate-pulse hover:animate-bounce transition-all duration-300">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              PET POCKET
            </h1>
            <p className="text-gray-600">Sistema Veterinario</p>
          </div>
        </div>

        <Button
          onClick={onLogout}
          className="flex items-center gap-3 px-6 py-3 text-gray-700 bg-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group relative overflow-hidden border border-gray-300"
        >
          <LogOut className="w-5 h-5 group-hover:animate-bounce" />
          <span className="font-medium relative z-10">Cerrar Sesión</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Selecciona tu Veterinaria</h2>
          <p className="text-gray-600 mt-2">Elige tu clínica veterinaria para acceder al sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {veterinaries.map((vet) => (
            <Card
              key={vet.id}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${vet.name === "PET POCKET" ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-blue-500"}`}
                    >
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{vet.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{vet.rating}</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            vet.status === "Activa" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {vet.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{vet.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{vet.phone}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{vet.hours}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Servicios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vet.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => onVeterinarySelect(vet.name)}
                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden group ${
                      vet.name === "PET POCKET"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    }`}
                  >
                    <span className="relative z-10">
                      {vet.name === "PET POCKET" ? "🏥 Acceder a mi Veterinaria" : "Seleccionar Veterinaria"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Statistics */}
        <Card className="border-0 shadow-lg max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 text-center">Estadísticas de la Red</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 p-3 rounded-full mx-auto mb-3 w-fit">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{veterinaries.length}</p>
                <p className="text-sm text-gray-600">Veterinarias</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="bg-green-500 p-3 rounded-full mx-auto mb-3 w-fit">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {(veterinaries.reduce((sum, vet) => sum + vet.rating, 0) / veterinaries.length).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Rating Promedio</p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="bg-orange-500 p-3 rounded-full mx-auto mb-3 w-fit">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-orange-600">1</p>
                <p className="text-sm text-gray-600">24 Horas</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="bg-purple-500 p-3 rounded-full mx-auto mb-3 w-fit">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {veterinaries.filter((vet) => vet.status === "Activa").length}
                </p>
                <p className="text-sm text-gray-600">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
