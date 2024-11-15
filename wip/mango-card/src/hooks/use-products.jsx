import { getProducts } from '../logic/products'
import { useState, useEffect } from 'react'

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