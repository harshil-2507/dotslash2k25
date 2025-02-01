import { DoctorDashboard } from "@/components/doctor/dashboard"
import { DoctorLayout } from "@/components/doctor/layout"

export default function DoctorProfilePage() {
  return (
    <DoctorLayout>
      <DoctorDashboard />
    </DoctorLayout>
  )
}

