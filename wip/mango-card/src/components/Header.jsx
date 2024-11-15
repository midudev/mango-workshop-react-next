import { Title } from "./Title";
import { useUser } from "../hooks/use-user";

export function Header({ products, children }) {
  const { isLogged, login, logout } = useUser()

  return (
    <header>
      <Title as='h4' text='Mango Card' />
  
      {
        isLogged ? (
          <button onClick={logout} style={{ backgroundColor: 'black' }}>
            Cerrar sesión
          </button>
        ) : (
          <button onClick={login} style={{ backgroundColor: '#09f' }}>
            Iniciar sesión
          </button>
        )
      }

      <div>
        <small>Número de productos: {products.length}</small>
      </div>

      {children}
    </header>
  )
}