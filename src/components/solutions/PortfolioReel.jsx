import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './PortfolioReel.css'

function PlaybackIcon({ playing }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {playing
      ? <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      : <path d="m8 5 11 7-11 7V5Z" fill="currentColor" />}
  </svg>
}

export function ReelVideo({ src, mobileSrc, poster, mobilePoster, label }) {
  const { t } = useTranslation()
  const videoId = useId()
  const frame = useRef(null)
  const video = useRef(null)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 600px)').matches)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [loaded, setLoaded] = useState(() => !('IntersectionObserver' in window))
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window))
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [playIntent, setPlayIntent] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)
  const activeSource = mobile ? mobileSrc : src
  const activePoster = mobile ? mobilePoster : poster
  const shouldPlay = playIntent === true || (playIntent === null && !reducedMotion)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 600px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMobile = () => setMobile(mobileQuery.matches)
    const updateMotion = () => setReducedMotion(motionQuery.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    mobileQuery.addEventListener('change', updateMobile)
    motionQuery.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)

    return () => {
      mobileQuery.removeEventListener('change', updateMobile)
      motionQuery.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true)
        loadObserver.disconnect()
      }
    }, { rootMargin: '300px' })
    const playbackObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= .15)
    }, { threshold: [0, .15] })
    loadObserver.observe(frame.current)
    playbackObserver.observe(frame.current)

    return () => {
      loadObserver.disconnect()
      playbackObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return undefined
    let active = true

    if (loaded && visible && pageVisible && shouldPlay && !blocked && !failed) {
      element.play().catch(() => {
        if (active) {
          setBlocked(true)
          setPlaying(false)
        }
      })
    } else {
      element.pause()
    }

    return () => {
      active = false
      element.pause()
    }
  }, [activeSource, blocked, failed, loaded, pageVisible, shouldPlay, visible])

  const togglePlayback = () => {
    if (playing) {
      setPlayIntent(false)
      video.current?.pause()
    } else {
      setLoaded(true)
      setBlocked(false)
      setPlayIntent(true)
    }
  }

  return <figure className="portfolio-reel__player">
    <div className="portfolio-reel__media" ref={frame}>
      <picture className="portfolio-reel__poster" aria-hidden="true">
        <source media="(max-width: 600px)" srcSet={mobilePoster} />
        <img src={poster} alt="" width="1920" height="1080" loading="lazy" decoding="async" />
      </picture>
      {!failed && <video
        ref={video}
        id={videoId}
        className="portfolio-reel__video"
        src={loaded ? activeSource : undefined}
        poster={activePoster}
        preload={loaded ? 'metadata' : 'none'}
        muted
        loop
        playsInline
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false) }}
      />}
    </div>
    <figcaption className="portfolio-reel__caption">
      <div className="portfolio-reel__playback">
        {!failed && <button
          type="button"
          className="portfolio-reel__toggle"
          aria-controls={videoId}
          onClick={togglePlayback}
        >
          <PlaybackIcon playing={playing} />
        </button>}
        <span className="portfolio-reel__duration" aria-label={t('12-second portfolio reel')}>00:12</span>
      </div>
      <a className="portfolio-reel__link" href="/portfolio">
        {t('Explore portfolio')}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
      </a>
    </figcaption>
    {failed && <p className="portfolio-reel__status" role="status">{t('The video is unavailable. Explore the projects in my portfolio.')}</p>}
  </figure>
}

export default function PortfolioReel() {
  const { t } = useTranslation()

  return <section className="portfolio-reel" aria-labelledby="portfolio-reel-title">
    <div className="page-container">
      <div className="portfolio-reel__heading">
        <p className="portfolio-reel__eyebrow">{t('Selected work')}</p>
        <h2 id="portfolio-reel-title">{t('Every project, brought to life.')}</h2>
        <p className="portfolio-reel__intro">{t('Explore the Framer, WordPress, and WooCommerce projects behind my work.')}</p>
      </div>
      <ReelVideo
        src="/videos/solutions-portfolio.mp4"
        mobileSrc="/videos/solutions-portfolio-mobile.mp4"
        poster="/images/solutions/portfolio-reel.webp"
        mobilePoster="/images/solutions/portfolio-reel-mobile.webp"
        label={t('Portfolio reel')}
      />
    </div>
  </section>
}
