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
    <div className="stacked-project-card__inner">
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
    const media = gsap.matchMedia()
    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray('.stacked-project-card', scope.current)

      cards.forEach((card, index) => {
        const inner = card.querySelector('.stacked-project-card__inner')
        gsap.fromTo(inner,
          { y: index === 0 ? 0 : 110 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 17%', scrub: .7 },
          },
        )
      })
    })

    return () => media.revert()
  }, { scope })

  return <section className="stacked-projects" ref={scope} aria-labelledby="stacked-projects-title">
    <div className="page-container stacked-projects-heading">
      <p>{t('Scroll through the archive')}</p>
      <h2 id="stacked-projects-title">{t('Featured projects')}</h2>
    </div>
    <div className="page-container stacked-project-list">
      {projects.map((project, index) => <StackedProjectCard project={project} index={index} key={project.client} />)}
    </div>
  </section>
}
