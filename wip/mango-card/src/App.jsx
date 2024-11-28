import { useMemo, useState } from 'react'
import './App.css'

import { useProducts } from './hooks/use-products'
import { Header } from './components/header'
import { CATEGORIES } from './consts/categories'
import { Products } from './components/products'
import { Filters } from './components/filters'
import { Cart } from './components/cart'

function App() {
  const {
    loading: loadingProducts,
    products
  } = useProducts()

  const [filterCategory, setFilterCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    return category ?? CATEGORIES[0]
  })

  const handleChangeCategory = (category) => {
    setFilterCategory(category)
    const params = new URLSearchParams(window.location.search)
    params.set('category', category)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const filteredProducts = useMemo(() => products.filter(product => {
    if (filterCategory === 'all') return true

    const { category } = product
    return category === filterCategory
  }), [products, filterCategory])

  return (
    <>
      <title>{`Mango - ${products.length} productos`}</title>
    
      <Header products={filteredProducts}>
        <Filters
          categories={CATEGORIES}
          onChangeCategoryFilter={handleChangeCategory} />
      </Header>

      <Products
        loadingProducts={loadingProducts}
        products={filteredProducts}
      />

      <Cart />
    </>
  )
}

export default App
