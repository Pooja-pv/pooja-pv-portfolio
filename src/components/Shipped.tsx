import { ArrowUpRight, Check } from 'lucide-react'
import { projects } from '../data'

type Screenshot = { src: string; alt: string; label: string }
const previews: Record<string, Screenshot[]> = {
  helpdesk: [
    { src: '/projects/helpdesk-pro.png', alt: 'HelpDesk Pro employee support request form with issue details, category and priority', label: 'Ticket submission' },
  ],
  trackora: [
    { src: '/projects/trackora.png', alt: 'Trackora career workspace overview and job-search snapshot', label: 'Workspace overview' },
  ],
  hireflow: [
    { src: '/projects/hireflow.png', alt: 'HireFlow job discovery page with keyword, location and job type filters', label: 'Job search' },
  ],
}

export default function Shipped() {
  return (
    <div className="projects">
      {projects.map(project => {
        const screenshots = previews[project.id] ?? []
        return (
          <article key={project.id} className={`project project-${project.id}`} data-spot data-reveal aria-labelledby={`project-${project.id}`}>
            <div className="project-text">
              <p className="project-meta"><b>{project.number}</b>{project.kind}</p>
              <h3 id={`project-${project.id}`}>{project.name}</h3>
              <a className="live-chip" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} deployed on Render: ${project.live}`}>
                <span className="pulse" aria-hidden="true" />
                <span className="live-chip-label">Deployed on Render</span>
                <span className="live-chip-url">{project.live}</span>
              </a>
              <ul className="bullets">
                {project.bullets.map(b => (
                  <li key={b}><Check size={14} aria-hidden="true" />{b}</li>
                ))}
              </ul>
              <ul className="chips" aria-label={`${project.name} stack`}>
                {project.stack.map(s => <li key={s}>{s}</li>)}
              </ul>
              <div className="project-actions">
                <a className="button button-solid" href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live app`}>
                  Open live app <ArrowUpRight size={15} />
                </a>
                <a className="button button-line" href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.name} source code on GitHub`}>
                  Source code <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div className="project-visual project-gallery" aria-label={`${project.name} application screenshots`}>
              {screenshots.map(screenshot => (
                <figure className="project-shot" key={screenshot.src}>
                  <img className="project-screenshot" src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                  <figcaption>{screenshot.label}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}
