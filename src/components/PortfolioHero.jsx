import './PortfolioHero.css'
import { useTranslation } from 'react-i18next'

export default function PortfolioHero() {
  const { t } = useTranslation()
  return <section className="portfolio-hero" aria-labelledby="portfolio-title">
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">{t('Home')}</a><span aria-hidden="true"> / </span><span>{t('Portfolio')}</span></nav>
      <div className="portfolio-hero-grid">
        <div>
          <p className="portfolio-eyebrow">{t('Selected work')}</p>
          <h1 id="portfolio-title">{t('Projects built to feel effortless.')}</h1>
        </div>
        <p className="portfolio-intro">{t('A selection of WordPress, ecommerce, and product experiences shaped around real business goals. Scroll to explore the work.')}</p>
      </div>
    </div>
  </section>
}
