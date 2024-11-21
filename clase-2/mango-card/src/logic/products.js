export const getProducts = (limit = 30, skip = 0) => {
  return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=id,title,images,category`)
    .then(res => res.json())
    .then(response => {
      const { products, total } = response;
      return {
        products: products.map(product => {
          const { id, title, images, category } = product;
          return { id, title, images, category };
        }),
        total
      }
    })
}