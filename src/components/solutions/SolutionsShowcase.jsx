import { useTranslation } from 'react-i18next'
import { projects } from '../../data/projects'
import ProjectTabs from './ProjectTabs'
import ProjectPreview from './ProjectPreview'
import './SolutionsShowcase.css'

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
}

export default function SolutionsShowcase() {
  const { t } = useTranslation()

  return <ProjectTabs
    projects={projects}
    renderPreview={(project, index) => <ProjectPreview
      project={project}
      previousProject={projects[(index - 1 + projects.length) % projects.length]}
      nextProject={projects[(index + 1) % projects.length]}
    />}
  >
    {({ project, tabList, panels }) => <div className="page-container solutions-showcase">
      <div className="solutions-copy">
        <p className="solutions-eyebrow">{t('Home')}</p>
        <h1 id="solutions-title">{t('Web solutions for real business.')}</h1>
        <p className="solutions-intro">{t('From Seleqt and ClearCRM to Joss Home, explore the websites I build with Framer, WordPress, and WooCommerce.')}</p>
        {tabList}
        <div className="solutions-actions">
          <a className="solutions-primary-link" href={project.href} target="_blank" rel="noopener noreferrer">
            {t('View live project')}<ArrowIcon />
          </a>
          <a className="solutions-portfolio-link" href="/portfolio">{t('Explore portfolio')}<ArrowIcon /></a>
        </div>
        <div className="solutions-project-details" aria-live="polite" aria-atomic="true">
          <h2>{project.client}</h2>
          <p>{t(project.description)}</p>
        </div>
      </div>
      <div className="solutions-visual">{panels}</div>
    </div>}
  </ProjectTabs>
}
