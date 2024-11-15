import { use } from "react"
import { CartContext } from "../contexts/cart"

export const useCart = () => {
  const context = use(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}