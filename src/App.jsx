import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useLang } from './i18n.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import { NewsList, NewsDetail } from './pages/News.jsx'
import { ClubsPage, ClubDetail } from './pages/Clubs.jsx'
import Schedule from './pages/Schedule.jsx'
import { Centers, Leadership, Contacts } from './pages/About.jsx'
import Council from './pages/Council.jsx'
import Counselors from './pages/Counselors.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Login, { ResetPassword } from './pages/Login.jsx'
import Cabinet from './pages/Cabinet.jsx'
import NotFound from './pages/NotFound.jsx'

function SkipLink() {
  const { tr } = useLang()
  return (
    <a href="#main" className="sr-only z-50 rounded-lg bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
      {tr('Asosiy mazmunga o‘tish', 'Перейти к содержимому')}
    </a>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:id" element={<ClubDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/student-council" element={<Council />} />
          <Route path="/school-counselors" element={<Counselors />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/forgot-password" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
