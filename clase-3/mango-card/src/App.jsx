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
    return params.get('filterCategory') ?? CATEGORIES[0]
  })

  const filteredProducts = useMemo(() => products.filter(product => {
    if (filterCategory === 'all') return true

    const { category } = product
    return category === filterCategory
  }), [products, filterCategory])

  const title = loadingProducts
    ? 'Cargando productos...'
    : `Mango App - ${filteredProducts.length} productos`

  const handleChangeCategoryFilter = (category) => {
    setFilterCategory(category)

    const params = new URLSearchParams(window.location.search)
    params.set('filterCategory', category)

    window.history.pushState(
      {}, '', `${window.location.pathname}?${params.toString()}`
    )
  }

  return (
    <>
      <title>{title}</title>
      <meta name='description' content={title} />
      <meta name='og:title' content={title} />
    
      <Header products={filteredProducts}>
        <Filters
          filterCategory={filterCategory}
          categories={CATEGORIES}
          onChangeCategoryFilter={handleChangeCategoryFilter} />
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
