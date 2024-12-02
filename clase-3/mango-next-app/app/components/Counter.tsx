'use client'

import { useState } from "react"

export const Counter = () => {
  console.log('COUNTER COMPONENT')

  const [counter, setCounter] = useState(0)

  const handleClick = async () => {
    setCounter(prevCounter => prevCounter + 1)
  }

  return (
    <>
      <button onClick={handleClick}>
        Comprar lo que sea. Total, es BlackFriday.
      </button>

      <span>
        {counter} cosas que no necesitas y has comprado porque estaban de oferta</span>
      </>
  )
}