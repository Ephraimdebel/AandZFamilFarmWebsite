"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useOrder } from "../../../contexts/OrderContext"
import { Button } from "../../components/admin/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
import { Alert, AlertDescription } from "../../components/admin/ui/alert"
import { LogOut, Leaf, User, Phone, ArrowLeft } from 'lucide-react'
import Navbar from "../../components/Navbar"

export default function ContactInfoPage() {
  const { user } = useAuth()
  const { currentOrder, updateOrder } = useOrder()
  const navigate = useNavigate()

  const [customerName, setCustomerName] = useState(user?.name || "")
  const [customerPhone, setCustomerPhone] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Redirect if no order data
    if (!currentOrder.animal || !currentOrder.size || !currentOrder.date) {
      navigate("/order")
    }
  }, [currentOrder, navigate])

  const animals = { lamb: "Lamb", goat: "Goat" }
  const sizes = { medium: "Medium (25-35 lbs)", large: "Large (35-50 lbs)" }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!customerName.trim() || !customerPhone.trim()) {
      setError("Please fill in all fields")
      return
    }

    // Basic phone validation
    // const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = customerPhone.replace(/\D/g, "")
    if (cleanPhone.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    // Update order context
    updateOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
    })

    // Navigate to payment instructions
    navigate("/payment-instructions")
  }

  const handleBack = () => {
    navigate("/order")
  }

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "")
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setCustomerPhone(formattedPhoneNumber)
  }
      const scrollToSection = (sectionId) => {
    // Navigate to home page with section anchor
    navigate(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
     <Navbar scrollToSection={scrollToSection} /> 

      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Information</h2>
          <p className="text-gray-600">Please provide your contact details for the reservation</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-[#07ADB1]" />
              Your Details
            </CardTitle>
            <CardDescription>We'll use this information to contact you about your order</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-base font-medium">
                  Full Name
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="text-base focus:ring-[#07ADB1] focus:border-[#07ADB1]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone" className="text-base font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    className="text-base pl-10 focus:ring-[#07ADB1] focus:border-[#07ADB1]"
                    maxLength={14}
                  />
                </div>
                <p className="text-sm text-gray-500">We'll call or text you with updates about your order</p>
              </div>

              {/* Order Summary */}
              <div className="bg-[#07ADB1]/10 p-4 rounded-lg border border-[#07ADB1]/20">
                <h3 className="font-semibold text-[#07ADB1] mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Animal:</span>
                    <span className="font-medium">{animals[currentOrder.animal]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{currentOrder.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{sizes[currentOrder.size]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pickup Date:</span>
                    <span className="font-medium">
                      {new Date(currentOrder.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#07ADB1]/20">
                    <span className="font-semibold">Reservation Fee:</span>
                    <span className="font-bold text-[#07ADB1]">${currentOrder.reservationFee}.00</span>
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-100 border-red-500 text-red-700">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-[#07ADB1] hover:bg-[#07ADB1]/90 text-white">
                  Continue to Payment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
