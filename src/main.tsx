import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Index from '@/pages/Index.tsx'
import Media from '@/pages/Media.tsx'
import Footer from '@/components/Footer.tsx'
import Logo from '@/components/Logo.tsx'
import { Routes, Route, BrowserRouter} from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SelectedCountryProvider } from '@/components/SelectedCountryProvider'

const BASE_URL = "watchwhere"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SelectedCountryProvider>
        <Logo />
        <BrowserRouter>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<Index />} />
          <Route path={`${BASE_URL}/:media/:id`} element={<Media />}/>
        </Routes>
        </BrowserRouter>
        <Footer />
      </SelectedCountryProvider>
    </QueryClientProvider>
  </StrictMode>
)
