import SolutionsShowcase from '../components/solutions/SolutionsShowcase'
import SolutionsScrollSection from '../components/solutions/SolutionsScrollSection'

export default function SolutionsPage() {
  return <section className="solutions-page theme-light" aria-labelledby="solutions-title">
    <SolutionsShowcase />
    <SolutionsScrollSection />
  </section>
}
