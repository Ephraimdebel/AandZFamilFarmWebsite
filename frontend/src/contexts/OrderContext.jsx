"use client"

import { createContext, useContext, useState } from "react"
import {publicAxios} from "../../utils/axios/index"
const OrderContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}

export function OrderProvider({ children }) {
  const [currentOrder, setCurrentOrder] = useState({
    animal: "",
    size: "",
    quantity: 1,
    date: "",
    customerName: "",
    customerPhone: "",
    reservationFee: 0,
  })

  const updateOrder = (orderData) => {
    setCurrentOrder((prev) => ({ ...prev, ...orderData }))
  }

  const resetOrder = () => {
    setCurrentOrder({
      animal: "",
      size: "",
      quantity: 1,
      date: "",
      customerName: "",
      customerPhone: "",
      reservationFee: 0,
    })
  }

  const submitOrder = async (finalOrder) => {
    try {
      const orderData = {
        customer: finalOrder.customerName,
        phone: finalOrder.customerPhone,
        animal: finalOrder.animal,
        quantity: finalOrder.quantity,
        size: finalOrder.size,
        selectedDate: finalOrder.date,
        reservationFee: finalOrder.reservationFee,
        status: "pending",
        paymentStatus: "unpaid",
        notes: "",
      }
      const response = await publicAxios.post('/order',orderData)
      return { success: true, order: response }
    } catch (error) {
      console.error("Error submitting order:", error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    currentOrder,
    updateOrder,
    resetOrder,
    submitOrder,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
