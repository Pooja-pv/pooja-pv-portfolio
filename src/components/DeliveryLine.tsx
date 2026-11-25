import { useInView } from '../hooks'
import type { Vars } from './Heading'

const steps = [
  { title: 'Commit', detail: 'Git · GitHub' },
  { title: 'Test', detail: 'pytest' },
  { title: 'Check', detail: 'GitHub Actions CI' },
  { title: 'Deploy', detail: 'Render' },
  { title: 'Live', detail: 'Three apps online' }
]

/** Code to running app, drawn as a line a pulse travels along. CSS only, paused while off screen. */
export default function DeliveryLine() {
  const { ref, visible } = useInView<HTMLDivElement>(0.3)
  return (
    <div ref={ref} className={`delivery ${visible ? 'is-live' : ''}`} data-reveal>
      <ol aria-label="From commit to a live application">
        {steps.map((step, i) => (
          <li key={step.title} style={{ '--i': i } as Vars}>
            <span className="d-node" aria-hidden="true" />
            <b>{step.title}</b>
            <small>{step.detail}</small>
          </li>
        ))}
      </ol>
      <span className="d-pulse" aria-hidden="true" />
      <p>HelpDesk Pro runs pytest and GitHub Actions checks on its code. All three applications are deployed on Render.</p>
    </div>
  )
}
