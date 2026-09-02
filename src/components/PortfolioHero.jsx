import './PortfolioHero.css'

export default function PortfolioHero() {
  return <section className="portfolio-hero" aria-labelledby="portfolio-title">
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span>Portfolio</span></nav>
      <div className="portfolio-hero-grid">
        <div>
          <p className="portfolio-eyebrow">Selected work</p>
          <h1 id="portfolio-title">Projects built to feel <span>effortless.</span></h1>
        </div>
        <p className="portfolio-intro">A selection of WordPress, ecommerce, and product experiences shaped around real business goals. Scroll to explore the work.</p>
      </div>
    </div>
  </section>
}
