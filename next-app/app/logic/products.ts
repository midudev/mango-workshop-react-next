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

export const getProducts = () => {
  return fetch('https://dummyjson.com/products')
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

let execution = 0

export const toggleFav = async ({ id }: { id: number }) => {
  const time = execution === 0 ? 2000 : 200
  execution++

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  await delay(time) // esperar el tiempo

  if (favs.has(id)) {
    favs.delete(id)
    return false
  }

  favs.add(id)
  return true
}