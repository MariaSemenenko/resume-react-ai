import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function useSolutionsScroll(scope, language) {
  useGSAP(() => {
    const section = scope.current
    const media = gsap.matchMedia()

    media.add({
      reducedMotion: '(prefers-reduced-motion: reduce)',
      shortScreen: '(max-height: 500px)',
      regularScreen: '(min-height: 501px)',
    }, ({ conditions }) => {
      if (conditions.reducedMotion || conditions.shortScreen) return

      section.classList.add('is-scroll-enabled')
      const stage = section.querySelector('.solutions-scroll__stage')
      const scene = section.querySelector('.solutions-scroll__scene')
      const character = section.querySelector('.solution-character')
      const cards = gsap.utils.toArray('.scroll-project-card', section)
      const headerHeight = () => document.querySelector('.site-header')?.offsetHeight ?? 0

      gsap.set(cards, { xPercent: -50, yPercent: -50, x: 0, y: 0 })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: () => `top top+=${headerHeight()}`,
          end: () => `+=${Math.max(section.offsetHeight - stage.offsetHeight, 1)}`,
          scrub: .65,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .fromTo(character, { scale: .76 }, { scale: 1.22, duration: 1 }, 0)
        .fromTo(section.querySelector('.solution-character__outline'),
          { opacity: 1 }, { opacity: 0, duration: .4 }, .2)
        .fromTo(section.querySelector('.solution-character__color'),
          { opacity: 0 }, { opacity: 1, duration: .46 }, .22)
        .fromTo(cards, { x: 0, y: 0, scale: 1, opacity: 1 }, {
          // CSS anchors and offsets stay independent of the animated transforms.
          x: (_, card) => scene.clientWidth * .5 - card.offsetLeft,
          y: (_, card) => scene.clientHeight * .68 - card.offsetTop,
          scale: .12,
          opacity: 0,
          duration: .76,
          stagger: { amount: .08, from: 'edges' },
          ease: 'power2.inOut',
        }, .06)
        .fromTo(section.querySelector('.solutions-scroll__heading'),
          { opacity: 1, y: 0 }, { opacity: 0, y: -20, duration: .26 }, .12)

      return () => section.classList.remove('is-scroll-enabled')
    })

    return () => media.revert()
  }, { scope, dependencies: [language], revertOnUpdate: true })
}
