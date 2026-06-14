# AGENTS.md

## Project

React + Vite + Tailwind portfolio website.

## Commands

- npm run dev
- npm run build
- npm run lint

## Current Mission

The user explicitly wants a strong visual rebuild, not small polish.

The current UI is considered wrong:
- too flat
- too dashboard-like
- not luxury
- not cinematic
- animations are barely visible
- hero video is not integrated strongly enough

Codex must make visible, meaningful UI changes.

## Redesign Direction

Target style:
- dark luxury cinematic website
- immersive animated portfolio
- premium SaaS / creative studio feeling
- inspired by luxury animated websites such as paralleluniverse.com.ua
- full-screen visual storytelling
- strong hero media
- deep black / emerald / cyan / subtle blue
- glow, glass, depth, vignette, noise, cinematic lighting

## Required Visual Changes

For normal website pages:
- Do not preserve the old white dashboard look.
- Do not only add minor wrappers or tiny hover effects.
- Rebuild visual layout if needed.
- Hero video must be a major visible element.
- Use /public/media/hero-loop.mp4.
- Use /public/media/hero-poster.png as fallback.
- Apply the dark luxury system across Home, Assignments, Evidence, Rubric, and Summary.

## Protected Areas

Do not break or remove:
- existing academic content
- assignment data
- evidence data
- PDF/report links
- Google Drive links
- Print PDF page
- Ctrl+P / Save PDF behavior

Print PDF can stay clean/simple/white if needed.

## Implementation Rules

- Tailwind is the primary styling system.
- Framer Motion should be used for visible premium animations.
- Prefer meaningful visual rebuilds over tiny safe edits.
- It is allowed to refactor components if the current structure blocks the redesign.
- Do not rewrite data files unless explicitly asked.
- Do not fake evidence or content.
- Avoid unnecessary dependencies, but Framer Motion is allowed.

## Animation Requirements

Animations must be visible and premium:
- cinematic hero entrance
- word-by-word headline reveal
- video floating/parallax motion
- scroll reveal on viewport entry
- staggered cards
- card hover lift
- button hover/tap
- sidebar active indicator animation
- table row hover
- stat count-up

Always support reduced motion.

## Validation

Before finishing:

1. Run lint.
2. Run build.
3. Summarize changed files.
4. Explain what changed visually.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).


Use RTK for noisy shell commands.

Prefer:
- rtk git status
- rtk git diff
- rtk grep "pattern" src
- rtk find "*" .
- rtk read src/App.jsx
- rtk npm run build
- rtk npm run lint

Avoid dumping huge raw command output into context.