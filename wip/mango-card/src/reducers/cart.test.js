import { describe, it, expect } from 'vitest'
import { cartReducer, ACTIONS } from './cart'

describe('Cart reducer', () => {
  it('should add a product to the cart', () => {
    const initialState = []

    const action = {
      type: ACTIONS.ADD_TO_CART,
      payload: {
        product: {
          id: 1,
          title: 'Mango',
          img: 'mango.png'
        }
      }
    }

    const newState = cartReducer(initialState, action)
  
    expect(newState).toEqual([
      {
        id: 1,
        title: 'Mango',
        img: 'mango.png',
        quantity: 1
      }
    ])
  })

  it('should remove a product from the cart', () => {
    const initialState = [
      {
        id: 1,
        title: 'Mango',
        img: 'mango.png',
        quantity: 1
      }
    ]

    const action = {
      type: ACTIONS.REMOVE_FROM_CART,
      payload: {
        product: {
          id: 1
        }
      }
    }

    const newState = cartReducer(initialState, action)

    expect(newState).toEqual([])
  })

  it('should modify the quantity of a product in the cart', () => {
    const initialState = [
      {
        id: 1,
        title: 'Mango',
        img: 'mango.png',
        quantity: 1
      }
    ]

    const action = {
      type: ACTIONS.MODIFY_QUANTITY,
      payload: {
        product: {
          id: 1
        },
        quantity: 2
      }
    }

    const newState = cartReducer(initialState, action)

    expect(newState).toEqual([
      {
        id: 1,
        title: 'Mango',
        img: 'mango.png',
        quantity: 2
      }
    ])
  })
})