import { createContext, useCallback, useReducer } from "react";
import { cartReducer, ACTIONS as CART_ACTIONS } from "../reducers/cart";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const addToCart = useCallback((product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: { product } })
  }, [])

  const removeFromCart = useCallback((product) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: { product } })
  }, [])

  const modifyCartQuantity = useCallback((product, quantity) => {
    dispatch({ type: CART_ACTIONS.MODIFY_QUANTITY, payload: { product, quantity } })
  }, [])

  return (
    <CartContext value={{
      cart,
      addToCart,
      removeFromCart,
      modifyCartQuantity
    }}>
      {children}
    </CartContext>
  )
}