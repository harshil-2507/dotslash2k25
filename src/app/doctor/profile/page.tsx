import type { Metadata } from "next"
import {DoctorDashboard} from "@/components/doctor/dashboard"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Patient health dashboard",
}

export default function DashboardPage() {
  return <DoctorDashboard />
}

