import ReactDOMServer from 'react-dom/server';
import { Toaster } from 'sonner';

import App from './src/App.jsx';
import { UserContextProvider } from './src/contexts/user-context.jsx';
import { CartContextProvider } from './src/contexts/cart-context.jsx';

export function render(urlSearch, products) {
  return ReactDOMServer.renderToString(
    <CartContextProvider>
      <UserContextProvider>
        <Toaster />
        <App urlSearch={urlSearch} products={products} />
      </UserContextProvider>
    </CartContextProvider>
  );
}