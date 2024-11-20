import { memo } from "react"
import { useUser } from "../hooks/use-user"

function MangoCardComponent({ added, img, id, name, addToCart, removeFromCart }) {
  const user = useUser()

  const buttonText = added ? "Quitar del carrito" : "Añadir al carrito"
  
  const handleClick = () => {
    return added
      ? removeFromCart({ id })
      : addToCart({ id, img, name })
  }

  return (
    <article className="mango-card">
      <picture>
        <img
          className="mango-card__img"
          src={img}
          alt="Chico con jersey marrón"
          style={{ objectFit: 'contain', width: '200px', height: '200px' }} 
        />
      </picture>

      <h4>{id} - {name}</h4>

      <button disabled={!user.isLogged} onClick={handleClick}>
        {buttonText}
      </button>
    </article>
  )
}

export const MangoCard = memo(MangoCardComponent)