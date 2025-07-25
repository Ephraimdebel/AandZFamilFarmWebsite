"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Alert, AlertDescription } from "./ui/alert"
import { CreditCard, Lock, Shield } from "lucide-react"
import { validateCardNumber, validateCVV, validateExpiryDate } from "../../../lib/utils"

function SecureCardInput({ onPaymentSubmit, amount, paymentType }) {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleInputChange = (field, value) => {
    let formattedValue = value

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4)
    }

    setCardData((prev) => ({ ...prev, [field]: formattedValue }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
    }

    if (!validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number"
    }

    if (!validateExpiryDate(cardData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)"
    }

    if (!validateCVV(cardData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV (3-4 digits)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      await onPaymentSubmit(cardData)
    } catch {
      setErrors({ submit: "Payment processing failed. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }

  const paymentAmount = paymentType === "quarter" ? amount / 4 : amount

  return (
    <Card className="w-full max-w-md mx-auto">
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
        <div className="mb-4 p-3 bg-primary/10 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            {paymentType === "quarter" ? "Quarter Payment" : "Full Payment"}
          </p>
          <p className="text-2xl font-bold text-primary">${paymentAmount.toFixed(2)}</p>
          {paymentType === "quarter" && (
            <p className="text-xs text-muted-foreground mt-1">
              Remaining ${(amount - paymentAmount).toFixed(2)} due on delivery
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              type="text"
              placeholder="John Doe"
              value={cardData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
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
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className={`secure-input ${errors.cardNumber ? "border-red-500" : ""}`}
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
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
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
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
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                className={`secure-input ${errors.cvv ? "border-red-500" : ""}`}
                maxLength={4}
              />
              {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
            </div>
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
              `Pay $${paymentAmount.toFixed(2)}`
            )}
          </Button>
        </form>

        <div className="mt-4 text-xs text-center text-muted-foreground">
          <p>Your payment information is encrypted and secure.</p>
          <p>We never store your card details.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SecureCardInput
