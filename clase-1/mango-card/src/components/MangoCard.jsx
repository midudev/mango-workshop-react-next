import { useState } from "react" 

export function MangoCard({ img, id, name }) {
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    setAdded(!added)
  }

  const buttonText = added ? "Quitar del carrito" : "Añadir al carrito"

  return (
    <article className="mango-card">
      <img
        className="mango-card__img"
        src={img}
        alt="Chico con jersey marrón"
      />

      <h4>{id} - {name}</h4>

      <button onClick={handleClick}>
        {buttonText}
      </button>
    </article>
  )
}