import { useContext } from "react"
import { CartContext } from "../contexts/cart-context"

export const useCart = () => {
  const cartContext = useContext(CartContext)

  if (cartContext == null) {
    throw new Error('useCart must be used within a CartContextProvider')
  }

  return cartContext
}