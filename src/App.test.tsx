import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { capabilities, projects, toolbox } from './data'

describe('portfolio', () => {
  it('shows the identity from the resume and every section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /pooja p v/i })).toBeInTheDocument()
    expect(screen.getByText(/python \/ django developer · rest apis & full-stack delivery/i)).toBeInTheDocument()
    for (const name of [/engineering work, backed by evidence/i, /three projects. built, deployed and ready to explore/i, /tools behind the work/i, /explore the request lifecycle/i, /where i have worked/i]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main-content')
  })

  it('links every project to its live Render app and its repository', () => {
    render(<App />)
    expect(projects.map(p => p.live)).toEqual([
      'https://helpdesk-pro-l0ra.onrender.com',
      'https://trackora-nhvz.onrender.com',
      'https://hireflow-dlqi.onrender.com'
    ])
    for (const project of projects) {
      expect(screen.getByRole('link', { name: `Open ${project.name} live app` })).toHaveAttribute('href', project.live)
      expect(screen.getByRole('link', { name: `${project.name} source code on GitHub` })).toHaveAttribute('href', project.repo)
    }
  })

  it('does not mention DayWeave or call Trackora unfinished', () => {
    render(<App />)
    expect(screen.queryByText(/dayweave/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/in development/i)).not.toBeInTheDocument()
  })

  it('lists the resume skills plus data structures & algorithms and SDLC', () => {
    render(<App />)
    const all = toolbox.flatMap(g => g.items)
    for (const skill of ['Django REST Framework', 'Render', 'Postman', 'Docker', 'Docker Compose', 'Data Structures & Algorithms', 'SDLC']) {
      expect(all).toContain(skill)
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it('reveals the resume evidence behind a capability when its row is chosen', () => {
    render(<App />)
    const proof = document.getElementById('matrix-proof') as HTMLElement
    const row = screen.getByRole('button', { name: /authentication & authorization/i })
    fireEvent.click(row)
    expect(row).toHaveAttribute('aria-pressed', 'true')
    expect(within(proof).getByRole('heading', { name: /authentication & authorization/i })).toBeInTheDocument()
    expect(within(proof).getByText(/session authentication, csrf protection and user-scoped data access/i)).toBeInTheDocument()
  })

  it('backs every capability with at least one line of evidence', () => {
    for (const cap of capabilities) {
      expect(Object.values(cap.evidence).length).toBeGreaterThan(0)
    }
  })

  it('runs the API simulation locally', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /send simulated request/i }))
    expect(screen.getByText('201 CREATED')).toBeInTheDocument()
    expect(screen.getByText(/mock response · illustrative payload only/i)).toBeInTheDocument()
  })

  it('exposes the mobile navigation state to assistive technology', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /open navigation/i })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toHaveClass('is-open')
  })

  it('keeps the resume download and the corrected LinkedIn link', () => {
    render(<App />)
    expect(screen.getAllByRole('link', { name: /resume/i })[0]).toHaveAttribute('href', '/Pooja-PV-Junior-Django-Developer.pdf')
    expect(screen.getAllByRole('link', { name: /linkedin/i })[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/poojapv/')
  })
})
