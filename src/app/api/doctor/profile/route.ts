import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/db" // Assume this function connects to your database

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    const db = await connectToDatabase()

    // Fetch dashboard data from database
    const totalPatients = await db.collection("patients").countDocuments()
    const todayPatients = await db.collection("patients").countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    })
    const todayAppointments = await db
      .collection("appointments")
      .find({
        date: { $gte: new Date().setHours(0, 0, 0, 0) },
      })
      .toArray()

    res.status(200).json({
      totalPatients,
      todayPatients,
      todayAppointments: {
        total: todayAppointments.length,
        appointments: todayAppointments.map((apt) => ({
          patientName: apt.patientName,
          type: apt.type,
          time: apt.time,
        })),
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    res.status(401).json({ message: "Invalid token" })
  }
}