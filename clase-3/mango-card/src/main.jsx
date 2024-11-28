// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'

import { UserContextProvider } from './contexts/user-context.jsx'
import { CartContextProvider } from './contexts/cart-context.jsx'
// import { UserContextProvider } from './contexts/user-context'

createRoot(
  document.getElementById('root')
).render(
  <CartContextProvider>
    <UserContextProvider>
      <Toaster />
      <App />
    </UserContextProvider>
  </CartContextProvider>
)