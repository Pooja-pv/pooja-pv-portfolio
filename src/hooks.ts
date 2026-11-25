import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True when looping and scroll-triggered motion should run. */
export const canAnimate = () =>
  typeof window !== 'undefined' && 'IntersectionObserver' in window && !prefersReducedMotion()

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(pointer: coarse)').matches

/** Reports whether an element is on screen. `animate` is false for reduced-motion users and old browsers. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [animate] = useState(canAnimate)
  const [visible, setVisible] = useState(!animate)
  useEffect(() => {
    const el = ref.current
    if (!animate || !el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [animate, threshold])
  return { ref, visible, animate }
}

/** Counts from 0 to `target` once `active` turns true. Returns `target` straight away when motion is off. */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(canAnimate() ? 0 : target)
  useEffect(() => {
    if (!active || !canAnimate()) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])
  return value
}

/**
 * Page-level motion wiring, done once:
 *  - marks the page `motion-ok` and reveals `[data-reveal]` elements as they enter the viewport
 *  - tracks scroll progress for the top bar
 *  - tracks the pointer for the cursor light, card spotlights, tilt and magnetic buttons
 */
export function usePageMotion() {
  useLayoutEffect(() => {
    if (!canAnimate()) return
    const root = document.documentElement
    root.classList.add('motion-ok')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    )
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('motion-ok')
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const bar = document.querySelector<HTMLElement>('.scroll-progress')
    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        const scrollable = root.scrollHeight - window.innerHeight
        if (bar) bar.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`
        root.style.setProperty('--scroll', String(window.scrollY))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let removePointer = () => {}
    if (!prefersReducedMotion() && !isCoarsePointer()) {
      let frame = 0
      let last: PointerEvent | null = null
      const apply = () => {
        frame = 0
        const e = last
        if (!e) return
        root.style.setProperty('--cx', `${e.clientX}px`)
        root.style.setProperty('--cy', `${e.clientY}px`)
        const target = e.target instanceof Element ? e.target : null
        const spot = target?.closest<HTMLElement>('[data-spot]')
        if (spot) {
          const b = spot.getBoundingClientRect()
          spot.style.setProperty('--sx', `${e.clientX - b.left}px`)
          spot.style.setProperty('--sy', `${e.clientY - b.top}px`)
        }
        const tilt = target?.closest<HTMLElement>('[data-tilt]')
        if (tilt) {
          const b = tilt.getBoundingClientRect()
          tilt.style.setProperty('--tx', ((e.clientX - b.left) / b.width - 0.5).toFixed(3))
          tilt.style.setProperty('--ty', ((e.clientY - b.top) / b.height - 0.5).toFixed(3))
        }
        const magnet = target?.closest<HTMLElement>('.button')
        if (magnet) {
          const b = magnet.getBoundingClientRect()
          magnet.style.setProperty('--mx', `${((e.clientX - b.left) / b.width - 0.5) * 10}px`)
          magnet.style.setProperty('--my', `${((e.clientY - b.top) / b.height - 0.5) * 8}px`)
        }
      }
      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return
        root.classList.add('has-pointer')
        last = e
        if (!frame) frame = requestAnimationFrame(apply)
      }
      const onOut = (e: PointerEvent) => {
        const from = e.target instanceof Element ? e.target : null
        const to = e.relatedTarget instanceof Node ? e.relatedTarget : null
        const tilt = from?.closest<HTMLElement>('[data-tilt]')
        if (tilt && !(to && tilt.contains(to))) {
          tilt.style.setProperty('--tx', '0')
          tilt.style.setProperty('--ty', '0')
        }
        const magnet = from?.closest<HTMLElement>('.button')
        if (magnet && !(to && magnet.contains(to))) {
          magnet.style.setProperty('--mx', '0px')
          magnet.style.setProperty('--my', '0px')
        }
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerout', onOut)
      removePointer = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerout', onOut)
        cancelAnimationFrame(frame)
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(scrollFrame)
      removePointer()
    }
  }, [])
}

/** Which section is under the reading line, for the navigation indicator. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  const key = ids.join('|')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    key.split('|').forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [key])
  return active
}
