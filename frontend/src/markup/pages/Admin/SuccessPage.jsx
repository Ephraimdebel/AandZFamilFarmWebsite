"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useOrder } from "../../../contexts/OrderContext"
import { Button } from "../../components/admin/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { CheckCircle, Phone, Calendar, User } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default function SuccessPage() {
  const { user } = useAuth()
  const { currentOrder, resetOrder } = useOrder()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if no reservation was made
    if (!currentOrder.animal || !currentOrder.size || !currentOrder.date) {
      navigate("/order")
    }
  }, [currentOrder, navigate])

  const handleNewOrder = () => {
    resetOrder()
    navigate("/order")
  }

  const animals = { lamb: "Lamb", goat: "Goat" }
  const sizes = { medium: "Medium (25-35 lbs)", large: "Large (35-50 lbs)" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border-0">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600 mb-2">Reservation Confirmed!</CardTitle>
          <p className="text-gray-600 text-lg">Thank you for your reservation with A&Z Family Farm</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Reservation Details */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Reservation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-700">Customer:</p>
                <p className="text-green-600">{user?.name}</p>
              </div>
              <div>
                <p className="font-medium text-green-700">Email:</p>
                <p className="text-green-600">{user?.email}</p>
              </div>
              <div>
                <p className="font-medium text-green-700">Animal:</p>
                <p className="text-green-600">{animals[currentOrder.animal]}</p>
              </div>
              <div>
                <p className="font-medium text-green-700">Size:</p>
                <p className="text-green-600">{sizes[currentOrder.size]}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-medium text-green-700">Pickup Date:</p>
                <p className="text-green-600">{formatDate(currentOrder.date)}</p>
              </div>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">Payment Confirmed</h3>
            <div className="flex justify-between items-center">
              <span className="text-blue-700">Reservation Payment:</span>
              <span className="text-2xl font-bold text-blue-800">$100.00</span>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              Payment processed successfully. You will receive an email confirmation shortly.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              What Happens Next?
            </h3>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>We'll contact you 24-48 hours before your pickup date to confirm details</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Your animal will be prepared fresh according to your specifications</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Final pricing will be calculated based on the actual weight</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>Payment of the remaining balance is due at pickup</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-primary mb-3 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Need to Contact Us?
            </h3>
            <div className="text-center">
              <p className="text-gray-700 mb-2">For questions about pricing or to modify your reservation:</p>
              <a href="tel:240-441-3923" className="text-2xl font-bold text-primary hover:underline">
                (240) 441-3923
              </a>
              <p className="text-sm text-gray-600 mt-2">Available Monday - Saturday, 8:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={handleNewOrder} className="flex-1">
              Make Another Reservation
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="flex-1">
              Print Confirmation
            </Button>
          </div>

          {/* Footer Message */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Thank you for choosing A&Z Family Farm!</p>
            <p>We look forward to serving you with the finest quality farm-fresh products.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
