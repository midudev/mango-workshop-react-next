import { getProducts } from '../logic/products'
import { useState, useEffect } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const limit = 30

  useEffect(() => {
    getProducts(limit, page * limit)
      .then(({products, total}) => {
        setProducts(products)
        setTotal(total)
      })
      .finally(() => setLoading(false))
  }, [page]);

  const nextPage = () => setPage(prevPage => prevPage + 1);
  const prevPage = () => setPage(prevPage => Math.max(prevPage - 1, 0));

  return { loading, products, nextPage, prevPage, page, limit, total };
}