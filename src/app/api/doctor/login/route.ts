import { connect } from "@/app/dbConfig/dbConfig"
import Doctor from "@/models/doctorModel"
import { type NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
  try {
    let reqBody
    try {
      reqBody = await request.json()
    } catch (error) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { email, password } = reqBody
    console.log("Request body:", reqBody)

    const user = await Doctor.findOne({ email })
    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }
    console.log("User found:", user)

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      console.log("Invalid password for user:", email)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }
    console.log("Password is valid")

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    })
    console.log("Token generated:", token)

    return NextResponse.json({
      message: "Login successful",
      success: true,
      token, // Send token in response body
    })
  } catch (error: any) {
    console.log(error.message)
    console.error("Error during login:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
