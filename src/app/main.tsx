import { CartProvider } from '@/entities/cart/model/CartContext.tsx'
import { CartDrawerProvider } from '@/entities/cart/model/CartDrawerContext.tsx'
import { FavoritesProvider } from '@/entities/favorites/model/FavoritesContext.tsx'
import { FiltersDrawerProvider } from '@/entities/filters/model/FiltersDrawerContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles/index'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <CartProvider>
          <FiltersDrawerProvider>
            <CartDrawerProvider>
              <FavoritesProvider>
                <App />
              </FavoritesProvider>
            </CartDrawerProvider>
          </FiltersDrawerProvider>
        </CartProvider>
      </StrictMode>
    </QueryClientProvider>
  </BrowserRouter>
)
