// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'

import { UserContextProvider } from './contexts/user-context.jsx'
import { CartContextProvider } from './contexts/cart-context.jsx'

createRoot(
  document.getElementById('root')
).render(
  <CartContextProvider>
    <UserContextProvider>
      <Toaster />
      <App
        products={JSON.parse(document.getElementById('__MIDU_DATA__').textContent)}
        urlSearch={window.location.search}
      />
    </UserContextProvider>
  </CartContextProvider>
)
