import { useState } from 'react'
import './Header.css'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Portfolio', href: '/portfolio' },
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isActive = (href) => href === '/blog' ? pathname === '/blog' || pathname.startsWith('/blog/') : href.startsWith('/#') ? pathname === '/' && window.location.hash === href.slice(1) : pathname === href
  const navigationLink = (link, mobile = false) => {
    const active = isActive(link.href)
    return <a key={link.label} className={active ? 'is-active' : undefined} href={link.href} aria-current={active ? 'page' : undefined} onClick={mobile ? closeMenu : undefined}>{link.label}</a>
  }

  return <header className="site-header">
    <div className="header-container">
      <a className="header-logo" href="/" aria-label="Go to homepage">✳</a>
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {links.map((link) => navigationLink(link))}
      </nav>
      <div className="header-actions">
        <button className="language-button" type="button" aria-label="Current language: English">🇬🇧</button>
        <a className="resume-download" href="#resume" aria-label="Download resume"><DownloadIcon /></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><MenuIcon open={menuOpen} /><span className="sr-only">Open navigation</span></button>
        <a className="account-button" href="#account" aria-label="Account"><UserIcon /></a>
      </div>
    </div>
    <nav id="mobile-navigation" className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
      {links.map((link) => navigationLink(link, true))}
    </nav>
  </header>
}
