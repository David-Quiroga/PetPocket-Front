"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, Mail, Lock } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
  onSwitchToRegister: () => void
}

export function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
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
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-500 p-4 rounded-full shadow-lg animate-pulse hover:animate-bounce transition-all duration-300">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-orange-500 mb-2">PET POCKET</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              🐾Cuidar de ellos es tu misión.
              <br />
              Acompañarte, la nuestra🐾
            </p>
            <p className="text-orange-400 font-medium text-sm mt-2">
              Amamos a tu mascota ❤️
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="tu@email.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Recuérdame
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden group"
              >
                <span className="relative z-10">INGRESAR</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿No eres miembro?{" "}
                <button
                  onClick={onSwitchToRegister}
                  className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors"
                >
                  Click aquí para registrarse
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
