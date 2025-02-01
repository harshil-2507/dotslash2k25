import Link from "next/link"
import { Home, Calendar, PillIcon, FileText, Settings, HelpCircle } from "lucide-react"

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Medications", href: "/dashboard/medications", icon: PillIcon },
  { name: "Health Records", href: "/dashboard/records", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export default function DashboardNav() {
  return (
    <nav className="mt-5 px-2">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <item.icon className="mr-4 h-6 w-6" />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

