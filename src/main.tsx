import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import Footer from '@/components/Footer.tsx'
import Logo from '@/components/Logo.tsx'
import { Routes, Route, BrowserRouter} from 'react-router'

const BASE_URL = "watchwhere"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Logo />
    <BrowserRouter>
    <Routes>
      <Route path={`${BASE_URL}/`} element={<App />} />
      <Route path={`${BASE_URL}/:media/:id`} element={<></>}/>
    </Routes>
    </BrowserRouter>
    <Footer />
  </StrictMode>
)
