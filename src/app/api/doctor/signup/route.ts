import { connect } from "@/app/dbConfig/dbConfig"
import Doctor  from "@/models/doctorModel"
import { type NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    // Input validation
    if (!username || !email || !password) {
      console.log("invalid input");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("error ocuured in email formating")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Password strength check (example: at least 8 characters)
    if (password.length < 8) {
      console.log("error occured due to password length")
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Check if the user already exists
    const existingUser = await Doctor.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      console.log("User with this email or username already exists");
      return NextResponse.json({ error: "User with this email or username already exists" }, { status: 400 })
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Create new user
    const newUser = new Doctor({
      username,
      email,
      password: hashedPassword,
    })

    // Save the user
    const savedUser = await newUser.save()

    // Remove password from the response
    const userResponse = savedUser.toObject()
    delete userResponse.password

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}

