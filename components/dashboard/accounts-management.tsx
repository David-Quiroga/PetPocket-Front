"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, User, Shield, Bell, Database } from "lucide-react"

export function AccountsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuentas</h1>
          <p className="text-gray-600 mt-1">Administra la configuración del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              Perfil de Usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gestiona la información de tu perfil personal</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Cambiar información personal</p>
              <p>• Actualizar foto de perfil</p>
              <p>• Modificar contraseña</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Configuración de seguridad y privacidad</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Autenticación de dos factores</p>
              <p>• Historial de sesiones</p>
              <p>• Permisos de acceso</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Personaliza tus preferencias de notificación</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Notificaciones por email</p>
              <p>• Alertas del sistema</p>
              <p>• Recordatorios de citas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              Respaldo de Datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gestiona copias de seguridad de la información</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Respaldo automático</p>
              <p>• Exportar datos</p>
              <p>• Restaurar información</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-orange-500" />
            Configuración General del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Información de la Clínica</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Nombre:</span> Veterinaria San Martín
                </p>
                <p>
                  <span className="font-medium">Dirección:</span> Av. Principal 123, Centro
                </p>
                <p>
                  <span className="font-medium">Teléfono:</span> +1 234-567-8900
                </p>
                <p>
                  <span className="font-medium">Email:</span> info@veterinariasanmartin.com
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Configuración del Sistema</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Versión:</span> Pet Pocket v1.0
                </p>
                <p>
                  <span className="font-medium">Última actualización:</span> 15/03/2024
                </p>
                <p>
                  <span className="font-medium">Base de datos:</span> Conectada
                </p>
                <p>
                  <span className="font-medium">Estado:</span> <span className="text-green-600">Operativo</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
