// import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Toaster } from 'sonner'
import App from './src/App.jsx'

import { UserContextProvider } from './src/contexts/user-context.jsx'
import { CartContextProvider } from './src/contexts/cart-context.jsx'

export function renderReactServer ({ props, search }) {
  return renderToString(
    <CartContextProvider>
      <UserContextProvider>
        <Toaster />
        <App {...props} search={search} />
      </UserContextProvider>
    </CartContextProvider>
  )
}

