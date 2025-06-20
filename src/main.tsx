import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Index from '@/pages/Index.tsx'
import Movie from '@/pages/Movie.tsx'
import TvShow from '@/pages/TvShow.tsx'
import Footer from '@/components/Footer.tsx'
import Logo from '@/components/Logo.tsx'
import { Routes, Route, BrowserRouter} from 'react-router'

const BASE_URL = "watchwhere"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Logo />
    <BrowserRouter>
    <Routes>
      <Route path={`${BASE_URL}/`} element={<Index />} />
      <Route path={`${BASE_URL}/movies/:id`} element={<Movie />}/>
      <Route path={`${BASE_URL}/tv-shows/:id`} element={<TvShow />}/>
    </Routes>
    </BrowserRouter>
    <Footer />
  </StrictMode>
)
