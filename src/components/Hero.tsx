import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { LINKS } from '../data'
import { useCountUp, useInView } from '../hooks'
import RequestFlow from './RequestFlow'
import type { Vars } from './Heading'

const stats = [
  { value: 3, label: 'applications deployed on Render' },
  { value: 3, label: 'REST API backends in Python' },
  { value: 2, label: 'hands-on roles: internship and apprenticeship' }
]

function Stat({ value, label, i }: { value: number; label: string; i: number }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.6)
  const shown = useCountUp(value, visible)
  return (
    <div ref={ref} className="stat" role="group" aria-label={`${value} ${label}`} style={{ '--i': i } as Vars}>
      <b aria-hidden="true">{shown}</b>
      <span aria-hidden="true">{label}</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker rise" style={{ '--d': '0.1s' } as Vars}>Python / Django Developer · REST APIs &amp; Full-stack delivery</p>
          <h1 aria-label="Pooja P V">
            {['Pooja', 'P', 'V'].map((part, i) => (
              <span className="name-mask" key={part} aria-hidden="true">
                <span className="name-part" style={{ '--d': `${0.2 + i * 0.12}s` } as Vars}>{part}</span>
              </span>
            ))}
          </h1>
          <p className="lead rise" style={{ '--d': '0.62s' } as Vars}>
            I build Python and Django applications with a focus on REST APIs, secure access control and relational data. I also work across React and TypeScript interfaces, automated tests and deployment workflows.
          </p>
          <div className="hero-actions rise" style={{ '--d': '0.78s' } as Vars}>
            <a className="button button-solid" href="#shipped">Explore the projects <ArrowUpRight size={16} /></a>
            <a className="button button-line" href={LINKS.resume} download>Download resume <ArrowDown size={16} /></a>
          </div>
          <div className="hero-links rise" style={{ '--d': '0.9s' } as Vars}>
            <a href={LINKS.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          </div>
        </div>
        <div className="hero-visual rise" style={{ '--d': '0.5s' } as Vars}>
          <RequestFlow />
        </div>
      </div>
      <div className="wrap">
        <div className="stats">
          {stats.map((s, i) => <Stat key={s.label} {...s} i={i} />)}
        </div>
      </div>
    </section>
  )
}
