import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ReelAccents() {
  const { t } = useTranslation()
  const element = useRef(null)
  const [revealed, setRevealed] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.disconnect()
      }
    }, { threshold: .5 })
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [])

  return <div className="portfolio-reel__accents" ref={element} data-revealed={revealed}>
    <p className="portfolio-reel__accent-copy">{t('From concept to launch')}</p>
    <svg className="portfolio-reel__wave" viewBox="0 0 240 74" fill="none" aria-hidden="true">
      <path pathLength="1" d="M4 38C24 38 26 8 49 8S77 66 101 66S128 8 152 8S180 66 204 66S226 38 236 38" />
      <path pathLength="1" d="M4 50C28 50 28 25 51 25S78 66 102 66S130 25 153 25S180 66 204 66S225 50 236 50" />
    </svg>
  </div>
}
