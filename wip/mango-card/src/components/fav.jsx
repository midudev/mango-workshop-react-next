import { useOptimistic, useState } from "react"
import { favoriteProduct } from "../logic/products"
import { toast }  from 'sonner'

const EmptyHeart = () => (
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
)

const FullHeart = () => (
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>
)

export function Fav({ id }) {
  const [isFav, setIsFav] = useState(false);
  const [isOptimisticFav, setOptimisticFav] = useOptimistic(isFav);

  const favAction = async () => {
    setOptimisticFav(!isFav)
    try {
      const isFav = await favoriteProduct({ id })
      setIsFav(isFav)
    } catch (err) {
      console.error(err)
      toast.error('No se pudo guardar el cambio en favoritos')
    }
  }

  return (
    <form action={favAction}>
      <button>
        {isOptimisticFav ? <FullHeart /> : <EmptyHeart />}
      </button>
    </form>
  )
}