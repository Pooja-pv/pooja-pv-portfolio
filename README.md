# Pooja P V — Portfolio

A recruiter-focused portfolio positioning Pooja P V as a Python / Django Developer. It presents: project-specific evidence, three deployed applications, a delivery line, a focused engineering toolbox, illustrative API simulations, and experience.

Stack: React, TypeScript, Vite, Motion, Lucide. No 3D library; the moving background is one 2D canvas.

## Run

```bash
npm install
npm run dev        # local development
npm test           # unit tests (Vitest + Testing Library)
npm run build      # type-check and production build
```

## Where to change things

| What | Where |
| --- | --- |
| All text, links, projects, skills, matrix evidence | `src/data.ts` |
| Show the phone number | set `SHOW_PHONE = true` in `src/data.ts` |
| Colours | the tokens at the top of `src/styles.css` (`:root`) |
| Background motion | `src/components/AmbientField.tsx` |
| Capability matrix | `src/components/CapabilityMatrix.tsx` |
| Resume PDF | `public/Pooja-PV-Junior-Django-Developer.pdf` |

## Content rules

Every line comes from the resume, plus data structures & algorithms and SDLC, which Pooja confirmed. The Lab section is clearly labelled as simulation. Do not add numbers or claims that the resume does not support.

## Motion and accessibility

- Visitors who prefer reduced motion get the same page standing still: no loops, no scroll reveals, a single still frame in the background.
- Looping animations pause while off screen or when the tab is hidden.
- Pointer effects (cursor light, card spotlight, tilt) are off on touch devices.
- Keyboard: skip link, visible focus, buttons for every interactive row.

## Deploy

`vercel.json` is included. Any static host works with the `dist/` output of `npm run build`.
