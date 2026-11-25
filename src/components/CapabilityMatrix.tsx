import { useEffect, useState } from 'react'
import { capabilities, columns } from '../data'
import { useInView } from '../hooks'
import type { Vars } from './Heading'

const AUTO_MS = 4600

/**
 * Nine capabilities against the five places they were used. A lit node is backed by a line of the resume;
 * choosing a row shows that line. Idle, it steps through the rows by itself.
 */
export default function CapabilityMatrix() {
  const { ref, visible, animate } = useInView<HTMLDivElement>(0.35)
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  const auto = animate && visible && !paused

  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setSelected(s => (s + 1) % capabilities.length), AUTO_MS)
    return () => window.clearInterval(id)
  }, [auto])

  const cap = capabilities[selected]
  const entries = columns.filter(col => cap.evidence[col.id])

  return (
    <div
      ref={ref}
      className={`matrix ${auto ? 'is-auto' : ''}`}
      style={{ '--auto': `${AUTO_MS}ms` } as Vars}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="matrix-board" data-spot role="group" aria-label="Capabilities, and where each one was used">
        <div className="matrix-head" aria-hidden="true">
          <span />
          <span className="heads">
            {columns.map(col => (
              <span className="col-head" key={col.id}>
                <em>{col.kind}</em>
                <b className="full">{col.label}</b>
                <b className="short">{col.short}</b>
              </span>
            ))}
          </span>
        </div>
        {capabilities.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`cap-row ${i === selected ? 'is-selected' : ''}`}
            aria-pressed={i === selected}
            aria-controls="matrix-proof"
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
          >
            <span className="cap-label">
              <i>{String(i + 1).padStart(2, '0')}</i>
              {c.label}
            </span>
            <span className="cells" aria-hidden="true">
              {columns.map((col, k) => (
                <span key={col.id} className={`cell ${c.evidence[col.id] ? 'on' : ''}`} style={{ '--k': k } as Vars} />
              ))}
            </span>
          </button>
        ))}
      </div>

      <aside className="proof" id="matrix-proof" aria-live="polite" data-spot>
        <p className="micro">Capability {String(selected + 1).padStart(2, '0')} of {capabilities.length}</p>
        <h3 key={cap.id}>{cap.label}</h3>
        <ul>
          {entries.map((col, i) => (
            <li key={`${cap.id}-${col.id}`} style={{ '--i': i } as Vars}>
              <span className="proof-tag">{col.kind} · {col.label}</span>
              <p>{cap.evidence[col.id]}</p>
            </li>
          ))}
        </ul>
        <p className="proof-foot">Each lit node is a line from my resume.</p>
      </aside>
    </div>
  )
}
