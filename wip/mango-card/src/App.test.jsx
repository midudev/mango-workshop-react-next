import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import { useState } from 'react'
import { expect, it, describe } from 'vitest'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

describe('Counter', () => {
  it('should increment the count', async () => {
    render(<Counter />)

    const button = screen.getByRole('button', { name: /increment/i })
    await userEvent.click(button)

    const count = screen.getByRole('heading')
    expect(count).toHaveTextContent('1')
  })
})