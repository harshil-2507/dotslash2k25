"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignupPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/patient/signup", user)
      console.log("Signup success!", response.data)
      toast.success("Signup successful!")
      router.push("/patient/login")
    } catch (error: any) {
      console.error("Signup failed!", error.response?.data || error.message)
      toast.error(error.response?.data?.error || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const isValid = user.email.length > 0 && user.password.length > 0 && user.username.length > 0
    setButtonDisabled(!isValid)
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="m-4 text-2xl font-bold">{loading ? "Processing..." : "Sign Up"}</h1>
      <hr className="w-1/4 mb-4" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSignUp()
        }}
        className="w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-gray-900 text-black border-zinc-500"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-gray-900 text-black border-zinc-500"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-gray-900 text-black border-zinc-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={buttonDisabled || loading}
          className={`w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${
            buttonDisabled || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:border-gray-600"
          }`}
        >
          {loading ? "Signing Up..." : buttonDisabled ? "Fill All Fields" : "Sign Up"}
        </button>
      </form>
      <Link href="/login" className="mt-4 text-blue-400 hover:underline">
        Already have an account? Login here
      </Link>
    </div>
  )
}

