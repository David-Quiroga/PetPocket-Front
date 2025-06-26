"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, User, Mail, Lock } from "lucide-react"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    acceptTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registro:", formData)
    onSwitchToLogin()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl">

        {/* Imagen lado izquierdo */}
      <img 
  src="/mascota.png" 
  alt="Mascota" 
  className="w-150 h-auto object-contain" 
/>


        {/* Formulario */}
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm transform hover:scale-105 transition-all duration-500 animate-in slide-in-from-bottom-4">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-500 p-4 rounded-full shadow-lg">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-orange-500 mb-2">REGÍSTRATE</h1>
            <p className="text-gray-600 text-sm">Únete a la familia Pet Pocket</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
                    Nombre
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
                    Apellido
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Apellido"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmEmail" className="text-gray-700 font-medium">
                  Confirmar Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Confirma tu email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  Al hacer click en registrarse, acepta nuestros términos y condiciones de uso
                </Label>
              </div>

              <Button
                type="submit"
                disabled={!formData.acceptTerms}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:transform-none relative overflow-hidden group"
              >
                <span className="relative z-10">REGISTRARSE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={onSwitchToLogin}
                  className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors"
                >
                  Haz click aquí para iniciar sesión
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
