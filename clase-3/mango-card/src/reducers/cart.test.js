import { expect, test } from 'vitest'
import { ACTIONS, cartReducer } from './cart'

test('should return the initial state', () => {
  const state = cartReducer([], {})
  expect(state).toEqual([])
})

test('should add a product to the cart', () => {
  const state = cartReducer([], {
    type: ACTIONS.ADD_TO_CART,
    payload: { product: { id: 1, quantity: 1 } }
  })

  expect(state).toEqual([{ id: 1, quantity: 1 }])
})

test('should remove a product from the cart', () => {
  const state = cartReducer([{ id: 1, quantity: 1 }], {
    type: ACTIONS.REMOVE_FROM_CART,
    payload: { product: { id: 1 } }
  })

  expect(state).toEqual([])
})

test('should modify the quantity of a product in the cart', () => {
  const state = cartReducer([{ id: 1, quantity: 2 }], {
    type: ACTIONS.MODIFY_QUANTITY,
    payload: { product: { id: 1 }, quantity: 3 }
  })

  expect(state).toEqual([{ id: 1, quantity: 3 }])
})