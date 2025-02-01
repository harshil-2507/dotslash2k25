import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Patient health dashboard",
}

export default function DashboardPage() {
  return <DashboardShell />
}

