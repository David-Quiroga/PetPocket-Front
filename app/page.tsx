"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Dashboard } from "@/components/dashboard/dashboard"
import { VeterinaryList } from "@/components/dashboard/veterinary-list"

export default function Page() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "veterinary-list" | "dashboard">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedVeterinary, setSelectedVeterinary] = useState<string | null>(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentView("veterinary-list") // Ir directo a lista de veterinarias
    setSelectedVeterinary(null)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView("login")
    setSelectedVeterinary(null)
  }

  const handleVeterinarySelect = (vet: string) => {
    setSelectedVeterinary(vet)
    if (vet === "PET POCKET") {
      setCurrentView("dashboard") // Solo mostrar dashboard si es PET POCKET
    }
  }

  const handleBackToVeterinaryList = () => {
    setCurrentView("veterinary-list")
    setSelectedVeterinary(null)
  }

  // Mostrar lista de veterinarias sin sidebar
  if (isAuthenticated && currentView === "veterinary-list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <VeterinaryList onVeterinarySelect={handleVeterinarySelect} onLogout={handleLogout} />
      </div>
    )
  }

  // Mostrar dashboard completo con sidebar solo para PET POCKET
  if (isAuthenticated && currentView === "dashboard" && selectedVeterinary === "PET POCKET") {
    return (
      <Dashboard
        onLogout={handleLogout}
        selectedVeterinary={selectedVeterinary}
        onBackToVeterinaryList={handleBackToVeterinaryList}
      />
    )
  }

  // Pantallas de autenticación
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      {currentView === "login" ? (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setCurrentView("register")} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setCurrentView("login")} />
      )}
    </div>
  )
}
