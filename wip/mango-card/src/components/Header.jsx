import { Title } from "./title";
import { useUser } from "../hooks/use-user";

export function Header({ products, children }) {
  const { isLogged, login, logout } = useUser()

  return (
    <header>
      <Title as='h4' text='Mango Card' />
  
      <small>Número de productos: {products.length}</small>

      <div>
        {
          isLogged ? (
            <button onClick={logout} style={{ background: 'black' }}> 
              Cerrar sesión
            </button>
          ) : (
            <button onClick={login} style={{ background: '#09f' }}>
              Iniciar sesión
            </button>
          )
        }
      </div>
      {children}
    </header>
  )
}