import { Card } from "@/components/ui/card"
import { Users, UserCheck, CalendarIcon } from "lucide-react"
import { DoctorAppointments } from "./appointments"
import { DoctorStats } from "./stats"
import { PatientSummary } from "./patient-summary"

export function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <h3 className="text-2xl font-bold">2000+</h3>
              <p className="text-xs text-gray-500">Till Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today Patients</p>
              <h3 className="text-2xl font-bold">068</h3>
              <p className="text-xs text-gray-500">21 Dec 2021</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today Appointments</p>
              <h3 className="text-2xl font-bold">085</h3>
              <p className="text-xs text-gray-500">21 Dec 2021</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PatientSummary />
        <DoctorAppointments />
      </div>

      {/* <DoctorStats /> */}
    </div>
  )
}

