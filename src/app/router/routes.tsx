import MainLayout from '@/app/layouts/MainLayout'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'
import { CatalogPage } from '@/pages/catalog-page'
import { CheckoutPage } from '@/pages/checkout-page'
import { FavoritesPage } from '@/pages/favorites-page'
import { MainPage } from '@/pages/main-page'
import { ProductPage } from '@/pages/product-page'
import { ProfilePage } from '@/pages/profile-page'
import type { ReactElement } from 'react'

export interface Routes {
  path?: string
  element: ReactElement
  children?: Routes[]
}

export const routes: Routes[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: '/profile', element: <ProfilePage /> },
          { path: '/checkout', element: <CheckoutPage /> },
        ],
      },

      { path: '/catalog', element: <CatalogPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/product/:slug', element: <ProductPage /> },
    ],
  },
]
