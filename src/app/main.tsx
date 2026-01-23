import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { scan } from 'react-scan'
import App from './App'
import './styles/index'

if (import.meta.env.DEV) {
  scan({
    enabled: true,
    log: true,
  })
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      {/*<StrictMode>*/}
      <App />
      {/*</StrictMode>*/}
    </QueryClientProvider>
  </BrowserRouter>
)
