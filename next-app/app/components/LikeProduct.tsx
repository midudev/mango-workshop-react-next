'use client'

import { Button } from "@/components/ui/button";
import { HeartIcon, HeartHandshakeIcon  } from "lucide-react";
import { useOptimistic, useState } from "react";
import { toggleFav } from "../logic/products";

export const LikeProduct = ({ id }: { id: number }) => {
  const [like, addLike] = useState(false)
  const [optimisticLike, addOptimisticLike] = useOptimistic(like)

  const formAction = async (formData: FormData) => {
    const id = formData.get('id') as string
    addOptimisticLike(!like)
    try {
      const result = await toggleFav({ id: +id })
      addLike(result)
    } catch {}
  }

  const Icon = optimisticLike ? HeartHandshakeIcon : HeartIcon
  const color = optimisticLike ? 'red' : 'white'

  return (
    <form action={formAction}>
      <Button variant="outline" size="icon" className="flex-shrink-0">
        <input type="hidden" name="id" value={id} />
        <Icon color={color} className={`size-4 ${color}`} />
      </Button>
  </form>
  )
}