import { memo } from "react"
import { useUser } from "../hooks/use-user"

function MangoCardComponent({ img, id, name, handleAddToCart, handleRemoveFromCart, added }) {
  const {isLogged} = useUser()

  const handleClick = () => {
    if (added) {
      handleRemoveFromCart({ id, name, img })
    } else {
      handleAddToCart({ id, name, img })
    }
  }

  const buttonText = added ? "Quitar del carrito" : "Añadir al carrito"

  return (
    <article className="mango-card">
      <picture>
        <img
          className="mango-card__img"
          src={img}
          alt="Chico con jersey marrón"
          style={{ aspectRatio: '1/1' }}
        />
      </picture>

      <h4>{id} - {name}</h4>

    {isLogged && (
      <button onClick={handleClick}>
        {buttonText}
      </button>
    )}
    </article>
  )
}

export const MangoCard = memo(MangoCardComponent)