import { MangoCard } from "./MangoCard";

export function Products({ loadingProducts, products }) {
  return (
    <>
      {
        loadingProducts && <span>Loading...</span>
      }

      {
        products.map(({ id, title, images }) => (
          <MangoCard
            key={id}
            id={id}
            name={title}
            img={images[0]}
          />
          )
        )
      }
    </>
  )
}