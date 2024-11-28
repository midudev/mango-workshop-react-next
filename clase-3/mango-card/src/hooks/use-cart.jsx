import { use } from "react"
import { CartContext } from "../contexts/cart-context"

export const useCart = () => {
  const cartContext = use(CartContext) // consumiendo el contexto CartContext

  if (cartContext == null) {
    throw new Error('useCart must be used within a CartContextProvider')
  }

  return cartContext
}