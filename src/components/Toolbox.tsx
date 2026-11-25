import { toolbox } from '../data'
import type { Vars } from './Heading'

export default function Toolbox() {
  return (
    <div className="toolbox">
      {toolbox.map((group, g) => (
        <section key={group.label} className="tool-group" data-spot data-reveal style={{ '--g': g } as Vars} aria-label={group.label}>
          <h3>{group.label}</h3>
          <ul>
            {group.items.map((item, i) => (
              <li key={item} style={{ '--i': i } as Vars}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
