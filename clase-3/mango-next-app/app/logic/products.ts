type Product = {
  id: number
  title: string
  images: string[]
  category: string
  price: number
  description ?: string
}

type ApiResponse = {
  products: Product[]
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getProductsByCategory = async (category: string) => {
  const url = `https://dummyjson.com/products/category/${category}`
  await delay(2000)

  return fetch(url)
    .then(res => res.json())
    .then(response => {
      const { products } = response as ApiResponse

      products.sort(() => Math.random() - 0.5)
      products.splice(2)

      return products.map(product => {
        const { id, title, images, category, price } = product
        return { id, title, images, category, price }
      })
    })
}

export const getProducts = (search ?: string) => {
  const url = search
    ? `https://dummyjson.com/products/search?q=${search}`
    : 'https://dummyjson.com/products'

  return fetch(url)
    .then(res => res.json())
    .then(response => {
      const { products } = response as ApiResponse
      return products.map(product => {
        const { id, title, images, category, price } = product
        return { id, title, images, category, price }
      })
    })
}

export const getProduct = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (response.status === 404) {
    throw new Error("Product not found")
  }

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const json = await response.json()
  const product = json as Product
  
  return product
}

const favs = new Set()

let execution = 0

export const toggleFav = async ({ id }: { id: number }) => {
  const time = execution === 0 ? 2000 : 200
  execution++

  await delay(time) // esperar el tiempo

  if (favs.has(id)) {
    favs.delete(id)
    return false
  }

  favs.add(id)
  return true
}