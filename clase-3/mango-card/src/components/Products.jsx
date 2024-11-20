import { useCart } from "../hooks/use-cart";
import { MangoCard } from "./mango-card";

export function Products({ loadingProducts, products }) {
  const {
    cart,
    addToCart,
    removeFromCart,
  } = useCart()

  return (
    <>
      {
        loadingProducts && <span>Loading...</span>
      }

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))', gap: '1rem' }}>
      {
        products.map(({ id, title, images }) => (
          <MangoCard
            added={cart.some(({ id: cartId }) => cartId === id)}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            key={id}
            id={id}
            name={title}
            img={images[0]}
          />
          )
        )
      }
      </div>
    </>
  )
}