import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './PortfolioContactMarquee.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const marqueeItems = [
  { label: 'Let’s work together', href: '/contact', kind: 'accent' },
  { label: 'Mashyni92@gmail.com', href: 'mailto:Mashyni92@gmail.com', kind: 'light' },
  { label: 'Start a project', href: '/contact', kind: 'highlight' },
  { label: '(+380) 67 153 73 06', href: 'tel:+380671537306', kind: 'light' },
]

function MarqueeGroup({ duplicate = false }) {
  return <div className="portfolio-marquee-group" aria-hidden={duplicate || undefined}>
    {marqueeItems.map((item) => <a className={`portfolio-marquee-item is-${item.kind}`} href={item.href} tabIndex={duplicate ? -1 : undefined} key={item.label}>{item.label}<span aria-hidden="true">↗</span></a>)}
  </div>
}

export default function PortfolioContactMarquee() {
  const scope = useRef(null)

  useGSAP(() => {
    const root = scope.current
    const track = root.querySelector('.portfolio-marquee-track')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const movement = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
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
    <div className="page-container portfolio-contact-heading">
      <p>Have a project in mind?</p>
      <h2 id="portfolio-contact-title">Let’s create something memorable.</h2>
    </div>
    <div className="portfolio-marquee-window">
      <div className="portfolio-marquee-track"><MarqueeGroup /><MarqueeGroup duplicate /></div>
    </div>
  </section>
}
