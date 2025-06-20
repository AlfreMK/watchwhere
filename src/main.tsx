import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Index from '@/pages/Index.tsx'
import Movie from '@/pages/Movie.tsx'
import TvShow from '@/pages/TvShow.tsx'
import Footer from '@/components/Footer.tsx'
import { MEDIA_TYPES } from '@/mediaTypes'
import Logo from '@/components/Logo.tsx'
import { Routes, Route, BrowserRouter} from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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
      <Logo />
      <BrowserRouter>
      <Routes>
        <Route path={`${BASE_URL}/`} element={<Index />} />
        <Route path={`${BASE_URL}/${MEDIA_TYPES.MOVIE}/:id`} element={<Movie />}/>
        <Route path={`${BASE_URL}/${MEDIA_TYPES.TV_SHOW}/:id`} element={<TvShow />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </QueryClientProvider>
  </StrictMode>
)
