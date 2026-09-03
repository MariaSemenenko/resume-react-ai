import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useBlogReveal from '../hooks/useBlogReveal'
import './BlogHero.css'

export default function BlogHero({ title = 'Latest Blog', eyebrow = 'Blog', image = 'https://dev-08.semenenko.pp.ua/wp-content/uploads/2024/12/drink-1839134_1280.jpg' }) {
  const { t } = useTranslation()
  const scope = useRef(null)
  useBlogReveal(scope)

  return <section className="blog-hero" ref={scope} aria-labelledby="blog-hero-title">
    <img className="blog-hero-image" src={image} alt="" />
    <div className="blog-hero-overlay" />
    <div className="page-container blog-hero-content">
      <p className="js-blog-reveal">{t(eyebrow)}</p>
      <h1 className="js-blog-reveal" id="blog-hero-title">{t(title)}</h1>
      <nav className="blog-breadcrumbs js-blog-reveal" aria-label="Breadcrumb">
        <a href="/">{t('Home')}</a><span aria-hidden="true"> / </span>
        {title === 'Latest Blog' ? <span>{t('Blog')}</span> : <><a href="/blog">{t('Blog')}</a><span aria-hidden="true"> / </span><span>{t(title)}</span></>}
      </nav>
    </div>
  </section>
}
