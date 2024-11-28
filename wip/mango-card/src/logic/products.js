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

let favs = new Set()

export const favoriteProduct = async ({id}) => {
  // wait 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000))
  throw new Error('Error al marcar como favorito')

  if (favs.has(id)) {
    favs.delete(id)
  } else {
    favs.add(id)
  }

  return favs.has(id)

  // return fetch(`https://dummyjson.com/products/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Access-Key': import.meta.env.VITE_PUBLIC_API_KEY
  //   },
  //   body: JSON.stringify({ isFavorite: true })
  // })
}