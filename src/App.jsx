import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BrandMarquee from './components/BrandMarquee'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PortfolioPage from './pages/PortfolioPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import { getBlogPost } from './data/blogPosts'

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const blogSlug = pathname.startsWith('/blog/') ? pathname.slice(6) : null
  const pages = {
    '/about': <AboutPage />,
    '/contact': <ContactPage />,
    '/portfolio': <PortfolioPage />,
    '/blog': <BlogPage />,
  }
  const content = blogSlug ? <BlogPostPage post={getBlogPost(blogSlug)} /> : pages[pathname] ?? <><Hero /><Projects /><BrandMarquee /></>

  return <main id="home">
    <Header />
    {content}
    <Footer />
  </main>
}

export default App
