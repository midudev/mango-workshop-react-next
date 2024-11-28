import { useCart } from "../hooks/use-cart"
import { useUser } from "../hooks/use-user"

export function Cart () {
  console.log('render cart')
  const { isLogged } = useUser()

  const {
    cart,
    removeFromCart,
    modifyCartQuantity
  } = useCart()

  if (!isLogged) return null

  return (
    <aside style={{
      position: 'fixed',
      right: 0,
      top: 0,
      background: '#eee',
      color: 'black',
      padding: '16px',
      height: '100vh',
      width: '200px'
    }}>
      <h2>Carrito 🛒</h2>
      {
        cart.map((product) => {
          return (
            <article key={product.id}>
              <div>
                <img src={product.img} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                <h4>{product.name}</h4>
              </div>

              <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => modifyCartQuantity(product, product.quantity - 1)}>
                  -
                </button>

                <span>{product.quantity}</span>
                
                <button onClick={() => modifyCartQuantity(product, product.quantity + 1)}>
                  +
                </button>
                
                <button onClick={() => removeFromCart(product)}>🗑️</button>
              </footer>
            </article>
          )
        })
      }
    </aside>
  )
}