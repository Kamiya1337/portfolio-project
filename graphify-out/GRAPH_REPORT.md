# Graph Report - my-portfolio-enhanced  (2026-06-14)

## Corpus Check
- 21 files · ~9,105 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 83 nodes · 147 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e7d02f1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `blurSlideUp` - 8 edges
2. `portfolioData` - 7 edges
3. `staggerGrid` - 7 edges
4. `cardHover` - 7 edges
5. `motionViewport` - 7 edges
6. `lineReveal` - 6 edges
7. `scripts` - 5 edges
8. `buttonHover` - 4 edges
9. `buttonTap` - 4 edges
10. `tableRowReveal` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.31
Nodes (11): AssignmentCard(), AssignmentDetail(), blurSlideUp, buttonHover, buttonTap, cardHover, lineReveal, modalReveal (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (13): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (7): HomeTab(), PrintView(), ProjectsTab(), Summary(), pageTransition, App(), tabTitles

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (6): AnimatedNumber(), ease, headline, Hero(), stats, wordVariants

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, gsap, @gsap/react, lenis, lucide-react, react, react-dom

### Community 6 - "Community 6"
Cohesion: 0.47
Nodes (3): navItems, Sidebar(), portfolioData

## Knowledge Gaps
- **34 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._