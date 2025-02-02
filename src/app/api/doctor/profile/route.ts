import { type NextRequest, NextResponse } from "next/server"
import { connect } from "@/app/dbConfig/dbConfig"
import Doctor from "@/models/doctorModel"
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing or invalid token" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { email: string }
    await connect()

    const doctor = await Doctor.findOne({ email: decoded.email })
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    // Get today's date at midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Filter today's appointments
    const todayAppointments = doctor.appointments.filter((apt) => {
      const aptDate = new Date(apt.time)
      return aptDate >= today && aptDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
    })

    // Calculate total patients (assuming each appointment is a unique patient)
    const totalPatients = doctor.appointments.length

    // Calculate today's patients
    const todayPatients = todayAppointments.length

    return NextResponse.json({
      doctor: {
        username: doctor.username,
        email: doctor.email,
        isVerified: doctor.isVarified,
        isAdmin: doctor.isAdmin,
      },
      totalPatients,
      todayPatients,
      todayAppointments: {
        total: todayAppointments.length,
        appointments: todayAppointments.map((apt) => ({
          time: apt.time,
          createdAt: apt.createdAt,
          updatedAt: apt.updatedAt,
        })),
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

