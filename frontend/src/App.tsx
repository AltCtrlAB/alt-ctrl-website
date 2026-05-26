import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothCursor from '@/components/SmoothCursor'
import ScrollToTop from '@/components/ScrollToTop'
import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <>
      {/* Skip-to-content — first focusable element for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
          focus:z-[9999] focus:bg-accent focus:text-accent-foreground focus:px-4
          focus:py-2 focus:rounded-lg focus:font-mono focus:text-sm focus:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-accent-foreground/30"
      >
        Hoppa till innehåll
      </a>

      <ScrollProgress />
      <SmoothCursor />
      <ScrollToTop />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
