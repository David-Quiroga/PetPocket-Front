"use client"

import {
  Home,
  Users,
  Stethoscope,
  UserCheck,
  Heart,
  Package,
  Calendar,
  CreditCard,
  LogOut,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
  onBackToVeterinaryList: () => void
}

const menuItems = [
  { id: "dashboard", label: "Home / Dashboard", icon: Home },
  { id: "usuarios", label: "Usuarios", icon: Users },
  { id: "servicios", label: "Servicios", icon: Stethoscope },
  { id: "propietarios", label: "Propietarios", icon: UserCheck },
  { id: "mascotas", label: "Mascotas", icon: Heart },
  { id: "productos", label: "Medicinas y Productos", icon: Package },
  { id: "facturacion", label: "Facturación", icon: CreditCard },
  { id: "citas", label: "Citas", icon: Calendar },
]

export function Sidebar({ activeSection, onSectionChange, onLogout, onBackToVeterinaryList }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl border-r border-gray-700">
      <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-lg animate-pulse hover:animate-bounce transition-all duration-300">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              PET POCKET
            </h1>
            <p className="text-xs text-gray-400 animate-pulse">Sistema Veterinario</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 group relative overflow-hidden ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105 shadow-orange-500/25"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white hover:transform hover:scale-105 hover:shadow-lg"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-all duration-300 ${activeSection === item.id ? "animate-pulse" : "group-hover:animate-bounce"}`}
                />
                <span className="font-medium text-sm relative z-10">{item.label}</span>
                {activeSection !== item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <Button
          onClick={onBackToVeterinaryList}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group relative overflow-hidden border-0"
        >
          <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
          <span className="font-medium relative z-10">Cambiar Veterinaria</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>

        <Button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group relative overflow-hidden border-0"
        >
          <LogOut className="w-5 h-5 group-hover:animate-bounce" />
          <span className="font-medium relative z-10">Cerrar Sesión</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>
      </div>
    </div>
  )
}
