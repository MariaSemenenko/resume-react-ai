import './ContactHero.css'
import { useTranslation } from 'react-i18next'

export default function ContactHero() {
  const { t } = useTranslation()
  return <section className="contact-hero" aria-labelledby="contact-title">
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">{t('Home')}</a><span aria-hidden="true"> / </span><span>{t('Contact')}</span></nav>
      <p className="contact-eyebrow">{t('Contact me')}</p>
      <h1 id="contact-title">{t("Let's make something awesome together!")}</h1>
    </div>
  </section>
}
