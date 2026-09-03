import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function useBlogReveal(scope) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.utils.toArray('.js-blog-reveal', scope.current).forEach((element, index) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 34,
        duration: 0.8,
        delay: index < 3 ? index * 0.08 : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      })
    })
  }, { scope })
}
