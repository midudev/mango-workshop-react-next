import { Title } from "./Title";

export function Header({ products, children }) {
  return (
    <header>
      <Title as='h4' text='Mango Card' />
  
      <small>Número de productos: {products.length}</small>

      {children}
    </header>
  )
}