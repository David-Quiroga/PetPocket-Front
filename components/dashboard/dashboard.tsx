"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHome } from "./dashboard-home"
import { UsersManagement } from "./users-management"
import { ServicesManagement } from "./services-management"
import { OwnersManagement } from "./owners-management"
import { PetsManagement } from "./pets-management"
import { ProductsManagement } from "./products-management"
import { AppointmentsManagement } from "./appointments-management"
import { VeterinaryList } from "./veterinary-list"
import { BillingManagement } from "./billing-management"

interface DashboardProps {
  onLogout: () => void
  selectedVeterinary: string | null
  onBackToVeterinaryList: () => void
}

export function Dashboard({ onLogout, selectedVeterinary, onBackToVeterinaryList }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome onSectionChange={setActiveSection} />
      case "veterinarias":
        return <VeterinaryList onVeterinarySelect={() => {}} onLogout={onBackToVeterinaryList} />
      case "usuarios":
        return <UsersManagement />
      case "servicios":
        return <ServicesManagement />
      case "propietarios":
        return <OwnersManagement />
      case "mascotas":
        return <PetsManagement />
      case "productos":
        return <ProductsManagement />
      case "citas":
        return <AppointmentsManagement />
      case "facturacion":
        return <BillingManagement />
      default:
        return <DashboardHome onSectionChange={setActiveSection} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
        onBackToVeterinaryList={onBackToVeterinaryList}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  )
}
