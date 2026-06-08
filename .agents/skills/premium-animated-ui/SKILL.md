---
name: premium-animated-ui
description: Use when rebuilding React/Vite/Tailwind UI into a dark luxury cinematic animated website with strong visual direction, Framer Motion, premium spacing, video hero integration, and visible scroll interactions.
---

You are not doing minor UI cleanup. You are rebuilding an existing frontend into a premium animated luxury website.

## Core Rule

If the user says the UI is ugly, flat, not luxury, not cinematic, or not like the reference video:

- Do not preserve the old visual style.
- Do not only add small hover effects.
- Do not only wrap existing components with motion.
- Rebuild the affected sections if needed.
- Make visible, meaningful design changes.

## Target Art Direction

Build toward:

- dark luxury cinematic visual system
- premium animated landing page
- immersive visual storytelling
- black / deep green / cyan / subtle blue
- glassmorphism
- radial glow
- noise texture
- vignette
- large cinematic hero media
- premium typography
- dramatic spacing
- layered depth
- smooth scroll reveals

Avoid:

- plain white dashboard look
- generic student portfolio look
- flat cards
- tiny invisible animations
- over-safe component reuse
- childish colorful effects

## Protected Content

Always preserve:

- academic content
- assignment data
- evidence data
- report PDF links
- Google Drive links
- Print PDF page
- Ctrl+P / Save PDF behavior

The Print PDF page may remain simple and print-friendly.

## Hero Requirements

If media exists:

- Use /media/hero-loop.mp4 visibly.
- Use /media/hero-poster.png as fallback.
- The video must be a main hero visual, not a tiny decoration.
- Use autoplay, muted, loop, playsInline.
- Add gradient overlay for readability.
- Add reduced-motion fallback to poster image.
- Add glow, glass frame, shadow, and depth.
- Add subtle floating/parallax motion.

## Animation Requirements

Use Framer Motion for premium motion.

Required animation patterns:

- Hero headline: word-by-word blur-slide-up.
- Section reveal: blur-slide-up on viewport entry.
- Cards: staggered reveal and hover lift.
- Buttons: hover scale and tap scale.
- Tables: subtle row hover.
- Stats: count-up animation.
- Dividers: line reveal.
- Video/media: floating or parallax motion.
- Sidebar: animated active indicator.
- Page transitions: visible blur/slide/scale transition.

Always support useReducedMotion().

## Redesign Workflow

1. Inspect current components and styles.
2. Identify which files must change.
3. If the current layout blocks the target look, rebuild that section.
4. Apply visual changes across the actual UI, not only helper files.
5. Verify that Print PDF and links still work.
6. Run lint and build.
7. Summarize changed files and visual changes.

## Quality Bar

A successful result should immediately look different from the previous version.

The user should see:
- darker cinematic mood
- stronger hero video presence
- better depth
- premium typography
- visible motion
- less dashboard feeling
- consistent luxury theme across pages