"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      const response = await fetch("/api/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const data = await response.json()
      console.log("Login success", data)
      localStorage.setItem("patientToken", data.token)
      toast.success("Login successful!")
      router.push("/patient/profile")
    } catch (error: any) {
      console.error("Login failed!", error.message)
      toast.error(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const isValid = user.email.length > 0 && user.password.length > 0
    setButtonDisabled(!isValid)
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">{loading ? "Processing..." : "Patient Login"}</h1>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>
          <Button type="submit" disabled={buttonDisabled || loading} className="w-full">
            {loading ? "Logging in..." : buttonDisabled ? "Fill All Fields" : "Login"}
          </Button>
        </form>
        <div className="text-center">
          <Link href="/patient/signup" className="text-blue-600 hover:underline">
            New user? Sign up here
          </Link>
        </div>
      </div>
    </div>
  )
}

