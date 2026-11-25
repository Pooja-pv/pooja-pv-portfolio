import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronRight, Database, LockKeyhole, Network, Play, Terminal, X } from 'lucide-react'
import { apiDemos, architectureLayers, dbTables, rolePermissions } from '../data'

/** Four small simulations. Everything runs locally; no request ever leaves the page. */
export default function Lab() {
  const [layer, setLayer] = useState(0)
  const [apiIndex, setApiIndex] = useState(1)
  const [apiRan, setApiRan] = useState(false)
  const [role, setRole] = useState('Employee')
  const [table, setTable] = useState(1)

  const api = apiDemos[apiIndex]
  const perms = rolePermissions[role]

  return (
    <div className="lab">
      <div className="lab-card wide" data-spot data-reveal>
        <header><span className="lab-icon"><Network size={16} /></span><div><h3>Follow a request</h3><p>Choose a layer to see what it is responsible for</p></div></header>
        <div className="lab-split">
          <div className="layers">
            {architectureLayers.map((item, i) => (
              <button key={item.name} type="button" className={layer === i ? 'active' : ''} aria-pressed={layer === i} onClick={() => setLayer(i)}>
                <span>{String(i + 1).padStart(2, '0')}</span><b>{item.name}</b><ChevronRight size={15} />
              </button>
            ))}
          </div>
          <div className="layer-detail" key={layer}>
            <p className="micro">{architectureLayers[layer].kind}</p>
            <p>{architectureLayers[layer].detail}</p>
            <code>{architectureLayers[layer].code}</code>
          </div>
        </div>
      </div>

      <div className="lab-card" data-spot data-reveal>
        <header><span className="lab-icon"><Terminal size={16} /></span><div><h3>Send a request</h3><p>A simulated REST exchange</p></div></header>
        <label className="field-label" htmlFor="api-select">Endpoint</label>
        <select id="api-select" value={apiIndex} onChange={e => { setApiIndex(Number(e.target.value)); setApiRan(false) }}>
          {apiDemos.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}
        </select>
        <div className="request-line"><b className={`method method-${api.method.toLowerCase()}`}>{api.method}</b><code>{api.endpoint}</code></div>
        <pre className="code-window">{api.body ? JSON.stringify(api.body, null, 2) : '// no request body'}</pre>
        <button type="button" className="run-button" onClick={() => setApiRan(true)}><Play size={13} fill="currentColor" /> Send simulated request</button>
        <AnimatePresence>
          {apiRan && (
            <motion.div className="response" role="status" aria-live="polite" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <div className={`response-status ${api.status.startsWith('4') ? 'deny' : ''}`}><span>Response</span><b>{api.status}</b></div>
              <pre className="code-window">{JSON.stringify(api.response, null, 2)}</pre>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="sim-note">Mock response · illustrative payload only</p>
      </div>

      <div className="lab-card" data-spot data-reveal>
        <header><span className="lab-icon"><LockKeyhole size={16} /></span><div><h3>Switch roles</h3><p>HelpDesk Pro separates employees, agents and administrators</p></div></header>
        <label className="field-label" htmlFor="role-select">Active role</label>
        <select id="role-select" value={role} onChange={e => setRole(e.target.value)}>
          {Object.keys(rolePermissions).map(r => <option key={r}>{r}</option>)}
        </select>
        <div className="perm-cols">
          <div><span className="perm-head allowed">Allowed</span>{perms.allowed.map(p => <p key={p}><Check size={13} />{p}</p>)}</div>
          <div><span className="perm-head blocked">Restricted</span>{perms.blocked.length ? perms.blocked.map(p => <p key={p}><X size={13} />{p}</p>) : <p><Check size={13} />Nothing restricted in this simplified view</p>}</div>
        </div>
        <p className="sim-note">Illustrative permissions, not an export from the project.</p>
      </div>

      <div className="lab-card wide" data-spot data-reveal>
        <header><span className="lab-icon"><Database size={16} /></span><div><h3>Read the data model</h3><p>A simplified, conceptual model in the style of Trackora</p></div></header>
        <div className="lab-split">
          <div className="layers">
            {dbTables.map((t, i) => (
              <button key={t.name} type="button" className={table === i ? 'active' : ''} aria-pressed={table === i} onClick={() => setTable(i)}>
                <span>{String(i + 1).padStart(2, '0')}</span><b>{t.name}</b><ChevronRight size={15} />
              </button>
            ))}
          </div>
          <div className="layer-detail" key={table}>
            <p className="micro">table / {dbTables[table].name}</p>
            {dbTables[table].fields.map(f => (
              <div className="db-field" key={f}><span className={f.includes('PK') ? 'pk' : f.includes('FK') ? 'fk' : ''}>{f.includes('PK') ? '◆' : f.includes('FK') ? '↳' : '·'}</span>{f}</div>
            ))}
            <p>{dbTables[table].relation}</p>
          </div>
        </div>
        <p className="sim-note">Conceptual illustration, not a schema export.</p>
      </div>
    </div>
  )
}
