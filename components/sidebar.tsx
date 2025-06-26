"use client"

import { useState } from "react"
import { Home, Users, Car, MoreHorizontal, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Login", icon: LogIn, active: true },
  { name: "Home", icon: Home, active: false },
  { name: "Usuarios", icon: Users, active: false },
  { name: "Autos", icon: Car, active: false },
  { name: "Otras", icon: MoreHorizontal, active: false },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Login")

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  activeItem === item.name
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
