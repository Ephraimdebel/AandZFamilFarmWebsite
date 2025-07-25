"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useOrder } from "../../../contexts/OrderContext"
import { Button } from "../../components/admin/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
import { Alert, AlertDescription } from "../../components/admin/ui/alert"
import { CreditCard, Lock, Shield, ArrowLeft } from "lucide-react"
import { formatCardNumber, validateCardNumber, validateExpiryDate, validateCVV, formatDate } from "../../../lib/utils"

export default function PaymentPage() {
  const { user } = useAuth()
  const { currentOrder, submitReservation } = useOrder()
  const navigate = useNavigate()

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    zipCode: "",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardData((prev) => ({ ...prev, cardNumber: formatted }))
      if (errors.cardNumber) {
        setErrors((prev) => ({ ...prev, cardNumber: "" }))
      }
    }
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4)
    }
    setCardData((prev) => ({ ...prev, expiryDate: value }))
    if (errors.expiryDate) {
      setErrors((prev) => ({ ...prev, expiryDate: "" }))
    }
  }

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4)
    setCardData((prev) => ({ ...prev, cvv: value }))
    if (errors.cvv) {
      setErrors((prev) => ({ ...prev, cvv: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
    }

    if (!validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid card number"
    }

    if (!validateExpiryDate(cardData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date"
    }

    if (!validateCVV(cardData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    if (!cardData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsProcessing(true)

    try {
      const result = await submitReservation(cardData)

      if (result.success) {
        navigate("/success")
      } else {
        setErrors({ submit: result.error })
      }
    } catch {
      setErrors({ submit: "Payment processing failed. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }

  // Redirect if no order data
  if (!currentOrder.animal || !currentOrder.size || !currentOrder.date) {
    navigate("/order")
    return null
  }

  const animals = { lamb: "Lamb", goat: "Goat" }
  const sizes = { medium: "Medium (25-35 lbs)", large: "Large (35-50 lbs)" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/order")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Order
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Complete Your Reservation</h1>
          <p className="text-gray-600">Secure your order with a $100 reservation payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  <CardTitle className="text-xl">Secure Payment</CardTitle>
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 mr-1" />
                  SSL Encrypted & Secure
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      type="text"
                      placeholder="John Doe"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                      className={errors.cardholderName ? "border-red-500" : ""}
                    />
                    {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        className={`secure-input pl-10 ${errors.cardNumber ? "border-red-500" : ""}`}
                        maxLength={19}
                      />
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                    {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleExpiryChange}
                        className={`secure-input ${errors.expiryDate ? "border-red-500" : ""}`}
                        maxLength={5}
                      />
                      {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCVVChange}
                        className={`secure-input ${errors.cvv ? "border-red-500" : ""}`}
                        maxLength={4}
                      />
                      {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="12345"
                      value={cardData.zipCode}
                      onChange={(e) => setCardData((prev) => ({ ...prev, zipCode: e.target.value }))}
                      className={errors.zipCode ? "border-red-500" : ""}
                    />
                    {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                  </div>

                  {errors.submit && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.submit}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      "Pay $100.00 - Reserve Now"
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-xs text-center text-muted-foreground">
                  <p>Your payment information is encrypted and secure.</p>
                  <p>We never store your card details.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="shadow-lg border-0 sticky top-8">
              <CardHeader>
                <CardTitle>Reservation Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Reservation Payment</h3>
                  <p className="text-3xl font-bold text-primary">$100.00</p>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Customer:</span>
                    <span>{user?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Animal:</span>
                    <span>{animals[currentOrder.animal]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Size:</span>
                    <span>{sizes[currentOrder.size]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Pickup Date:</span>
                    <span>{formatDate(currentOrder.date)}</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Next Steps</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Your reservation will be confirmed immediately</li>
                    <li>• We'll contact you 24-48 hours before pickup</li>
                    <li>• Final pricing based on actual weight</li>
                    <li>
                      • Call{" "}
                      <a href="tel:240-441-3923" className="font-semibold underline">
                        (240) 441-3923
                      </a>{" "}
                      for questions
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
