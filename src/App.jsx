import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'

function App() {
  const isAboutPage = window.location.pathname.replace(/\/$/, '') === '/about'

  return <main id="home">
    <Header />
    {isAboutPage ? <AboutPage /> : <><Hero /><Projects /></>}
    <Footer />
  </main>
}

export default App
