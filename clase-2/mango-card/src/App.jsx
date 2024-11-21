import { useMemo, useState } from 'react'
import './App.css'

import { useProducts } from './hooks/use-products'
import { Header } from './components/header'
import { CATEGORIES } from './consts/categories'
import { Products } from './components/products'
import { Filters } from './components/filters'
import { Cart } from './components/cart'
import { Pagination } from './components/pagination'

function App() {
  const {
    loading: loadingProducts,
    products,
    page,
    prevPage,
    nextPage,
    limit,
    total,
  } = useProducts()

  const [filterCategory, setFilterCategory] = useState(CATEGORIES[0])

  const [toggle, setToggle] = useState(false)

  const filteredProducts = useMemo(() => products.filter(product => {
    console.log('filter product', product.id)

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

      <Pagination
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        limit={limit}
        total={total}
      />

      <Products
        loadingProducts={loadingProducts}
        products={filteredProducts}
      />

      <Pagination
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        limit={limit}
        total={total}
      />

      <Cart />
    </>
  )
}

export default App
