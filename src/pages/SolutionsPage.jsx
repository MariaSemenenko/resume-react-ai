import Hero from '../components/Hero'
import Projects from '../components/Projects'
import BrandMarquee from '../components/BrandMarquee'
import PortfolioReel from '../components/solutions/PortfolioReel'

export default function SolutionsPage() {
  return <section className="home-page theme-light">
    <Hero />
    <PortfolioReel />
    <Projects />
    <BrandMarquee />
  </section>
}
