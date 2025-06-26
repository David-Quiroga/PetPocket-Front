"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, FileText, TrendingUp, Calendar } from "lucide-react"

export function BillingManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Facturación</h1>
          <p className="text-gray-600 mt-1">Gestión de facturación y pagos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos del Mes</p>
                <p className="text-2xl font-bold text-green-500">$3,450.00</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Facturas Emitidas</p>
                <p className="text-2xl font-bold text-blue-500">127</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pagos Pendientes</p>
                <p className="text-2xl font-bold text-orange-500">$890.00</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio Diario</p>
                <p className="text-2xl font-bold text-purple-500">$115.00</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Módulo de Facturación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="bg-orange-100 p-6 rounded-full mx-auto mb-6 w-fit">
              <CreditCard className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Módulo de Facturación en Desarrollo</h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              El sistema completo de facturación estará disponible próximamente. Incluirá generación automática de
              facturas, control de pagos, reportes financieros y integración con métodos de pago.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-800">Facturación Automática</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Reportes Financieros</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <CreditCard className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-800">Métodos de Pago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
