export type Product = {
  id: number,
  title: string,
  images: string[],
  category: string,
  price: number,
}

export type ProductDetail = Product & {
  description: string
}

type ApiResponseGetAll = {
  products: Product[]
}

type ApiResponseCategories = Array<{ slug: string, name: string }>

export const getCategories = () => {
  return fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(response => {
      return response as ApiResponseCategories
    })
}

export const getProductsByCategory = async (category: string) => {
  // delay 1s
  await new Promise(resolve => setTimeout(resolve, 1000))

  return fetch(`https://dummyjson.com/products/category/${category}`)
    .then(res => res.json())
    .then(response => {
      const { products } = response as ApiResponseGetAll
      // get random two elements from array
      products.sort(() => Math.random() - 0.5)
      products.splice(2)
      
      return products.map(product => {
        const { id, title, images, category, price } = product
        return { id, title, images, category, price }
      })
    })
}

export const getProducts = ({ query }: { query?: string } = {}) => {
  const url = query
    ? `https://dummyjson.com/products/search?q=${query}`
    : 'https://dummyjson.com/products'

  return fetch(url)
    .then(res => res.json())
    .then(response => {
      const { products } = response as ApiResponseGetAll
      return products.map(product => {
        const { id, title, images, category, price } = product
        return { id, title, images, category, price }
      })
    })
}

export const getProduct = (id: number) => {
  return fetch(`https://dummyjson.com/products/${id}`, {
    cache: 'force-cache'
  })
    .then(res => res.json())
    .then(response => {
      if (response.id === undefined) return undefined
      return response as ProductDetail
    })
}

const favs = new Set()

export const toggleFav = async ({ id }: { id: number }) => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  await delay(1000) // esperar el tiempo

  throw new Error('Error')

  if (favs.has(id)) {
    favs.delete(id)
    return false
  }

  favs.add(id)
  return true
}