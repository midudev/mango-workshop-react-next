import { useState } from 'react'
import './App.css'

import { useProducts } from './hooks/use-products.jsx'
import { Header } from './components/Header.jsx'
import { CATEGORIES } from './consts/categories.js'
import { Products } from './components/Products.jsx'
import { Filters } from './components/Filters.jsx'

function App() {
  const {
    loading: loadingProducts,
    products
  } = useProducts()

  const [filterCategory, setFilterCategory] = useState(CATEGORIES[0])

  const filteredProducts = products.filter(product => {
    if (filterCategory === 'all') return true

    const { category } = product
    return category === filterCategory
  })

  return (
    <>
      <Header products={filteredProducts}>
        <Filters
          categories={CATEGORIES}
          onChangeCategoryFilter={setFilterCategory} />
      </Header>

      <Products
        loadingProducts={loadingProducts}
        products={filteredProducts}
      />
    </>
  )
}

export default App
