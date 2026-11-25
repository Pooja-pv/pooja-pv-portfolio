import { Fragment, type CSSProperties } from 'react'

export type Vars = CSSProperties & Record<`--${string}`, string | number>

/** A section heading whose words rise through a mask when it scrolls into view. */
export function Heading({ text, as: Tag = 'h2', className = '' }: { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string }) {
  const words = text.split(' ')
  return (
    <Tag className={`split ${className}`.trim()} aria-label={text} data-reveal>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="w" aria-hidden="true" style={{ '--i': i } as Vars}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="section-label" data-reveal>
      <b>{index}</b>
      <i aria-hidden="true" />
      {children}
    </p>
  )
}
