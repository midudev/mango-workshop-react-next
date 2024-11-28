import { getProducts } from '../logic/products'
import { useState, useEffect } from 'react'

export const handleLogin = ((setUserIsLogged) => {
  console.log('handleLogin')
  setUserIsLogged(true)
})

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(products => setProducts(products))
      .finally(() => setLoading(false))
  }, [])

  return { loading, products }
}