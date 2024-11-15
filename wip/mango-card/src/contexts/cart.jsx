import { createContext, useCallback, useMemo, useReducer } from "react";

const ACTIONS = {
  ADD_TO_CART: Symbol(),
  MODIFY_QUANTITY: Symbol(),
  REMOVE_FROM_CART: Symbol()
}

const cartReducer = (state, { type, payload }) => {
  const { product, quantity } = payload

  if (type === ACTIONS.ADD_TO_CART) {
    console.log({ product })
    return [...state, { ...product, quantity: 1 }]
  }

  if (type === ACTIONS.MODIFY_QUANTITY) {
    const index = state.findIndex((cartProduct) => cartProduct.id === product.id)
    if (index === -1) return state

    if (quantity === 0) {
      return state.filter((cartProduct) => cartProduct.id !== product.id)
    }

    return state.with(index, { ...state[index], quantity })
  }

  if (type === ACTIONS.REMOVE_FROM_CART) {
    return state.filter((cartProduct) => cartProduct.id !== product.id)
  }
  
  return state
}

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const handleAddToCart = useMemo(() => (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: { product } })
  }, [])

  const handleModifyQuantity = useCallback((product, quantity) => {
    dispatch({ type: ACTIONS.MODIFY_QUANTITY, payload: { product, quantity }})
  }, [])

  const handleRemoveFromCart = useCallback((product) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { product }})
  }, [])

  return (
    <CartContext value={{
      handleAddToCart, handleModifyQuantity, handleRemoveFromCart, cart
    }}>{children}</CartContext>
  )
}