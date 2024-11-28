export const getProducts = () => {
  return fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(response => {
      const { products } = response
      return products.map(product => {
        const { id, title, images, category } = product
        return { id, title, images, category }
      })
    })
}

const favs = new Set()

let execution = 0

export const toggleFav = async ({ id }) => {
  const time = execution === 0 ? 2000 : 200
  execution++

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  await delay(time) // esperar el tiempo

  if (favs.has(id)) {
    favs.delete(id)
    return false
  }

  favs.add(id)
  return true
}