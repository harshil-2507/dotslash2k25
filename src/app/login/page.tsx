"use client"

import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data)
      toast.success("Login successful!")
      router.push("/profile")
    } catch (error: any) {
      console.error("Login failed!", error.response?.data || error.message)
      toast.error(error.response?.data?.error || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const isValid = user.email.length > 0 && user.password.length > 0
    setButtonDisabled(!isValid)
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="m-4 text-2xl font-bold">{loading ? "Processing..." : "Login"}</h1>
      <hr className="w-1/4 mb-4" />
      <form onSubmit={onLogin} className="w-full max-w-md">
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
          {loading ? "Logging in..." : buttonDisabled ? "Fill All Fields" : "Login"}
        </button>
      </form>
      <Link href="/signup" className="mt-4 text-blue-400 hover:underline">
        New user? Sign up here
      </Link>
    </div>
  )
}

