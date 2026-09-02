import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BrandMarquee from './components/BrandMarquee'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PortfolioPage from './pages/PortfolioPage'

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const pages = {
    '/about': <AboutPage />,
    '/contact': <ContactPage />,
    '/portfolio': <PortfolioPage />,
  }

  return <main id="home">
    <Header />
    {pages[pathname] ?? <><Hero /><Projects /><BrandMarquee /></>}
    <Footer />
  </main>
}

export default App
