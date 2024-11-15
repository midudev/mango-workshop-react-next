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