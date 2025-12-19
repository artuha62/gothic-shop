import type { ReactElement } from 'react'
import { CatalogPage } from '@/pages/catalog-page'
import { ProductPage } from '@/pages/product-page'
import { FavoritesPage } from '@/pages/favorites-page'
import MainLayout from '@/app/layouts/MainLayout'

export interface IRoute {
  path?: string
  element: ReactElement
  children?: IRoute[]
}

export const routes: IRoute[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <div>MAIN PAGE</div>,
      },
      { path: '/catalog-page', element: <CatalogPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/product/:slug', element: <ProductPage /> },
    ],
  },
]
