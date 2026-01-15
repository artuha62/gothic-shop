import MainLayout from '@/app/layouts/MainLayout'
import { CatalogPage } from '@/pages/catalog-page'
import { FavoritesPage } from '@/pages/favorites-page'
import { ProductPage } from '@/pages/product-page'
import type { ReactElement } from 'react'

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
      { path: '/catalog', element: <CatalogPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/product/:slug', element: <ProductPage /> },
    ],
  },
]
