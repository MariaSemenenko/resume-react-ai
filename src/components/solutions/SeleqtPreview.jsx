import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProjectMedia from './ProjectMedia'
import './SeleqtPreview.css'

const details = [
  { side: 'left', image: '/images/animations/9.jpg' },
  { side: 'right', image: '/images/animations/10.jpg' },
]

export default function SeleqtPreview({ project }) {
  const { t } = useTranslation()
  const scene = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const element = scene.current
    let active = true
    // Start the shared clock only after every layer has loaded or failed.
    Promise.allSettled(Array.from(element.querySelectorAll('img'), (img) => img.decode()))
      .then(() => { if (active) setReady(true) })

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(element)
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)

    return () => {
      active = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  return <div
    ref={scene}
    className="solution-preview seleqt-preview"
    data-running={ready && visible && pageVisible}
  >
    <div className="seleqt-preview__halo" data-layer="halo" aria-hidden="true" />
    {details.map(({ side, image }) => <div
      key={side}
      className={'solution-preview-back seleqt-preview__detail seleqt-preview__detail--' + side}
      data-layer={side}
      aria-hidden="true"
    >
      <ProjectMedia project={{ ...project, image }} decorative />
    </div>)}
    <figure className="solution-preview-front" data-layer="center">
      <figcaption className="solution-preview-bar">
        <span className="solution-preview-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>{project.client}</span>
        <span className="solution-preview-dot" aria-hidden="true" />
      </figcaption>
      <ProjectMedia project={project} />
    </figure>
    <svg className="seleqt-preview__wave" viewBox="0 0 180 64" fill="none" aria-hidden="true">
      <path data-layer="line" pathLength="1" d="M4 44C27 44 26 12 51 12S79 52 104 44S132 15 168 25" />
      <path data-layer="arrow" d="m158 16 12 9-14 5" />
    </svg>
    <div className="solution-preview-label" data-layer="badge">
      <span>{t('Built with')}</span>
      <strong>{project.title}</strong>
    </div>
  </div>
}
