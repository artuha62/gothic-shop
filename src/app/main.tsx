import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index'
import App from './App'
import { BrowserRouter } from 'react-router'
import { FavoritesProvider } from '@/features/favorites/model/FavoritesContext'
import { CartProvider } from '@/features/cart/model/CartContext'
import { CartDrawerProvider } from '@/features/cart/model/CartDrawerContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <CartProvider>
        <CartDrawerProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </CartDrawerProvider>
      </CartProvider>
    </StrictMode>
  </BrowserRouter>
)
