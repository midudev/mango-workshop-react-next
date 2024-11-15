import { useCart } from "../hooks/use-cart";
import { MangoCard } from "./MangoCard";

export function Products({ loadingProducts, products }) {
  const {handleAddToCart, handleRemoveFromCart, cart} = useCart()

  return (
    <>
      {
        loadingProducts && <span>Loading...</span>
      }

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))', gap: '1rem' }}>
      {
        products.map(({ id, title, images }) => (
          <MangoCard
            key={id}
            id={id}
            name={title}
            img={images[0]}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            added={cart.some(product => product.id === id)}
          />
          )
        )
      }
      </div>
    </>
  )
}