import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './PortfolioContactMarquee.css'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const marqueeItems = [
  { id: 'email', label: 'Mashyni92@gmail.com', href: 'mailto:Mashyni92@gmail.com', kind: 'outline' },
  { id: 'divider-1', label: '_', kind: 'divider' },
  { id: 'phone', label: '(+380) 67 153 73 06', href: 'tel:+380671537306', kind: 'solid' },
  { id: 'divider-2', label: '_', kind: 'divider' },
  { id: 'name', label: 'Maria Semenenko', href: '/about', kind: 'outline' },
  { id: 'divider-3', label: '_', kind: 'divider' },
  { id: 'contact', label: "Let's work together", href: '/contact', kind: 'solid' },
]

function MarqueeGroup({ duplicate = false, t }) {
  return <div className="portfolio-marquee-group" aria-hidden={duplicate || undefined}>
    {marqueeItems.map((item) => item.href
      ? <a className={`portfolio-marquee-item is-${item.kind}`} href={item.href} tabIndex={duplicate ? -1 : undefined} key={item.id}>{t(item.label)}</a>
      : <span className={`portfolio-marquee-item is-${item.kind}`} key={item.id}>{item.label}</span>)}
  </div>
}

export default function PortfolioContactMarquee() {
  const { t } = useTranslation()
  const scope = useRef(null)

  useGSAP(() => {
    const root = scope.current
    const track = root.querySelector('.portfolio-marquee-track')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const movement = gsap.to(track, { xPercent: -50, duration: 56, ease: 'none', repeat: -1 })
    const setSpeed = gsap.quickTo(movement, 'timeScale', { duration: .35, ease: 'power2.out' })
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => setSpeed(self.direction === 1 ? 1.8 : -1.8),
    })
    const pause = () => movement.pause()
    const resume = () => movement.play()
    root.addEventListener('mouseenter', pause)
    root.addEventListener('mouseleave', resume)
    root.addEventListener('focusin', pause)
    root.addEventListener('focusout', resume)

    return () => {
      trigger.kill()
      root.removeEventListener('mouseenter', pause)
      root.removeEventListener('mouseleave', resume)
      root.removeEventListener('focusin', pause)
      root.removeEventListener('focusout', resume)
    }
  }, { scope })

  return <section className="portfolio-contact-marquee" ref={scope} aria-labelledby="portfolio-contact-title">
    <h2 className="sr-only" id="portfolio-contact-title">{t('Contact Maria Semenenko')}</h2>
    <div className="portfolio-marquee-window">
      <div className="portfolio-marquee-track"><MarqueeGroup t={t} /><MarqueeGroup duplicate t={t} /></div>
    </div>
  </section>
}
