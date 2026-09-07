import { useTranslation } from 'react-i18next'
import ProjectMedia from './ProjectMedia'

export default function ProjectPreview({ project, previousProject, nextProject }) {
  const { t } = useTranslation()

  return <div className={`solution-preview${project.video ? ' solution-preview--video' : ''}`}>
    <div className="solution-preview-back solution-preview-back--left" aria-hidden="true">
      <ProjectMedia key={previousProject.client} project={previousProject} decorative />
    </div>
    <div className="solution-preview-back solution-preview-back--right" aria-hidden="true">
      <ProjectMedia key={nextProject.client} project={nextProject} decorative />
    </div>
    <figure className="solution-preview-front">
      <figcaption className="solution-preview-bar">
        <span className="solution-preview-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>{project.client}</span>
        <span className="solution-preview-dot" aria-hidden="true" />
      </figcaption>
      <ProjectMedia key={project.client} project={project} />
    </figure>
    <div className="solution-preview-label">
      <span>{t('Built with')}</span>
      <strong>{project.title}</strong>
    </div>
  </div>
}
