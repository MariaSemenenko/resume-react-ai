import './Projects.css'

import { projects } from '../data/projects'

function ProjectCard({ project }) {
  return <a className="project-card" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.client} project`}>
    <figure className="project-preview"><img src={project.image} alt={`${project.client} website preview`} loading="lazy" /></figure>
    <p>{project.client}</p><h2>{project.title}</h2>
  </a>
}

export default function Projects() {
  return <section className="projects-section" id="portfolio" aria-label="Selected projects"><div className="page-container"><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.client} project={project} />)}</div><a className="more-projects" href="/portfolio">See more works <span aria-hidden="true">→</span></a></div></section>
}
