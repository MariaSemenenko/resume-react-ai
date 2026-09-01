import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function usePageIntro(scope) {
  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const select = gsap.utils.selector(scope)

    if (reducedMotion) return undefined

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .from(select('.js-intro-greeting'), { autoAlpha: 0, y: 20, duration: 0.55 })
      .from(select('.js-intro-title'), { autoAlpha: 0, y: 48, duration: 0.75 }, '-=0.2')
      .from(select('.js-intro-copy'), { autoAlpha: 0, y: 24, duration: 0.55 }, '-=0.42')
      .from(select('.js-intro-actions'), { autoAlpha: 0, y: 18, duration: 0.45 }, '-=0.32')
      .from(select('.js-intro-visual'), { autoAlpha: 0, scale: 0.96, y: 28, duration: 0.75 }, '-=0.48')

    gsap.to(select('.js-wave'), { rotation: 15, transformOrigin: '70% 75%', duration: 0.55, ease: 'sine.inOut', repeat: -1, yoyo: true })
    gsap.to(select('.js-spin'), { rotation: 360, transformOrigin: '50% 50%', duration: 14, ease: 'none', repeat: -1 })
    gsap.to(select('.js-arrow'), { x: 7, y: -3, duration: 1.25, ease: 'sine.inOut', repeat: -1, yoyo: true })

    return undefined
  }, { scope })
}
