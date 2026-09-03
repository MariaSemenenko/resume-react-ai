import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './BrandMarquee.css'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const assetBase = 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images'
const logos = [1, 2, 3, 4, 5, 6, 7, 8, 7]

function LogoGroup() {
  return <div className="marquee-group" aria-hidden="true">{logos.map((logo, index) => <div className="marquee-logo" key={`${logo}-${index}`}><img src={`${assetBase}/brand-logo${logo}.png`} alt="" /></div>)}</div>
}

export default function BrandMarquee() {
  const { t } = useTranslation()
  const marqueeRef = useRef(null)

  useGSAP(() => {
    const root = marqueeRef.current
    const track = root.querySelector('.marquee-track')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const movement = gsap.to(track, { xPercent: -50, duration: 56, ease: 'none', repeat: -1 })
    const setSpeed = gsap.quickTo(movement, 'timeScale', { duration: 0.35, ease: 'power2.out' })
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
  }, { scope: marqueeRef })

  return <section className="brand-marquee" ref={marqueeRef} aria-labelledby="brands-title">
    <h2 id="brands-title">{t('Trusted by world-leading brands')}</h2>
    <div className="marquee-window"><div className="marquee-track"><LogoGroup /><LogoGroup /></div></div>
  </section>
}
