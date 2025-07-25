// import { clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs) {
//   return twMerge(clsx(inputs))
// }

// export function formatPrice(price) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(price)
// }

// export function validateCardNumber(number) {
//   const cleaned = number.replace(/\s/g, "")
//   return /^\d{16}$/.test(cleaned)
// }

// export function validateCVV(cvv) {
//   return /^\d{3,4}$/.test(cvv)
// }

// export function validateExpiryDate(expiry) {
//   const [month, year] = expiry.split("/")
//   if (!month || !year) return false

//   const currentDate = new Date()
//   const currentYear = currentDate.getFullYear() % 100
//   const currentMonth = currentDate.getMonth() + 1

//   const expMonth = Number.parseInt(month)
//   const expYear = Number.parseInt(year)

//   if (expMonth < 1 || expMonth > 12) return false
//   if (expYear < currentYear) return false
//   if (expYear === currentYear && expMonth < currentMonth) return false

//   return true
// }


import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatCardNumber(value) {
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

export function validateCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s/g, "")
  return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned)
}

export function validateExpiryDate(expiry) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!regex.test(expiry)) return false

  const [month, year] = expiry.split("/")
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const expYear = Number.parseInt(year, 10)
  const expMonth = Number.parseInt(month, 10)

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false
  }

  return true
}

export function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}
