import { use, memo } from "react"
import { UserContext } from "../contexts/user"
import { useCart } from "../hooks/use-cart"

function CartComponent () {
  const { isLogged } = use(UserContext)
  const {
    cart,
    handleModifyQuantity,
    handleRemoveFromCart
  } = useCart()

  if (!isLogged) return null

  return (
    <aside style={{
        position: 'fixed',
        top: 0, right: 0,
        width: '300px', height: '100vh',
        background: '#eee',
        color: 'black'
      }}>
      <h2>Carrito 🛒</h2>
      {
        cart.map(({ id, name, img, quantity }) => (
          <article key={id}>
            <div>
              <img src={img} alt={name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              <h4>{name}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', alignContent: 'center' }}>
              <button onClick={() => handleModifyQuantity({ id }, quantity - 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleModifyQuantity({ id }, quantity + 1)}>+</button>
              <button onClick={() => handleRemoveFromCart({ id })}>Remove</button>
            </div>
          </article>
          
        ))
      }
    </aside>
  )
}

export const Cart = memo(CartComponent)