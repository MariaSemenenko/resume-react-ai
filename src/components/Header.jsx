import { useState } from 'react'
import './Header.css'
import { useTranslation } from 'react-i18next'

const assetBase = 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images'

const links = [
  { key: 'Home', href: '/' },
  { key: 'About', href: '/about' },
  { key: 'Blog', href: '/blog' },
  { key: 'Contact', href: '/contact' },
  { key: 'Portfolio', href: '/portfolio' },
]

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M3 12a9 9 0 1 0 18 0" /></svg>
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c.8-3.4 3.3-5.3 7.5-5.3s6.7 1.9 7.5 5.3" /></svg>
}

function MenuIcon({ open }) {
  return <span className={`header-menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /><i /></span>
}

function FlagIcon({ language }) {
  return language === 'uk'
    ? <svg className="language-flag" viewBox="0 0 24 16" aria-hidden="true"><path fill="#0057b7" d="M0 0h24v8H0z" /><path fill="#ffd700" d="M0 8h24v8H0z" /></svg>
    : <svg className="language-flag" viewBox="0 0 24 16" aria-hidden="true"><path fill="#012169" d="M0 0h24v16H0z" /><path stroke="#fff" strokeWidth="3" d="m0 0 24 16M24 0 0 16" /><path stroke="#c8102e" strokeWidth="1.5" d="m0 0 24 16M24 0 0 16" /><path stroke="#fff" strokeWidth="5" d="M12 0v16M0 8h24" /><path stroke="#c8102e" strokeWidth="3" d="M12 0v16M0 8h24" /></svg>
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isActive = (href) => href === '/blog' ? pathname === '/blog' || pathname.startsWith('/blog/') : href.startsWith('/#') ? pathname === '/' && window.location.hash === href.slice(1) : pathname === href
  const navigationLink = (link, mobile = false) => {
    const active = isActive(link.href)
    return <a key={link.key} className={active ? 'is-active' : undefined} href={link.href} aria-current={active ? 'page' : undefined} onClick={mobile ? closeMenu : undefined}>{t(link.key)}</a>
  }

  return <header className="site-header">
    <div className="header-container">
      <a className="header-logo" href="/" aria-label={t('Go to homepage')}><img src={`${assetBase}/flower.png`} alt="" /></a>
      <nav className="desktop-navigation" aria-label={t('Primary navigation')}>
        {links.map((link) => navigationLink(link))}
      </nav>
      <div className="header-actions">
        <div className="language-switcher" role="group" aria-label={t('Language')}>
          <button className={i18n.language === 'en' ? 'is-active' : undefined} type="button" onClick={() => i18n.changeLanguage('en')} aria-label={t('Switch to English')} aria-pressed={i18n.language === 'en'}><FlagIcon language="en" /><span></span></button>
          <button className={i18n.language === 'uk' ? 'is-active' : undefined} type="button" onClick={() => i18n.changeLanguage('uk')} aria-label={t('Switch to Ukrainian')} aria-pressed={i18n.language === 'uk'}><FlagIcon language="uk" /><span></span></button>
        </div>
        <a className="resume-download" href="#resume" aria-label={t('Download resume')}><DownloadIcon /></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><MenuIcon open={menuOpen} /><span className="sr-only">{t(menuOpen ? 'Close navigation' : 'Open navigation')}</span></button>
        <a className="account-button" href="#account" aria-label={t('Account')}><UserIcon /></a>
      </div>
    </div>
    <nav id="mobile-navigation" className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`} aria-label={t('Mobile navigation')}>
      {links.map((link) => navigationLink(link, true))}
    </nav>
  </header>
}
