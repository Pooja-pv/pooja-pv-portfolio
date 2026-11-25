import { useEffect, useRef } from 'react'
import { canAnimate } from '../hooks'

type Dot = { x: number; y: number; vx: number; vy: number; r: number; depth: number; warm: boolean; phase: number }

/**
 * The fixed backdrop of the whole site: drifting points that link when they pass close to each other
 * and bend toward the cursor. One 2D canvas, no libraries. It stops when the tab is hidden and
 * draws a single still frame for visitors who prefer reduced motion.
 */
export default function AmbientField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas ? canvas.getContext('2d') : null
    if (!canvas || !ctx) return

    const animate = canAnimate()
    let w = 0
    let h = 0
    let dots: Dot[] = []
    let raf = 0
    const pointer = { x: -9999, y: -9999 }

    const seed = () => {
      const count = Math.round(Math.min(110, Math.max(34, (w * h) / 16000)))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 0.7 + Math.random() * 1.7,
        depth: 0.25 + Math.random() * 0.75,
        warm: Math.random() < 0.22,
        phase: Math.random() * Math.PI * 2
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const link = w < 700 ? 92 : 132
      const link2 = link * link
      const reach = 170
      const scrollShift = window.scrollY * 0.22
      const pos = dots.map(d => {
        if (animate) {
          d.x += d.vx + Math.sin(t * 0.0003 + d.phase) * 0.09
          d.y += d.vy + Math.cos(t * 0.00026 + d.phase) * 0.09
          if (d.x < -20) d.x = w + 20
          if (d.x > w + 20) d.x = -20
          if (d.y < -20) d.y = h + 20
          if (d.y > h + 20) d.y = -20
          const dx = pointer.x - d.x
          const dy = pointer.y - (((d.y - scrollShift * d.depth) % h) + h) % h
          const dist = Math.hypot(dx, dy)
          if (dist < reach && dist > 1) {
            const pull = (1 - dist / reach) * 0.55
            d.x += (dx / dist) * pull
            d.y += (dy / dist) * pull
          }
        }
        return { x: d.x, y: (((d.y - scrollShift * d.depth) % h) + h) % h }
      })

      ctx.lineWidth = 0.7
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = pos[i].x - pos[j].x
          const dy = pos[i].y - pos[j].y
          const d2 = dx * dx + dy * dy
          if (d2 > link2) continue
          const near =
            Math.hypot(pos[i].x - pointer.x, pos[i].y - pointer.y) < reach ||
            Math.hypot(pos[j].x - pointer.x, pos[j].y - pointer.y) < reach
          const alpha = (1 - Math.sqrt(d2) / link) * (near ? 0.5 : 0.2)
          ctx.strokeStyle = near ? `rgba(246,201,142,${alpha})` : `rgba(110,231,207,${alpha})`
          ctx.beginPath()
          ctx.moveTo(pos[i].x, pos[i].y)
          ctx.lineTo(pos[j].x, pos[j].y)
          ctx.stroke()
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const twinkle = 0.45 + 0.35 * Math.sin(t * 0.0011 + d.phase)
        ctx.fillStyle = d.warm ? `rgba(229,138,82,${twinkle + 0.2})` : `rgba(150,240,222,${twinkle})`
        ctx.beginPath()
        ctx.arc(pos[i].x, pos[i].y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (animate && !raf) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const resize = () => {
      const widthChanged = window.innerWidth !== w
      const dpr = Math.min(window.innerWidth < 700 ? 1.5 : 2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (widthChanged || dots.length === 0) seed()
      if (!animate) draw(0)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        pointer.x = -9999
        pointer.y = -9999
      }
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="ambient-field" aria-hidden="true" />
}
