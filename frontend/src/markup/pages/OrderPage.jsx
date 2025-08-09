
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
import { useOrder } from "../../contexts/OrderContext"
import { Button } from "../components/admin/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/admin/ui/card"
import { Input } from "../components/admin/ui/input"
import { Label } from "../components/admin/ui/label"
import { Alert, AlertDescription } from "../components/admin/ui/alert"
import { LogOut, Leaf, Calendar, DollarSign, Plus, Minus } from "lucide-react"
import { formatDate } from "../../lib/utils"
import goat from '../../assets/template_asset/images/wool/cv-sheed5.png'
import lamb from '../../assets/template_asset/images/wool/cv-sheed2.png'
import Navbar from "../components/Navbar"


export default function OrderPage() {
  // const { user, logout } = useAuth()
  const {  updateOrder } = useOrder()
  const navigate = useNavigate()

  const [animal, setAnimal] = useState("")
  const [size, setSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState("")
  const [error, setError] = useState("")

  const animals = [
    { value: "lamb", label: "Lamb", image: lamb },
    { value: "goat", label: "Goat", image: goat },
  ]

  const sizes = [
    { value: "medium", label: "Medium", description: "25-35 lbs" },
    { value: "large", label: "Large", description: "35-50 lbs" },
  ]

  const reservationFee = 100
  const totalReservation = reservationFee * quantity

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!animal || !size || !date || quantity < 1) {
      setError("Please fill in all fields and select at least 1 animal")
      return
    }

    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      setError("Please select a future date")
      return
    }

    // Update order context
    updateOrder({
      animal,
      size,
      quantity,
      date,
      reservationFee: totalReservation,
    })

    // Navigate to payment page
    navigate("/contact-info")
  }

  const getTomorrowDate = () => {
    // setError(null)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10)) // Max 10 animals
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1)) // Min 1 animal
  }

    const scrollToSection = (sectionId) => {
    // Navigate to home page with section anchor
    navigate(`/#${sectionId}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
     

    <Navbar scrollToSection={scrollToSection} /> 
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reserve Your Animals</h2>
          <p className="text-gray-600">Select your preferred animals, quantity, size, and pickup date</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#07ADB1]" />
                  Make Your Reservation
                </CardTitle>
                <CardDescription>Fill out the form below to reserve your animals</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Animal Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Select Animal Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {animals.map((animalOption) => (
                        <div
                          key={animalOption.value}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            animal === animalOption.value
                              ? "border-[#07ADB1] bg-[#07ADB1]/10"
                              : "border-gray-200 hover:border-[#07ADB1]/50"
                          }`}
                          onClick={() => setAnimal(animalOption.value)}
                        >
                          <div className="text-center">
                            <img
                              src={animalOption.image || "/placeholder.svg"}
                              alt={animalOption.label}
                              className="w-10 h-10 mx-auto mb-3 rounded-lg object-cover"
                            />
                            <h3 className="font-semibold text-lg">{animalOption.label}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  {animal && (
                    <div className="space-y-3">
                      <Label className="text-base font-medium">
                        How many {animals.find((a) => a.value === animal)?.label.toLowerCase()}s do you want?
                      </Label>
                      <div className="flex items-center justify-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white bg-transparent"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#07ADB1]">{quantity}</div>
                          <div className="text-sm text-gray-600">
                            {quantity === 1
                              ? animals.find((a) => a.value === animal)?.label
                              : `${animals.find((a) => a.value === animal)?.label}s`}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={incrementQuantity}
                          disabled={quantity >= 10}
                          className="border-[#07ADB1] text-[#07ADB1] hover:bg-[#07ADB1] hover:text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 text-center">You can select up to 10 animals</p>
                    </div>
                  )}

                  {/* Size Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Select Size</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sizes.map((sizeOption) => (
                        <div
                          key={sizeOption.value}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            size === sizeOption.value
                              ? "border-[#07ADB1] bg-[#07ADB1]/10"
                              : "border-gray-200 hover:border-[#07ADB1]/50"
                          }`}
                          onClick={() => setSize(sizeOption.value)}
                        >
                          <div className="text-center">
                            <h3 className="font-semibold text-lg">{sizeOption.label}</h3>
                            <p className="text-sm text-gray-600">{sizeOption.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-base font-medium">
                      Preferred Pickup Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={getTomorrowDate()}
                      className="text-base focus:ring-[#07ADB1] focus:border-[#07ADB1]"
                    />
                    <p className="text-sm text-gray-500">Select when you'd like to pick up your order</p>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="bg-red-100 border-red-500 text-red-700">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* <Button type="submit" className="w-full text-lg py-6 bg-[#07ADB1] hover:bg-[#07ADB1]/90 text-white">
                    Continue to Payment (${totalReservation} Reservation)
                  </Button> */}
                  <Button type="submit" className="w-full text-lg py-6 bg-[#07ADB1] hover:bg-[#07ADB1]/90 text-white">
                    Continue to Contact Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-[#07ADB1]" />
                  Reservation Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-[#07ADB1]/10 p-4 rounded-lg border border-[#07ADB1]/20">
                  <h3 className="font-semibold text-[#07ADB1] mb-2">Reservation Fee</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      $100 × {quantity} animal{quantity > 1 ? "s" : ""}
                    </span>
                    <span className="text-2xl font-bold text-[#07ADB1]">${totalReservation}.00</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Secure your order with a reservation payment</p>
                </div>

                {animal && (
                  <div className="border-b pb-3">
                    <p className="font-medium">Animal: {animals.find((a) => a.value === animal)?.label}</p>
                    <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                  </div>
                )}

                {size && (
                  <div className="border-b pb-3">
                    <p className="font-medium">Size: {sizes.find((s) => s.value === size)?.label}</p>
                    <p className="text-sm text-gray-600">{sizes.find((s) => s.value === size)?.description}</p>
                  </div>
                )}

                {date && (
                  <div className="border-b pb-3">
                    <p className="font-medium">Pickup Date:</p>
                    <p className="text-sm text-gray-600">{formatDate(date)}</p>
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Note</h4>
                  <p className="text-sm text-yellow-700">
                    This is a reservation payment only. The full price will be determined based on the actual weight of
                    your animal{quantity > 1 ? "s" : ""}. Contact us at{" "}
                    <a href="tel:240-441-3923" className="font-semibold underline text-[#07ADB1]">
                      (240) 441-3923
                    </a>{" "}
                    for pricing details.
                  </p>
                </div>

                {(!animal || !size || !date) && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Complete the form to proceed with reservation
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

