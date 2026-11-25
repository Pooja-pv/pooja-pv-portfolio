import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from 'lucide-react'
import AmbientField from './components/AmbientField'
import CapabilityMatrix from './components/CapabilityMatrix'
import DeliveryLine from './components/DeliveryLine'
import { Heading, SectionLabel, type Vars } from './components/Heading'
import Hero from './components/Hero'
import Lab from './components/Lab'
import Shipped from './components/Shipped'
import Toolbox from './components/Toolbox'
import { EMAIL, LINKS, PHONE, SHOW_PHONE, education, experience } from './data'
import { useActiveSection, usePageMotion } from './hooks'

const navItems: [string, string][] = [
  ['Capabilities', 'capabilities'],
  ['Projects', 'shipped'],
  ['Toolbox', 'toolbox'],
  ['Lab', 'lab'],
  ['Experience', 'experience'],
  ['Contact', 'contact']
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const active = useActiveSection(['top', ...navItems.map(([, id]) => id)])
  usePageMotion()

  const closeMenu = () => setMenuOpen(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <AmbientField />
      <div className="cursor-light" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Pooja P V, back to top">
          <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span>Pooja PV</span>
        </a>
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, id], i) => (
            <a key={id} href={`#${id}`} onClick={closeMenu} style={{ '--n': i } as Vars} aria-current={active === id ? 'true' : undefined}>{label}</a>
          ))}
          <a className="nav-resume" href={LINKS.resume} download>Resume <ArrowDown size={13} /></a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <section className="band" id="capabilities">
          <div className="wrap">
            <SectionLabel index="01">Engineering strengths</SectionLabel>
            <div className="section-head">
              <Heading text="Engineering work, backed by evidence." />
              <p data-reveal>Nine engineering capabilities, each linked to the project or role where I applied it. Select a row to inspect the evidence.</p>
            </div>
            <CapabilityMatrix />
          </div>
        </section>

        <section className="band" id="shipped">
          <div className="wrap">
            <SectionLabel index="02">Selected projects</SectionLabel>
            <div className="section-head">
              <Heading text="Three projects. Built, deployed and ready to explore." />
              <p data-reveal>Explore the deployed application or inspect its source. Hosted services may take a moment to wake from inactivity.</p>
            </div>
            <Shipped />
            <div className="subhead">
              <Heading as="h3" text="How code reaches production" />
            </div>
            <DeliveryLine />
          </div>
        </section>

        <section className="band" id="toolbox">
          <div className="wrap">
            <SectionLabel index="03">Technology stack</SectionLabel>
            <div className="section-head">
              <Heading text="Tools behind the work." />
              <p data-reveal>A focused view of the languages, frameworks, databases and delivery tools I have used in projects and professional experience.</p>
            </div>
            <Toolbox />
          </div>
        </section>

        <section className="band" id="lab">
          <div className="wrap">
            <SectionLabel index="04">Under the hood</SectionLabel>
            <div className="section-head">
              <Heading text="Explore the request lifecycle." />
              <p data-reveal>Four small simulations of how these systems behave. Nothing here calls a real server.</p>
            </div>
            <Lab />
          </div>
        </section>

        <section className="band" id="experience">
          <div className="wrap">
            <SectionLabel index="05">Experience</SectionLabel>
            <div className="section-head">
              <Heading text="Where I have worked." />
              <p data-reveal>An internship in Python and web development, and a year of troubleshooting and automation at an airport authority.</p>
            </div>
            <ol className="timeline">
              {experience.map(job => (
                <li className={`timeline-item ${job.current ? 'current' : ''}`} key={job.role} data-reveal>
                  <p className="timeline-date">{job.dates}</p>
                  <div>
                    <div className="timeline-head">
                      <div><h3>{job.role}</h3><p>{job.org}</p></div>
                      {job.current && <span className="current-tag">Current</span>}
                    </div>
                    <ul>{job.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </li>
              ))}
            </ol>
            <div className="education" data-reveal>
              <div><p className="micro">Education</p><h3>{education.degree}</h3><p>{education.school}</p></div>
              <p className="education-dates">{education.dates}</p>
            </div>
          </div>
        </section>

        <section className="band contact" id="contact">
          <div className="wrap contact-grid">
            <div>
              <SectionLabel index="06">Contact</SectionLabel>
              <Heading text="Building with Python and Django? Let’s talk." />
              <p className="contact-lede" data-reveal>I’m interested in junior Python, Django and backend opportunities where I can contribute to reliable APIs, thoughtful data models and well-tested features. Email is the best way to reach me.</p>
              <div className="contact-actions" data-reveal>
                <a className="button button-solid" href={`mailto:${EMAIL}`}>Email Pooja <ArrowUpRight size={15} /></a>
                <button type="button" className="button button-line" onClick={copyEmail}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Email copied' : 'Copy email'}
                </button>
              </div>
            </div>
            <div className="contact-links" data-reveal>
              <a href={`mailto:${EMAIL}`}><span>Email</span><b>{EMAIL}</b><ArrowUpRight size={16} /></a>
              {SHOW_PHONE && <a href={`tel:${PHONE.replace(/\s/g, '')}`}><span>Phone</span><b>{PHONE}</b><ArrowUpRight size={16} /></a>}
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>linkedin.com/in/poojapv</b><ArrowUpRight size={16} /></a>
              <a href={LINKS.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>github.com/Pooja-pv</b><ArrowUpRight size={16} /></a>
              <a href={LINKS.resume} download><span>Resume</span><b>Download PDF</b><ArrowDown size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-row">
          <span>© 2026 Pooja P V</span>
          <span>Kerala, India</span>
          <a href="#top">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  )
}

export default App
