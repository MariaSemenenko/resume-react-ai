import './Footer.css'

const assetBase = 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images'

const primaryLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/#blog' },
]

const secondaryLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms & Conditions', href: '#terms' },
]

function FooterLinks({ links }) {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  return <ul className="footer-links">{links.map((link) => {
    const active = pathname === link.href
    return <li key={link.label}><a className={active ? 'is-active' : undefined} href={link.href} aria-current={active ? 'page' : undefined}>{link.label}</a></li>
  })}</ul>
}

export default function Footer() {
  const subscribe = (event) => event.preventDefault()

  return <footer className="site-footer">
    <div className="page-container footer-container">
      <div className="footer-grid">
        <section className="footer-intro">
          <a className="footer-logo" href="#home" aria-label="Go to homepage"><img src={`${assetBase}/flower.png`} alt="" /></a>
          <p>When do they work well, and when do they rely on us? And finally, when do we actually need them?</p>
          <address className="footer-contacts">
            <a href="tel:+380671537306"><img src={`${assetBase}/phone_svg.svg`} alt="" />(+380) 67 153 73 06</a>
            <a href="mailto:Mashyni92@gmail.com"><img src={`${assetBase}/email_svg.svg`} alt="" />Mashyni92@gmail.com</a>
            <p><img src={`${assetBase}/location_svg.svg`} alt="" />Cherkasy region, Ukraine, UA</p>
          </address>
        </section>
        <nav className="footer-nav" aria-label="Footer navigation"><p className="footer-heading">Useful links</p><FooterLinks links={primaryLinks} /></nav>
        <nav className="footer-nav" aria-label="Legal navigation"><p className="footer-heading">Information</p><FooterLinks links={secondaryLinks} /></nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 | All rights reserved by <a href="#portfolio">WordPress developer</a></p>
        <form className="footer-form" onSubmit={subscribe}>
          <label className="sr-only" htmlFor="footer-email">Email address</label>
          <input id="footer-email" type="email" placeholder="Enter your email" autoComplete="email" required />
          <button type="submit">Send <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </div>
  </footer>
}

