import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './HeaderNavigation.css'

const links = [
  { key: 'Home', href: '/' },
  {
    key: 'About',
    href: '/about',
    children: [
      { key: 'Portfolio', href: '/portfolio' },
      { key: 'Solutions', href: '/solutions' },
    ],
  },
  { key: 'Blog', href: '/blog' },
  { key: 'Contact', href: '/contact' },
]

function NavigationLink({ link, isActive, onNavigate, submenu = false }) {
  const { t } = useTranslation()
  const active = isActive(link.href)

  return <a
    className={`header-${submenu ? 'submenu' : 'navigation'}-link${active ? ' is-active' : ''}`}
    href={link.href}
    aria-current={active ? 'page' : undefined}
    onClick={onNavigate}
  >
    <span>{t(link.key)}</span>
    {submenu && <span className="header-submenu-arrow" aria-hidden="true">&rarr;</span>}
  </a>
}

function NavigationDropdown({ link, isActive, onNavigate, mobile }) {
  const { t } = useTranslation()
  const submenuId = useId()
  const itemRef = useRef(null)
  const toggleRef = useRef(null)
  const [open, setOpen] = useState(false)
  const sectionActive = isActive(link.href) || link.children.some((child) => isActive(child.href))

  useEffect(() => {
    if (!open) return

    const dismissOutside = (event) => {
      if (!itemRef.current?.contains(event.target)) setOpen(false)
    }
    const dismissOnResize = () => setOpen(false)
    const breakpoint = window.matchMedia('(max-width: 900px)')
    document.addEventListener('pointerdown', dismissOutside)
    breakpoint.addEventListener('change', dismissOnResize)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      breakpoint.removeEventListener('change', dismissOnResize)
    }
  }, [open])

  const navigate = () => {
    setOpen(false)
    onNavigate?.()
  }

  return <li
    ref={itemRef}
    className={`header-navigation-item has-submenu${open ? ' is-open' : ''}${sectionActive ? ' is-section-active' : ''}`}
    onPointerEnter={(event) => {
      if (!mobile && event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) setOpen(true)
    }}
    onPointerLeave={(event) => {
      if (!mobile && event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setOpen(false)
    }}
    onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}
    onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
        toggleRef.current?.focus()
      }
    }}
  >
    <div className="header-navigation-row">
      <NavigationLink link={link} isActive={isActive} onNavigate={navigate} />
      <button
        ref={toggleRef}
        className="header-submenu-toggle"
        type="button"
        aria-label={t('Toggle {{section}} submenu', { section: t(link.key) })}
        aria-expanded={open}
        aria-controls={submenuId}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
    </div>
    <div id={submenuId} className="header-submenu" aria-hidden={!open} inert={!open}>
      <div className="header-submenu-content">
        <ul className="header-submenu-list">
          {link.children.map((child) => <li key={child.key}>
            <NavigationLink link={child} isActive={isActive} onNavigate={navigate} submenu />
          </li>)}
        </ul>
      </div>
    </div>
  </li>
}

export default function HeaderNavigation({ mobile = false, onNavigate }) {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isActive = (href) => pathname === href || (href === '/blog' && pathname.startsWith('/blog/'))

  return <ul className="header-navigation-list">
    {links.map((link) => link.children
      ? <NavigationDropdown key={link.key} link={link} isActive={isActive} onNavigate={onNavigate} mobile={mobile} />
      : <li key={link.key} className="header-navigation-item">
        <div className="header-navigation-row">
          <NavigationLink link={link} isActive={isActive} onNavigate={onNavigate} />
        </div>
      </li>)}
  </ul>
}
