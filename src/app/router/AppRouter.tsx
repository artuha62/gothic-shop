import { useRoutes } from 'react-router'
import { routes } from './routes'

export const AppRouter = () => {
  return useRoutes(routes)
}
