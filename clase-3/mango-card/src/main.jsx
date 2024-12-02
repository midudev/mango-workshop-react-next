// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'

import { UserContextProvider } from './contexts/user-context.jsx'
import { CartContextProvider } from './contexts/cart-context.jsx'
import { getProducts } from './logic/products.js'

const propsElement = document.getElementById('__MIDU__')
const initialProps = propsElement ? JSON.parse(propsElement.textContent) : {}

createRoot(
  document.getElementById('root')
).render(
  <CartContextProvider>
    <UserContextProvider>
      <Toaster />
      <App products={initialProps.products} />
    </UserContextProvider>
  </CartContextProvider>
)
