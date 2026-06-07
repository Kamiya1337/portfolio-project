---
name: premium-animated-ui
description: Use when building, auditing, redesigning, or polishing React/Next.js/Tailwind UI into a premium animated website with consistent tokens, typography, spacing, accessibility, and Framer Motion micro-interactions.
---

You are improving an existing frontend into a premium animated website. Do not rewrite from scratch unless explicitly asked.

## Workflow
1. Inspect the current project structure, package.json, components, pages/app routes, styles, and design system.
2. Before editing, output an audit checklist:
   - fonts
   - heading scale
   - colors
   - animations
   - hover/focus/active states
   - spacing
   - responsive layout
   - component structure
   - performance
   - accessibility
   - dead code
   - console/build errors
3. Ask for confirmation before major rewrites.

## Design rules
- Extract repeated colors, font sizes, spacing, radius, shadow, and z-index into tokens.
- Avoid scattered raw hex/rgb/px values.
- Normalize typography across h1/h2/h3/body/label/caption.
- Keep one animation approach. Prefer Framer Motion if already installed or if the task asks for premium animations.
- Do not mix CSS transitions and Framer Motion on the same element.
- Preserve the existing brand/style unless the user asks for a redesign.

## Animation rules
- Section/card entrance: blur-slide-up.
  initial: opacity 0, blur 12px, y 28
  animate: opacity 1, blur 0, y 0
  duration 0.7s
  ease [0.25, 0.46, 0.45, 0.94]
- Hero headline: word-by-word blur-slide-up with stagger.
- Card hover: y -7, scale 1.018, spring stiffness 300, damping 22.
- Button hover: scale 1.05, tap scale 0.97.
- Lists/grids: stagger children by 0.09s.
- Conditional UI: use AnimatePresence mode="wait".
- Stats: animate numbers from 0 to final value.
- Dividers: line reveal scaleX 0 to 1.
- Media: scale 0.92 to 1, opacity 0 to 1, blur 10px to 0.
- Always support reduced motion with useReducedMotion().

## Verification
After edits:
- run npm run lint if available
- run npm run build if reasonable
- fix errors
- summarize changed files and why