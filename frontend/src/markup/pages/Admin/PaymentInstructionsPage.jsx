"use client"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../../contexts/AuthContext"
import { useOrder } from "../../../contexts/OrderContext"
import { Button } from "../../components/admin/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/admin/ui/card"


import { CheckCircle, Phone, Smartphone, Copy, ArrowLeft, Leaf, Loader2 } from 'lucide-react'

import { Alert, AlertDescription } from "../../components/admin/ui/alert"
import Navbar from "../../components/Navbar"

export default function PaymentInstructionsPage() {
  // const { user, logout } = useAuth()
  const { currentOrder, resetOrder, submitOrder } = useOrder()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  // const [orderSubmitted, setOrderSubmitted] = useState(false)
  const submittedRef = useRef(false);

  useEffect(() => {
  if (!currentOrder.animal || !currentOrder.customerName || !currentOrder.customerPhone) {
    navigate("/order");
    return;
  }

  if (submittedRef.current) return; // Prevent double call
  submittedRef.current = true;

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitOrder(currentOrder);
      if (result.success) {
        // setOrderSubmitted(true);
        // console.log("Order submitted successfully:", result.order);
      } else {
        setSubmitError(result.error || "Failed to submit order");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.");
      console.error("Submit order error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  handleSubmitOrder();
}, [currentOrder, navigate, submitOrder]);

  const animals = { lamb: "Lamb", goat: "Goat" }
  const sizes = { medium: "Medium (25-35 lbs)", large: "Large (35-50 lbs)" }
  const sellerPhone = "(240) 441-3923"
  const sellerPhone2 = "(202) 262-8200"
  const zelleEmail = "+1 (240) 441 3923"

  const handleNewOrder = () => {
    resetOrder()
    // setOrderSubmitted(false)
    navigate("/order")
  }

  const handleBack = () => {
    navigate("/contact-info")
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }
   const scrollToSection = (sectionId) => {
    // Navigate to home page with section anchor
    navigate(`/#${sectionId}`);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#07ADB1] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Submitting Your Order...</h3>
            <p className="text-gray-600 text-center">Please wait while we process your reservation.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (submitError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8">
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
            <div className="flex gap-4">
              <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => window.location.reload()} className="flex-1 bg-[#07ADB1] hover:bg-[#069ca0]">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
       <Navbar scrollToSection={scrollToSection} /> 

      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Reservation Details Confirmed!</h2>
          <p className="text-gray-600 text-lg">
            Your order has been submitted successfully. Now secure your order with payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Summary */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#07ADB1]">Your Reservation</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{currentOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{currentOrder.customerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-[#07ADB1]/10 p-4 rounded-lg border border-[#07ADB1]/20">
                <h4 className="font-semibold text-[#07ADB1] mb-3">Order Details</h4>
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
                    <span className="font-bold text-[#07ADB1] text-lg">${currentOrder.reservationFee}.00</span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• This reservation secures your order</li>
                  <li>• Final pricing based on actual weight</li>
                  <li>• We'll contact you 24-48 hours before pickup</li>
                  <li>• Remaining balance due at pickup</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-[#07ADB1]">
                <Phone className="h-5 w-5 mr-2" />
                Need Help?
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-700 mb-4">Questions about your order? Contact us directly:</p>
                <div className="bg-[#07ADB1]/10 p-6 rounded-lg border border-[#07ADB1]/20">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <a href={`tel:${sellerPhone}`} className="text-2xl font-bold text-[#07ADB1] hover:underline">
                      {sellerPhone}
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(sellerPhone)}
                      className="border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <a href={`tel:${sellerPhone2}`} className="text-2xl font-bold text-[#07ADB1] hover:underline">
                      {sellerPhone2}
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(sellerPhone2)}
                      className="border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">Available Monday - Saturday, 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Options - Wide Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#07ADB1]">Complete Your Payment</CardTitle>
            <p className="text-gray-600">Choose your preferred payment method below</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Zelle Payment */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-4 flex items-center text-lg">
                <Smartphone className="h-6 w-6 mr-3" />
                Option 1: Pay with Zelle (Recommended)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded border text-center min-h-[100px] flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-2">Send to:</p>
                  <div className="flex flex-col items-center space-y-2">
                    <p className="font-medium text-blue-700 break-all text-sm">{zelleEmail}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(zelleEmail)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-5 rounded border text-center min-h-[100px] flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-2">Amount:</p>
                  <div className="flex flex-col items-center space-y-2">
                    <p className="font-bold text-blue-700 text-xl">${currentOrder.reservationFee}.00</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(`$${currentOrder.reservationFee}.00`)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-5 rounded border text-center min-h-[100px] flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-2">Memo/Note:</p>
                  <p className="font-medium text-blue-700 text-sm leading-tight">
                    {currentOrder.customerName} - {animals[currentOrder.animal]} Reservation
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Quick & Easy:</strong> Open your banking app, select Zelle, and send using the details above.
                </p>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="bg-[#07ADB1]/10 p-6 rounded-lg border border-[#07ADB1]/20">
              <h3 className="font-semibold text-[#07ADB1] mb-4 flex items-center text-lg">
                <Phone className="h-6 w-6 mr-3" />
                Option 2: Contact Seller Directly
              </h3>
              <div className="text-center">
                <p className="text-gray-700 mb-4">Call or text us to arrange payment:</p>
                <div className="bg-white p-6 rounded border inline-block min-w-[250px]">
                  <div className="flex items-center justify-center space-x-3">
                    <a href={`tel:${sellerPhone}`} className="text-2xl font-bold text-[#07ADB1] hover:underline">
                      {sellerPhone}
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(sellerPhone)}
                      className="border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">Available Monday - Saturday, 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-500 mt-1">We accept cash, check, or other payment arrangements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contact Info
          </Button>
          <Button onClick={handleNewOrder} className="flex-1 bg-[#07ADB1] hover:bg-[#07ADB1]/90 text-white">
            Make Another Reservation
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Thank You for Choosing A&Z Family Farm!</h3>
          <p className="text-gray-600">
            Once payment is received, your reservation will be confirmed. We look forward to serving you with the finest
            quality farm-fresh products.
          </p>
        </div>
      </div>
    </div>
  )
}

