import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

import { useProducts } from './use-products'

describe('useProducts', () => {
  it('should return the loading state', () => {
    const { result } = renderHook(() => useProducts())
    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])
  })

  it('should return the products', async () => {
    const { result } = renderHook(() => useProducts())
    
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products.length).toEqual(30)
    expect(result.current.products[0].title).toEqual('Essence Mascara Lash Princess') 
  })
})