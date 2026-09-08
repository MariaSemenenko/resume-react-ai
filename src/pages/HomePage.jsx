import BrandMarquee from '../components/BrandMarquee'
import SolutionsShowcase from '../components/solutions/SolutionsShowcase'
import SolutionsScrollSection from '../components/solutions/SolutionsScrollSection'
import StackedProjects from '../components/StackedProjects'

export default function HomePage() {
  return <section className="home-page theme-light" aria-labelledby="solutions-title">
    <SolutionsShowcase />
    <SolutionsScrollSection />
    <StackedProjects />
    <BrandMarquee />
  </section>
}
