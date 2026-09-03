import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import './Projects.css'

function ProjectCard({ project, t }) {
  return <a className="project-card" href={project.href} target="_blank" rel="noreferrer" aria-label={t('Open {{client}} project', { client: project.client })}>
    <figure className="project-preview"><img src={project.image} alt={t('{{client}} website preview', { client: project.client })} loading="lazy" /></figure>
    <p>{project.client}</p><h2>{project.title}</h2>
  </a>
}

export default function Projects() {
  const { t } = useTranslation()
  return <section className="projects-section" id="portfolio" aria-label={t('Selected projects')}><div className="page-container"><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.client} project={project} t={t} />)}</div><a className="more-projects" href="/portfolio">{t('See more works')} <span aria-hidden="true">→</span></a></div></section>
}
