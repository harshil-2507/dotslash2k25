"use client"

import { useEffect, useState } from "react"

interface Appointment {
  time: string
  createdAt: string
  updatedAt: string
}

interface DashboardData {
  doctor: {
    username: string
    email: string
    isVerified: boolean
    isAdmin: boolean
  }
  totalPatients: number
  todayPatients: number
  todayAppointments: {
    total: number
    appointments: Appointment[]
  }
}

export function DoctorDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("doctorToken") || ""
        if (!token) {
          throw new Error("No token found")
        }

        const response = await fetch("/api/doctor/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }

        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
    }

    fetchDashboardData()
  }, [])

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Dr. {dashboardData.doctor.username}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Patients</h2>
          <p className="text-3xl font-bold">{dashboardData.totalPatients}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Today's Patients</h2>
          <p className="text-3xl font-bold">{dashboardData.todayPatients}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Today's Appointments</h2>
          <p className="text-3xl font-bold">{dashboardData.todayAppointments.total}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
        {dashboardData.todayAppointments.appointments.length > 0 ? (
          <ul className="bg-white rounded shadow divide-y">
            {dashboardData.todayAppointments.appointments.map((appointment, index) => (
              <li key={index} className="p-4">
                <p className="font-semibold">Appointment Time: {new Date(appointment.time).toLocaleTimeString()}</p>
                <p className="text-sm text-gray-600">Created: {new Date(appointment.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  Last Updated: {new Date(appointment.updatedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments scheduled for today.</p>
        )}
      </div>
    </div>
  )
}

