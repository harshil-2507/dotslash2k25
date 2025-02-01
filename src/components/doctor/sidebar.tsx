"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, CreditCard, User, Settings, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Payments", href: "/doctor/payments", icon: CreditCard },
  { name: "Profile", href: "/doctor/profile", icon: User },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
]

export function DoctorSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-16 w-16 rounded-full"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-01%20at%2011.26.00_375f55ca.jpg-pHizc6p8H6rxwyTLux0TdGnseLfRYs.jpeg"
            alt="Doctor profile"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">Dr. Martin Doe</h2>
            <p className="text-sm text-gray-500">Cardiologist</p>
          </div>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-400"}`} />
                {item.name}
              </Link>
            )
          })}
          <button className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}

