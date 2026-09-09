import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/projects'
import './StackedProjects.css'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
}

function StackedProjectCard({ project, index }) {
  const { t } = useTranslation()
  const number = String(index + 1).padStart(2, '0')
  return <article className="stacked-project-card" style={{ zIndex: index + 1 }}>
    <div className="stacked-project-card__inner theme-light">
      <div className="stacked-project-copy">
        <div className="stacked-project-meta"><span>{number}</span><span>{project.client}</span></div>
        <div>
          <p className="stacked-project-tools">{project.title}</p>
          <h2>{project.client}</h2>
          <p className="stacked-project-description">{t(project.description)}</p>
          <a className="stacked-project-link" href={project.href} target="_blank" rel="noreferrer">{t('View live project')} <ArrowIcon /></a>
        </div>
      </div>
      <a className="stacked-project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={t('Open {{client}} project', { client: project.client })}>
        <img src={project.image} alt={t('{{client}} website preview', { client: project.client })} loading={index < 2 ? 'eager' : 'lazy'} />
      </a>
    </div>
  </article>
}

export default function StackedProjects() {
  const { t } = useTranslation()
  const scope = useRef(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray('.stacked-project-card', scope.current)
    const panels = cards.map((card) => ({
      card,
      copy: card.querySelector('.stacked-project-copy'),
      visual: card.querySelector('.stacked-project-visual'),
    }))
    const updateCardHeights = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
      panels.forEach(({ card, copy, visual }) => {
        card.style.setProperty('--stacked-card-height', `${card.offsetHeight / rem}rem`)
        card.style.setProperty('--stacked-copy-height', `${copy.offsetHeight / rem}rem`)
        card.style.setProperty('--stacked-visual-height', `${visual.offsetHeight / rem}rem`)
      })
      ScrollTrigger.refresh()
    }
    // Measure both panels so mobile copy can scroll over its preview before the card sticks.
    const resizeObserver = new ResizeObserver(updateCardHeights)
    panels.forEach(({ card, copy, visual }) => {
      resizeObserver.observe(card)
      resizeObserver.observe(copy)
      resizeObserver.observe(visual)
    })
    updateCardHeights()

    const media = gsap.matchMedia()
    media.add({
      mobile: '(max-width: 48em)',
      motion: '(prefers-reduced-motion: no-preference)',
    }, ({ conditions }) => {
      // Mobile uses nested sticky panels; a transformed parent would move the preview with the copy.
      if (conditions.mobile || !conditions.motion) return

      cards.forEach((card, index) => {
        const inner = card.querySelector('.stacked-project-card__inner')
        gsap.fromTo(inner,
          { y: index === 0 ? '0rem' : '6.875rem' },
          {
            y: '0rem',
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 17%', scrub: .7 },
          },
        )
      })
    })

    return () => {
      resizeObserver.disconnect()
      media.revert()
      cards.forEach((card) => {
        card.style.removeProperty('--stacked-card-height')
        card.style.removeProperty('--stacked-copy-height')
        card.style.removeProperty('--stacked-visual-height')
      })
    }
  }, { scope })

  return <section className="stacked-projects" id="portfolio" ref={scope} aria-labelledby="stacked-projects-title">
    <div className="page-container stacked-projects-heading">
      <p>{t('Scroll through the archive')}</p>
      <h2 id="stacked-projects-title">{t('Featured projects')}</h2>
    </div>
    <div className="page-container stacked-project-list">
      {projects.map((project, index) => <StackedProjectCard project={project} index={index} key={project.client} />)}
    </div>
  </section>
}
