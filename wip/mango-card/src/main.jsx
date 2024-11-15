import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './contexts/user.jsx'
import { CartProvider } from './contexts/cart.jsx'

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>
    <CartProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </CartProvider>
  </StrictMode>
  ,
)
