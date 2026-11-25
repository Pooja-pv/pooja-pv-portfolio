import { useEffect, useState } from 'react'
import { useInView } from '../hooks'
import type { Vars } from './Heading'

type NodeId = 'client' | 'api' | 'db'

const nodes: { id: NodeId; title: string; sub: string }[] = [
  { id: 'client', title: 'React + TypeScript', sub: 'Client' },
  { id: 'api', title: 'Django REST Framework', sub: 'Authentication · validation · permissions' },
  { id: 'db', title: 'PostgreSQL', sub: 'Relational data' }
]

const requests = [
  { line: 'POST /api/tickets/', status: '201 Created', tone: 'ok', note: 'Validated, saved, returned.' },
  { line: 'GET /api/tickets/?search=vpn', status: '200 OK', tone: 'ok', note: 'Searched and paginated in the database.' },
  { line: 'GET /api/tickets/104/ as another employee', status: '403 Forbidden', tone: 'deny', note: 'Object-level permission stops it before the database.' }
] as const

const PHASES = 6
const route = (tone: 'ok' | 'deny'): NodeId[] =>
  tone === 'ok' ? ['client', 'api', 'db', 'api', 'client', 'client'] : ['client', 'api', 'api', 'api', 'client', 'client']

/** A looping, clearly simulated request that shows where each layer does its work. */
export default function RequestFlow() {
  const { ref, visible, animate } = useInView<HTMLDivElement>(0.2)
  const [tick, setTick] = useState(animate ? 0 : 4)

  useEffect(() => {
    if (!visible || !animate) return
    const id = window.setInterval(() => setTick(t => t + 1), 820)
    return () => window.clearInterval(id)
  }, [visible, animate])

  const phase = tick % PHASES
  const req = requests[Math.floor(tick / PHASES) % requests.length]
  const path = route(req.tone)
  const at = path[phase]
  const done = phase >= 4

  return (
    <div
      ref={ref}
      className="flow"
      role="img"
      aria-label="Simulated request travelling from the React client, through the Django REST API, to PostgreSQL and back"
      style={{ '--n': nodes.findIndex(n => n.id === at) } as Vars}
    >
      <div className="flow-top">
        <span>simulated request</span>
        <span className={`flow-dot ${animate ? 'is-live' : ''}`} />
      </div>
      <div className="flow-log">
        <code>{req.line}</code>
        <b className={`flow-status ${req.tone} ${done ? 'show' : ''}`}>{req.status}</b>
      </div>
      <div className="flow-stack">
        <span className="flow-packet" />
        {nodes.map((node, i) => (
          <div key={node.id} className={`flow-node ${at === node.id ? 'is-on' : ''} ${req.tone === 'deny' && node.id === 'db' ? 'is-idle' : ''}`}>
            <small>{String(i + 1).padStart(2, '0')} · {node.sub}</small>
            <b>{node.title}</b>
          </div>
        ))}
      </div>
      <p className="flow-note">{done ? req.note : ' '}</p>
    </div>
  )
}
