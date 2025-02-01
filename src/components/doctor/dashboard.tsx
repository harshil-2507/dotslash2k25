"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Users, UserCheck, CalendarIcon } from "lucide-react"
import { DoctorAppointments } from "./appointments"
import { PatientSummary } from "./patient-summary"
import axios from "axios"

interface DashboardData {
  totalPatients: number
  todayPatients: number
  todayAppointments: {
    total: number
    appointments: Array<{
      patientName: string
      type: string
      time: string
    }>
  }
}

export function DoctorDashboard() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("doctorToken") || "";
 // Assuming you store the JWT token in localStorage after login
        if (!token) {
          console.log("No token found, redirecting to login")
          router.push("/doctor/login") // Redirect to login if no token is found
          return
        }
        console.log("token generated")
        const response = await axios.get("/api/doctor/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setData(response.data)
      } catch (error) {
        console.log(error)
        console.error("Failed to fetch dashboard data:", error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem("token")
          router.push("/doctor/login")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

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
              <h3 className="text-2xl font-bold">{data?.totalPatients || 0}</h3>
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
              <h3 className="text-2xl font-bold">{data?.todayPatients || 0}</h3>
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
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
              <h3 className="text-2xl font-bold">{data?.todayAppointments.total || 0}</h3>
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PatientSummary appointments={data?.todayAppointments.appointments} />
        <DoctorAppointments appointments={data?.todayAppointments.appointments} />
      </div>
    </div>
  )
}