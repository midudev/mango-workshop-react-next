import { Title } from "./title";
import { useUser } from "../hooks/use-user";

export function Header({ products, children }) {
  const { isLogged, login, logout } = useUser()

  return (
    <header data-testid="header">
      <Title as='h4' text='Mango Card' />
  
      <small>Número de productos: {products.length}</small>

      <div>
        {
          isLogged ? (
            <button data-test-id="logout" onClick={logout} style={{ background: 'black' }}> 
              Cerrar sesión
            </button>
          ) : (
            <button data-test-id="login" onClick={login} style={{ background: '#09f' }}>
              Iniciar sesión
            </button>
          )
        }
      </div>
      {children}
    </header>
  )
}