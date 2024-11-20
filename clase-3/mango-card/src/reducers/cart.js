export const ACTIONS = {
  ADD_TO_CART: Symbol(),
  REMOVE_FROM_CART: Symbol(),
  MODIFY_QUANTITY: Symbol()
}

export const cartReducer = (state, action) => {
  const { type, payload } = action
  const { product, quantity } = payload

  if (type === ACTIONS.ADD_TO_CART) {
    return [...state, { ...product, quantity: 1 }]
  }

  if (type === ACTIONS.REMOVE_FROM_CART) {
    return state.filter((cartProduct) => cartProduct.id !== product.id)
  }

  if (type === ACTIONS.MODIFY_QUANTITY) {
    if (quantity === 0) {
      return state.filter((cartProduct) => cartProduct.id !== product.id)
    }

    const index = state.findIndex((cartProduct) => cartProduct.id === product.id)
    if (index === -1) return state

    return state.with(index, { ...state[index], quantity })
  }

  return state
}