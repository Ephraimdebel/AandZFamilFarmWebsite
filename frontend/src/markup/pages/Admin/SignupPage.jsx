"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
import { Button } from "../../components/admin/ui/button"
import { Alert, AlertDescription } from "../../components/admin/ui/alert"
import Navbar from "../../components/Navbar"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "", // email or phone
    password: "",
    confirmPassword: "",
    role: 'user'
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone) => {
    // US phone number validation (10 digits)
    const regex = /^\d{10}$/
    return regex.test(phone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const { name, identifier, password, confirmPassword,role } = formData

    // Validate name
    if (!name.trim()) {
      setError("Full name is required")
      return
    }

    // Validate identifier (email or phone)
    let email = null
    let phone = null

    if (validateEmail(identifier)) {
      email = identifier
    } else if (validatePhone(identifier)) {
      phone = `+1${identifier}` // Add +1 prefix for US numbers
    } else {
      setError("Please enter a valid email or 10-digit phone number")
      return
    }

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const result = await signup(name, email, phone, password, role)
      if (result.success) {
        navigate("/order")
      } else {
        setError(result.error || "Signup failed")
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

    const scrollToSection = (sectionId) => {
    // Navigate to home page with section anchor
    navigate(`/#${sectionId}`);
  };
  return (
    <div>
      <Navbar scrollToSection={scrollToSection} /> 
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand mb-2">A&Z Family Farm</h1>
            <p className="text-gray-600">Fresh, Local, Quality Meats</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold text-gray-800">Create Account</CardTitle>
              <p className="text-gray-600 mt-2">Join our farm family today</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="identifier" className="text-gray-700">
                    Email or Phone Number
                  </Label>
                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="your@email.com or 5551234567"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter email or 10-digit US phone number (without +1)
                  </p>
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="mt-1"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-100 border-red-500 text-red-700">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-2.5"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-brand hover:text-brand/80 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
