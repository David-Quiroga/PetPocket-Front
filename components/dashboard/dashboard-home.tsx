"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, DollarSign, TrendingUp, Syringe, Package, Sparkles } from "lucide-react"

const stats = [
  { title: "Total de Citas", value: "156", icon: Calendar, color: "bg-blue-500" },
  { title: "Nuevos Pacientes", value: "23", icon: Users, color: "bg-green-500" },
  { title: "Ganancias", value: "$12,450", icon: DollarSign, color: "bg-orange-500" },
  { title: "Crecimiento", value: "+15%", icon: TrendingUp, color: "bg-purple-500" },
]

const recentServices = [
  { service: "Vacunas", count: 45, icon: Syringe, color: "text-blue-500" },
  { service: "Cirugía", count: 12, icon: Package, color: "text-red-500" },
  { service: "Productos", count: 89, icon: Package, color: "text-green-500" },
  { service: "Aseo", count: 34, icon: Sparkles, color: "text-purple-500" },
]

interface DashboardHomeProps {
  onSectionChange: (section: string) => void
}

export function DashboardHome({ onSectionChange }: DashboardHomeProps) {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PET POCKET - Veterinaria</h1>
          <p className="text-gray-600 mt-1">Panel de control principal</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Hoy</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString("es-ES")}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Services */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Atenciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <service.icon className={`w-5 h-5 ${service.color}`} />
                    <span className="font-medium text-gray-900">{service.service}</span>
                  </div>
                  <span className="text-lg font-bold text-orange-500">{service.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onSectionChange("citas")}
                className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Calendar className="w-8 h-8 mx-auto mb-3 relative z-10 group-hover:animate-bounce" />
                <span className="text-sm font-semibold relative z-10">Nueva Cita</span>
                <div className="text-xs mt-1 opacity-90 relative z-10">Programar consulta</div>
              </button>

              <button
                onClick={() => onSectionChange("propietarios")}
                className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Users className="w-8 h-8 mx-auto mb-3 relative z-10 group-hover:animate-bounce" />
                <span className="text-sm font-semibold relative z-10">Nuevo Cliente</span>
                <div className="text-xs mt-1 opacity-90 relative z-10">Registrar propietario</div>
              </button>

              <button
                onClick={() => onSectionChange("productos")}
                className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Package className="w-8 h-8 mx-auto mb-3 relative z-10 group-hover:animate-bounce" />
                <span className="text-sm font-semibold relative z-10">Inventario</span>
                <div className="text-xs mt-1 opacity-90 relative z-10">Gestionar productos</div>
              </button>

              <button
                onClick={() => onSectionChange("servicios")}
                className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Syringe className="w-8 h-8 mx-auto mb-3 relative z-10 group-hover:animate-bounce" />
                <span className="text-sm font-semibold relative z-10">Vacunas</span>
                <div className="text-xs mt-1 opacity-90 relative z-10">Programa vacunación</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
