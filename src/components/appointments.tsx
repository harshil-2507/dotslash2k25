"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Appointment {
  time: string
  createdAt: string
  updatedAt: string
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem("patientToken")
      if (!token) {
        throw new Error("No token found")
      }

      console.log("Fetching appointments...")
      const response = await fetch("/api/patient/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.log("response is not ok",errorData)
        throw new Error(`Failed to fetch appointments: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      console.log("Appointments data:", data)
      setAppointments(data.appointments)
    } catch (error) {
      console.log(error)
      console.error("Error fetching appointments:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <div>
            <p className="text-red-500 mb-2">{error}</p>
            <Button onClick={fetchAppointments}>Retry</Button>
          </div>
        ) : appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium">
                  {new Date(appointment.time).toLocaleDateString()} at{" "}
                  {new Date(appointment.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
               
                <p className="text-xs text-gray-500">
                  Scheduled on: {new Date(appointment.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming appointments</p>
        )}
      </CardContent>
    </Card>
  )
}

