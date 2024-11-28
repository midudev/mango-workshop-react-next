import { useState, useOptimistic } from "react"
import { toggleFav } from "../logic/products"
import { toast } from 'sonner'

export const EmptyHeart = () => (
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
)

export const FullHeart = () => (
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>
)

export const Fav = ({ id }) => {
  const [isFav, setIsFav] = useState(false)
  const [isOptimisticFav, setIsOptimisticFav] = useOptimistic(isFav)

  const actionFav = async () => {
    setIsOptimisticFav(!isFav)

    try {
      const isFav = await toggleFav({ id })
      setIsFav(isFav)
    } catch (error) {
      toast.error('Error al intentar guardar el favorito en el servidor')
    }
  }

  return (
    <form action={actionFav}>
      <button style={
        { background: 'transparent', position: 'absolute', top: 0, right: 0 }
      }>
        {isOptimisticFav ? <FullHeart /> : <EmptyHeart />}
      </button>
    </form>
  )
}