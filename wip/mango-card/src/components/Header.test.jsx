import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Header } from './Header'
import { useUser } from '../hooks/use-user'

// Mock del hook useUser con Vitest
vi.mock('../hooks/use-user')

describe('Header', () => {
  it('should display the title, login button, and product count when logged out', () => {
    // Configurar el mock para el estado deslogueado
    useUser.mockReturnValue({
      isLogged: false,
      login: vi.fn(),
      logout: vi.fn()
    })

    const products = [{ id: 1 }, { id: 2 }, { id: 3 }]
    render(<Header products={products} />)

    // Verificar el título
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Mango Card')

    // Verificar el botón de inicio de sesión
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveStyle({ backgroundColor: '#09f' })

    // Verificar el número de productos
    expect(screen.getByText('Número de productos: 3')).toBeInTheDocument()
  })

  it('should display the title, logout button, and product count when logged in', async () => {
    // Configurar el mock para el estado logueado
    const mockLogout = vi.fn()
    useUser.mockReturnValue({
      isLogged: true,
      login: vi.fn(),
      logout: mockLogout
    })

    const products = [{ id: 1 }, { id: 2 }]
    render(<Header products={products} />)

    // Verificar el título
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Mango Card')

    // Verificar el botón de cierre de sesión
    const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i })
    expect(logoutButton).toBeInTheDocument()
    expect(logoutButton).toHaveStyle({ backgroundColor: 'black' })

    // Simular clic en el botón de cerrar sesión
    await userEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()

    // Verificar el número de productos
    expect(screen.getByText('Número de productos: 2')).toBeInTheDocument()
  })
})
