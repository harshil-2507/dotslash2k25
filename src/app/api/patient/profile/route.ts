import { type NextRequest, NextResponse } from "next/server"
import { connect } from "@/app/dbConfig/dbConfig"
import Patient from "@/models/patientModel" // Make sure this import is correct
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
  console.log("Appointments API called")

  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Missing or invalid token")
    return NextResponse.json({ error: "Missing or invalid token" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { email: string , username: string}
    console.log("Token decoded, email:", decoded.email)
console.log(decoded)
    await connect()
    console.log("Connected to database")

    const patient = await Patient.findOne({ username: decoded.username })
    if (!patient) {
      console.log("Patient not found")
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    console.log("Patient found:", patient.username)

    // Get today's date at midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Filter upcoming appointments (today and future)
    const upcomingAppointments = patient.appointments
      .filter((apt) => new Date(apt.time) >= today)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(0, 5) // Get only the next 5 appointments

    console.log("Upcoming appointments:", upcomingAppointments.length)

    return NextResponse.json({
      appointments: upcomingAppointments.map((apt) => ({
        time: apt.time,
        createdAt: apt.createdAt,
        updatedAt: apt.updatedAt,
      })),
    })
  } catch (error) {
    console.error("Error in appointments API:", error)
    return NextResponse.json({ error: "Invalid token or server error" }, { status: 401 })
  }
}

