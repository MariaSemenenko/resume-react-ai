import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { projects } from '../../data/projects'
import { useSolutionsScroll } from '../../hooks/useSolutionsScroll'
import ScrollProjectCard from './ScrollProjectCard'
import SolutionCharacter from './SolutionCharacter'
import './SolutionsScrollSection.css'

const positions = [
  { x: 12, y: 15, mobileX: 16, mobileY: 12 },
  { x: 30, y: 34, mobileX: 25, mobileY: 35 },
  { x: 12, y: 60, mobileX: 15, mobileY: 59 },
  { x: 24, y: 84, mobileX: 24, mobileY: 83 },
  { x: 88, y: 15, mobileX: 84, mobileY: 12 },
  { x: 70, y: 34, mobileX: 75, mobileY: 35 },
  { x: 88, y: 60, mobileX: 85, mobileY: 59 },
  { x: 76, y: 84, mobileX: 76, mobileY: 83 },
]

export default function SolutionsScrollSection() {
  const { t, i18n } = useTranslation()
  const scope = useRef(null)
  useSolutionsScroll(scope, i18n.resolvedLanguage)

  return <section className="solutions-scroll" ref={scope} aria-labelledby="solutions-scroll-title">
    <div className="solutions-scroll__stage">
      <div className="page-container solutions-scroll__inner">
        <div className="solutions-scroll__heading">
          <p className="solutions-scroll__eyebrow">{t('From concept to launch')}</p>
          <h2 id="solutions-scroll-title">{t('Every project, brought to life.')}</h2>
          <p className="solutions-scroll__intro">{t('Explore the Framer, WordPress, and WooCommerce projects behind my work.')}</p>
        </div>
        <div className="solutions-scroll__scene">
          <div className="solutions-scroll__character">
            <SolutionCharacter />
          </div>
          {projects.map((project, index) => <ScrollProjectCard
            key={project.client}
            project={project}
            position={positions[index % positions.length]}
          />)}
        </div>
      </div>
    </div>
  </section>
}
