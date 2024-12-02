import { useMemo, useState } from 'react'
import './App.css'

import { Header } from './components/header'
import { CATEGORIES } from './consts/categories'
import { Products } from './components/products'
import { Filters } from './components/filters'
import { Cart } from './components/cart'
import { getProducts } from './logic/products'

function App({ products, search }) {
  const [filterCategory, setFilterCategory] = useState(() => {
    const params = new URLSearchParams(search)
    return params.get('filterCategory') ?? CATEGORIES[0]
  })

  const filteredProducts = useMemo(() => products.filter(product => {
    if (filterCategory === 'all') return true

    const { category } = product
    return category === filterCategory
  }), [products, filterCategory])

  const title = `Mango App - ${filteredProducts.length} productos`

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

      <Products products={filteredProducts} />

      <Cart />
    </>
  )
}

export const getServerSideProps = async () => {
  const products = await getProducts()
  return { props: { products } }
}

export default App
