import './Projects.css'

const imageBase = 'https://dev-08.semenenko.pp.ua'

const projects = [
  { client: 'Joss Home', title: 'WooCommerce ACF Timber Woodmart', href: 'https://joss-home.com/', image: 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images/Screenshot_2.png' },
  { client: 'ClearCRM', title: 'ACF/Elementor', href: 'https://clearcrm.com/', image: 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images/Screenshot_6.1.png' },
  { client: 'Aquatoria', title: 'Advanced Custom Fields PRO Teamwork', href: 'https://aquatoria.kiev.ua/', image: 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images/Screenshot_7.1.png' },
  { client: 'Bike & Car', title: 'Elementor PRO', href: 'https://bcservice.ee/', image: 'https://dev-08.semenenko.pp.ua/wp-content/themes/libro/assets/images/Screenshot_7.png' },
  { client: 'Transcontrol', title: 'ACF PRO WPML Teamwork', href: 'https://transcontrol.com.ua/', image: `${imageBase}/wp-content/uploads/2025/08/trans.png` },
  { client: 'Amykannsculptor', title: 'Elementor', href: 'https://www.amykannsculptor.com/', image: `${imageBase}/wp-content/uploads/2026/08/amyka.png` },
  { client: 'Easybooks', title: 'Elementor', href: 'https://easybooks.software/', image: `${imageBase}/wp-content/uploads/2026/08/esb.png` },
]

function ProjectCard({ project }) {
  return <a className="project-card" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.client} project`}>
    <figure className="project-preview"><img src={project.image} alt={`${project.client} website preview`} loading="lazy" /></figure>
    <p>{project.client}</p><h2>{project.title}</h2>
  </a>
}

export default function Projects() {
  return <section className="projects-section" id="portfolio" aria-label="Selected projects"><div className="page-container"><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.client} project={project} />)}</div><a className="more-projects" href="#all-projects">See more works <span aria-hidden="true">→</span></a></div></section>
}
