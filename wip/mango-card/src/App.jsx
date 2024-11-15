import { useMemo, useState } from 'react'
import './App.css'

import { useProducts } from './hooks/use-products.jsx'
import { Header } from './components/Header.jsx'
import { CATEGORIES } from './consts/categories.js'
import { Products } from './components/Products.jsx'
import { Filters } from './components/Filters.jsx'
import { Cart } from './components/Cart.jsx'

function App() {
  const {
    loading: loadingProducts,
    products
  } = useProducts()

  const [toggle, setToggle] = useState(false)
  const [filterCategory, setFilterCategory] = useState(CATEGORIES[0])

  const filteredProducts = useMemo(() => products.filter(product => {
    console.log({ filterCategory })
    if (filterCategory === 'all') return true

    const { category } = product
    return category === filterCategory
  }), [products, filterCategory])

  return (
    <>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <Header products={filteredProducts}>
        <Filters
          categories={CATEGORIES}
          onChangeCategoryFilter={setFilterCategory} />
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
