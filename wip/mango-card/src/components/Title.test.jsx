import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import { Title } from './Title'

describe('Title', () => {
  it('should render a default heading h3', async () => {
    render(<Title>title</Title>)

    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveTextContent('title')
  })

  it('should render a custom tag', async () => {
    render(<Title as='h2'>title2</Title>)

    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('title2')
  })
})