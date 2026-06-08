# Codebase Context For ChatGPT

## Table of Contents

1. [Project Overview](#project-overview)
2. [Current Problem](#current-problem)
3. [Relevant File Tree](#relevant-file-tree)
4. [Important Dependencies](#important-dependencies)
5. [Architecture Map](#architecture-map)
6. [Hero Video Implementation Details](#hero-video-implementation-details)
7. [Runtime Findings From Previous Codex Debugging](#runtime-findings-from-previous-codex-debugging)
8. [CSS And Layout Risks](#css-and-layout-risks)
9. [Exact Current Code](#exact-current-code)
10. [Commands And Results](#commands-and-results)
11. [What Should Not Be Changed](#what-should-not-be-changed)
12. [Suggested Next Debugging Steps](#suggested-next-debugging-steps)

## Project Overview

- Framework: React + Vite.
- Styling system: Tailwind CSS, with substantial custom CSS in `src/index.css` and theme extension in `tailwind.config.js`.
- Animation libraries: Framer Motion, GSAP, `@gsap/react`, and GSAP ScrollTrigger.
- Icons: `lucide-react`.
- Main purpose: Academic portfolio website for a Digital Technology / AI course. It presents overview content, assignment/project cards and details, evidence links, rubric assessment, summary/reflection, and a protected Print PDF page.
- Current branch: `real-luxury-redesign`.
- Current git status summary: working tree is dirty. Multiple source/style/config files are modified, media files and some component/motion files are untracked, and this handoff markdown file is untracked unless staged later.

```text
 M .agents/skills/premium-animated-ui/SKILL.md
 M AGENTS.md
 M package-lock.json
 M package.json
 M src/App.jsx
 M src/components/EvidenceTable.jsx
 M src/components/HomeTab.jsx
 M src/components/PrintView.jsx
 M src/components/ProjectsTab.jsx
 M src/components/RubricTable.jsx
 M src/components/Sidebar.jsx
 M src/components/Summary.jsx
 M src/index.css
 M tailwind.config.js
?? docs/CODEBASE_CONTEXT_FOR_CHATGPT.md
?? public/media/
?? src/components/AnimatedNumber.jsx
?? src/components/AssignmentCard.jsx
?? src/components/AssignmentDetail.jsx
?? src/components/Hero.jsx
?? src/motion/
```

## Current Problem

The user reports that the implementation still fails visually on the actual website:

- Hero video scroll-scrub is still visually failing or inconsistent.
- The hero often appears as a poster/static image rather than a visibly scrubbed MP4.
- Scroll does not appear to control the video in the user-visible runtime.
- The website still feels too close to a static/student dashboard instead of a luxury cinematic AI / Computer Engineering landing page.
- The desired direction is a dark luxury cinematic website with strong visual hierarchy, visible premium motion, black/deep-green/cyan/blue lighting, and a hero video that is the main focal point.

Expected hero behavior:

- `/media/hero-loop.mp4` should be visible as the primary hero visual.
- The video should not autoplay/loop as the main behavior.
- Scrolling through the hero section should control video progress.
- At the top of the hero scroll range: `video.currentTime = 0`.
- At the bottom of the hero scroll range: `video.currentTime = video.duration`.
- Reduced-motion users should see `/media/hero-poster.png` instead of the scroll-scrub video.

Current visible behavior from user:

- The user sees poster/static image behavior or weak/no visible video movement.
- The hero animation and overall visual direction still feel insufficiently premium.
- The user explicitly said not to trust lint/build alone as proof that runtime behavior works.

## Relevant File Tree

### src/

```text
src/
??? assets/
?   ??? hero.png
?   ??? react.svg
?   ??? vite.svg
??? components/
?   ??? AnimatedNumber.jsx
?   ??? AssignmentCard.jsx
?   ??? AssignmentDetail.jsx
?   ??? EvidenceTable.jsx
?   ??? Hero.jsx
?   ??? HomeTab.jsx
?   ??? PrintView.jsx
?   ??? ProjectsTab.jsx
?   ??? RubricTable.jsx
?   ??? Sidebar.jsx
?   ??? Summary.jsx
??? data/
?   ??? portfolioData.js
??? motion/
?   ??? variants.js
??? App.css
??? App.jsx
??? index.css
??? main.jsx
```

### src/components/

```text
src/components/
??? AnimatedNumber.jsx
??? AssignmentCard.jsx
??? AssignmentDetail.jsx
??? EvidenceTable.jsx
??? Hero.jsx
??? HomeTab.jsx
??? PrintView.jsx
??? ProjectsTab.jsx
??? RubricTable.jsx
??? Sidebar.jsx
??? Summary.jsx
```

### src/motion/

```text
src/motion/
??? variants.js
```

### public/media/

```text
public/media/
??? hero-loop.mp4
??? hero-poster.png
```

Current media sizes:

```text

FullName                                                       Length LastWriteTime      
--------                                                       ------ -------------      
D:\Project\my-portfolio-enhanced\public\media\hero-loop.mp4   5696326 6/7/2026 5:23:57 PM
D:\Project\my-portfolio-enhanced\public\media\hero-poster.png 7478593 6/7/2026 5:14:24 PM
```

### Config Files

```text
package.json
package-lock.json
vite.config.js
tailwind.config.js
postcss.config.js
eslint.config.js
index.html
AGENTS.md
```

## Important Dependencies

Read from `package.json`:

- react: `^19.2.6`
- react-dom: `^19.2.6`
- vite: `^8.0.12`
- tailwindcss: `^3.4.19`
- framer-motion: `^12.40.0`
- gsap: `^3.15.0`
- @gsap/react: `^2.1.2`
- lucide-react: `^1.17.0`

## Architecture Map

- `src/App.jsx`: Top-level app shell. Owns `activeTab`, mobile sidebar state, route-like tab rendering, page transition wrapper, dark app atmosphere, header, and special PrintView bypass. Print view avoids page transition wrapper and luxury content classes.
- `src/components/Hero.jsx`: Home hero section. Contains headline, CTA buttons, stats, floating panels, hero media frame, Framer Motion pointer parallax, GSAP ScrollTrigger video scrubbing, reduced-motion poster fallback, and dev debug overlay.
- `src/components/HomeTab.jsx`: Home/overview page wrapper. Pulls `student` and `overview` from `portfolioData`, renders `Hero`, then a dark story/capability section with animated overview cards.
- `src/components/Sidebar.jsx`: Main navigation shell for normal pages. Handles active tab selection, mobile open/close behavior, dark glass styling, and animated active indicator.
- `src/components/ProjectsTab.jsx`: Assignment/projects page. Renders assignment list/cards and likely coordinates selected assignment detail/modal behavior.
- `src/components/AssignmentCard.jsx`: Reusable premium assignment card component. Used to show assignment metadata, badges, report/PDF links, image/visual area, and hover interaction.
- `src/components/AssignmentDetail.jsx`: Detailed assignment display, likely used by ProjectsTab to show full assignment content, links, evidence, and actions.
- `src/components/EvidenceTable.jsx`: Evidence page/table. Presents real evidence data and links. Must not change evidence data or remove links.
- `src/components/RubricTable.jsx`: Rubric/assessment page. Presents rubric cards/tables and score/hierarchy UI.
- `src/components/Summary.jsx`: Summary/reflection page. Presents reflection content and final academic summary in the dark luxury theme.
- `src/components/PrintView.jsx`: Print/PDF page. Must remain print-friendly and not be animated. Ctrl+P / Save PDF behavior must remain intact.
- `src/motion/variants.js`: Shared Framer Motion variants and constants: blur-slide-up, stagger grid, hover/tap, line reveal, viewport settings, page transitions, modal reveal, table row reveal.
- `src/index.css`: Global Tailwind imports, base styles, print CSS, dark luxury visual system, hero gradients/noise/vignette, app shell atmosphere, table/card/badge overrides, reduced-motion CSS.
- `src/data/portfolioData.js`: Source of real student, assignment, evidence, rubric, and summary data. Do not change or fake data.
- `tailwind.config.js`: Tailwind content paths, colors, font families, and shadow tokens used by the UI.

## Hero Video Implementation Details

Current `Hero.jsx` behavior:

- `sectionRef`: Attached to the outer `<section data-hero-section>`. GSAP ScrollTrigger uses this element as the scroll trigger. The section currently has `min-h-[320vh]` so it creates a long scroll range.
- `videoRef`: Attached directly to the `<video>` element, but only when `useReducedMotion()` does not request reduced motion. If reduced motion is true, React renders an `<img>` instead and `videoRef.current` remains null.
- GSAP registration: `gsap.registerPlugin(ScrollTrigger, useGSAP);` is called at module scope.
- `useGSAP`: Creates the scroll scrub when reduced motion is false and both section/video refs exist.
- Metadata handling: If `video.readyState >= 1`, `createScrollScrub()` runs immediately. Otherwise, `loadedmetadata` is listened for once and then `createScrollScrub()` runs.
- Duration guard: `createScrollScrub()` reads `video.duration`; if it is not finite or is `<= 0`, it returns without creating a trigger.
- Playback behavior: The code calls `video.pause()` and sets `video.currentTime = 0`. The video element does not currently set `autoPlay` or `loop`; it is intended to be scroll-controlled.
- ScrollTrigger behavior: `ScrollTrigger.create({ id: 'hero-video-scrub', trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.18, invalidateOnRefresh: true, onUpdate })`.
- Current-time formula: `nextTime = progress >= 1 ? video.duration : progress * video.duration`; if finite, `video.currentTime = nextTime`.
- Reduced motion fallback: `useReducedMotion()` switches the hero media from `<video>` to `<img src="/media/hero-poster.png">`. The GSAP setup returns early when reduced motion is true.
- Poster fallback: The video element has `poster="/media/hero-poster.png"`; reduced-motion users see the poster image as an `img`.
- Debug overlay: In dev mode, a top-right overlay shows `progress`, `time`, `duration`, `reduced motion`, `trigger`, `readyState`, and `video`. Also in dev, `window.__heroScrubDebug` exposes `video`, `section`, and ScrollTrigger summaries.

What could still be wrong:

- The user's browser may have OS/browser reduced motion enabled, causing the poster branch and no video element.
- Sticky behavior can still be affected by any ancestor `overflow`, `transform`, `filter`, `perspective`, `contain`, or aggressive `will-change`.
- `body/html overflow-x: clip` is intended to avoid vertical scroll containment; browser support should be checked in the user's actual browser.
- The video may seek poorly if encoded with sparse keyframes, causing scrub to look static even though `currentTime` changes.
- Overlay gradients may make frame changes hard to perceive if video content is already dark.
- Dev server/browser cache may be showing stale code or stale media.
- Heavy blur/backdrop-filter layers around the hero can reduce frame rate and make scrub feel laggy.
- The app uses Framer Motion page transitions; if future changes reintroduce transforms or `will-change: transform` on ancestors, sticky/scroll effects may break again.

## Runtime Findings From Previous Codex Debugging

Observed via a headless Edge + Chrome DevTools Protocol runtime check against `http://127.0.0.1:5173`:

- `/media/hero-loop.mp4` loaded successfully from the dev server as `video/mp4`; file size is about 5.7 MB.
- When the browser reported `prefers-reduced-motion: reduce`, React rendered the poster fallback. In that mode: no `<video>` existed, no ScrollTrigger existed, and the debug overlay reported reduced motion.
- With reduced motion explicitly emulated as `no-preference`:
  - `<video>` existed in the DOM.
  - `video.currentSrc` pointed to `http://127.0.0.1:5173/media/hero-loop.mp4`.
  - `video.duration` was available and measured as `10` seconds.
  - `video.readyState` reached `4` in checks.
  - ScrollTrigger existed with id `hero-video-scrub`.
  - `video.currentTime` changed while scrolling: approximately `0` -> `3.69` -> `8.23`.
- Overflow/sticky containment was found:
  - Earlier `overflow-hidden` / `overflow-x-hidden` on app/html/body computed into vertical scroll containment and broke sticky behavior.
  - The fix attempted was changing app shell, `html`, and `body` horizontal overflow from hidden to `overflow-x: clip`.
  - `.tab-motion-shell` previously had `will-change: opacity, transform, filter`; this was changed to `will-change: opacity, filter` to avoid transform containment.
- A final runtime pass after these fixes showed:
  - `htmlOverflow`: `{ x: "clip", y: "visible" }`.
  - `bodyOverflow`: `{ x: "clip", y: "visible" }`.
  - Hero stage stayed near viewport top while scroll advanced.
  - `currentTime` still advanced with scroll.
- Despite these checks, the user still reports visual failure/inconsistency, so another agent should independently verify in the actual visible browser, not only headless runtime metrics.

## CSS And Layout Risks

Potential causes to inspect first:

- `overflow-x: hidden` or `overflow: hidden/auto/scroll` on `html`, `body`, `#root`, app shell, `main`, tab wrapper, or any hero ancestor. Even horizontal-only hidden can compute the other axis to `auto` and break sticky.
- Sticky not working because a parent creates a scroll container or containing block.
- Parent `transform`, `filter`, `perspective`, `contain`, or `will-change: transform` can interfere with sticky/fixed behavior and ScrollTrigger measurements.
- Framer Motion page transitions may temporarily apply transforms. If ScrollTrigger measures during or before transition completion, start/end positions can be wrong.
- Overlay hiding video: `.hero-focal-vignette`, hero media gradients, dark frame overlays, or z-index ordering can make a dark video look like a static background/poster.
- Z-index issues: debug overlay is `z-[60]`; hero visual is nested below overlays. Check actual computed stacking contexts in browser devtools.
- Reduced motion: if `matchMedia('(prefers-reduced-motion: reduce)').matches` is true, the video branch is intentionally not rendered.
- Video encoding/keyframes: scroll-scrubbing MP4s work best with frequent keyframes and fast-start metadata. Sparse keyframes can make seeking appear frozen or delayed.
- Excessive blur/backdrop-filter: multiple `backdrop-blur`, large radial blur glows, and box shadows may cause visible lag, especially on integrated GPUs or mobile.
- Dev caching/stale browser: Vite HMR/browser cache may show stale UI. Hard refresh and verify DOM/source in the visible browser.

## Exact Current Code

### package.json

```json
{
  "name": "my-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "framer-motion": "^12.40.0",
    "gsap": "^3.15.0",
    "lucide-react": "^1.17.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "vite": "^8.0.12"
  }
}
```

### src/App.jsx

```jsx
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import HomeTab from './components/HomeTab';
import ProjectsTab from './components/ProjectsTab';
import EvidenceTable from './components/EvidenceTable';
import RubricTable from './components/RubricTable';
import Summary from './components/Summary';
import PrintView from './components/PrintView';
import { pageTransition } from './motion/variants';

const tabTitles = {
  home: 'Tổng quan Portfolio',
  projects: 'Bài tập & Dự án',
  evidence: 'Kiểm soát Minh chứng',
  rubric: 'Rubric & Đánh giá',
  summary: 'Tổng kết Cá nhân',
  print: 'Bản in Portfolio',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeTab setActiveTab={setActiveTab} />;
      case 'projects': return <ProjectsTab />;
      case 'evidence': return <EvidenceTable />;
      case 'rubric': return <RubricTable />;
      case 'summary': return <Summary />;
      case 'print': return <PrintView />;
      default: return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  const isPrintView = activeTab === 'print';

  return (
    <div className={`relative min-h-screen overflow-x-clip md:flex print:block print:min-h-0 print:overflow-visible print:bg-white ${isPrintView ? 'print-mode bg-white text-ink' : 'app-luxury-shell bg-[#020606] text-white'}`}>
      {!isPrintView && (
        <div className="luxury-app-atmosphere no-print" aria-hidden="true">
          <div className="luxury-app-glow luxury-app-glow-primary" />
          <div className="luxury-app-glow luxury-app-glow-secondary" />
          <div className="luxury-app-grid" />
          <div className="luxury-app-noise" />
          <div className="luxury-app-vignette" />
        </div>
      )}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="relative z-10 min-w-0 flex-1 md:ml-72 print:ml-0">
        <header className="no-print sticky top-0 z-30 hidden h-16 items-center border-b border-cyan-100/[0.08] bg-[#020706]/72 px-6 text-white shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:flex lg:px-10">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-200/45">Digital Technology & AI</p>
            <h1 className="mt-0.5 font-display text-lg font-semibold tracking-tight text-white/90">{tabTitles[activeTab]}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-emerald-200/10 bg-emerald-300/[0.045] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-100/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
            Portfolio system online
          </div>
        </header>

        <main className={`w-full print:p-0 ${isPrintView ? '' : 'luxury-content'} ${activeTab === 'home' ? 'px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4' : 'px-4 py-7 sm:px-6 md:px-8 md:py-12 lg:px-12'}`}>
          {isPrintView ? renderContent() : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                variants={pageTransition}
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                exit={reduceMotion ? undefined : 'exit'}
                className="tab-motion-shell"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
}
```

### src/components/Hero.jsx

```jsx
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, CircuitBoard, FileCheck2, Layers, Radio, Sparkles } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const headline = [
  { word: 'Engineering', index: 0 },
  { word: 'Intelligence.', index: 1, accent: true },
  { word: 'Documenting', index: 2 },
  { word: 'Progress.', index: 3 },
];

const stats = [
  { label: 'Bài học', value: '07', detail: 'Chủ đề lý thuyết' },
  { label: 'Sản phẩm', value: '06', detail: 'Bài tập thực hành' },
  { label: 'Kỹ năng số', value: '06+', detail: 'Nhóm năng lực lõi' },
  { label: 'Điểm kỳ vọng', value: '10', detail: 'Mức xuất sắc' },
];

const ease = [0.25, 0.46, 0.45, 0.94];

const wordVariants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(16px)' },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, delay: 0.12 + index * 0.09, ease },
  }),
};

export default function Hero({ student, setActiveTab }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [scrubDebug, setScrubDebug] = useState({
    progress: 0,
    time: 0,
    duration: 0,
    reducedMotion: Boolean(reduceMotion),
    triggerCreated: false,
    readyState: 0,
    videoPresent: false,
  });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 48, damping: 25 });
  const smoothY = useSpring(pointerY, { stiffness: 48, damping: 25 });
  const mediaX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const mediaY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const mediaRotateY = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);
  const mediaRotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    window.__heroScrubDebug = {
      reducedMotion: Boolean(reduceMotion),
      get video() {
        return videoRef.current;
      },
      get section() {
        return sectionRef.current;
      },
      get scrollTriggers() {
        return ScrollTrigger.getAll().map((trigger) => ({
          id: trigger.vars.id,
          progress: trigger.progress,
          start: trigger.start,
          end: trigger.end,
          isActive: trigger.isActive,
        }));
      },
    };
  }, [reduceMotion]);

  useGSAP(() => {
    setScrubDebug((current) => ({ ...current, reducedMotion: Boolean(reduceMotion) }));

    if (reduceMotion) return undefined;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) {
      setScrubDebug((current) => ({ ...current, videoPresent: Boolean(video) }));
      return undefined;
    }

    let trigger;
    let frameRequest = 0;

    const updateDebug = (progress = 0) => {
      if (!import.meta.env.DEV) return;

      cancelAnimationFrame(frameRequest);
      frameRequest = requestAnimationFrame(() => {
        setScrubDebug({
          progress,
          time: video.currentTime || 0,
          duration: video.duration || 0,
          reducedMotion: Boolean(reduceMotion),
          triggerCreated: Boolean(trigger),
          readyState: video.readyState,
          videoPresent: true,
        });
      });
    };

    const createScrollScrub = () => {
      const duration = video.duration;
      updateDebug(0);

      if (!Number.isFinite(duration) || duration <= 0) return;

      video.pause();
      video.currentTime = 0;

      trigger = ScrollTrigger.create({
        id: 'hero-video-scrub',
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.18,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const nextTime = progress >= 1 ? video.duration : progress * video.duration;
          if (Number.isFinite(nextTime)) {
            video.currentTime = nextTime;
            updateDebug(progress);
          }
        },
      });

      updateDebug(trigger.progress);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      createScrollScrub();
    } else {
      video.addEventListener('loadedmetadata', createScrollScrub, { once: true });
    }

    return () => {
      cancelAnimationFrame(frameRequest);
      video.removeEventListener('loadedmetadata', createScrollScrub);
      trigger?.kill();
    };
  }, { scope: sectionRef, dependencies: [reduceMotion] });

  return (
    <section
      data-hero-section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="cinematic-hero-scroll relative isolate min-h-[320vh] text-white"
    >
      <div className="cinematic-hero hero-focal-rebuild sticky top-3 isolate min-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[32px] border border-cyan-100/[0.1] shadow-[0_60px_180px_rgba(0,0,0,0.72)]">
        <div className="cinematic-hero-aurora absolute inset-0" />
        <div className="luxury-grid absolute inset-0 opacity-40" />
        <div className="luxury-noise absolute inset-0 opacity-[0.05]" />
        <div className="hero-focal-vignette absolute inset-0" />
        <div className="absolute inset-x-0 top-0 z-[4] h-px bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent" />
        {import.meta.env.DEV && (
          <div className="pointer-events-none absolute right-4 top-4 z-[60] rounded-xl border border-cyan-100/20 bg-black/70 px-3 py-2 font-mono text-[10px] leading-5 text-cyan-50/80 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <div>progress: {scrubDebug.progress.toFixed(2)}</div>
            <div>time: {scrubDebug.time.toFixed(2)}</div>
            <div>duration: {scrubDebug.duration.toFixed(2)}</div>
            <div>reduced motion: {String(scrubDebug.reducedMotion)}</div>
            <div>trigger: {String(scrubDebug.triggerCreated)}</div>
            <div>readyState: {scrubDebug.readyState}</div>
            <div>video: {String(scrubDebug.videoPresent)}</div>
          </div>
        )}

        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1680px] flex-col px-5 pb-5 pt-7 sm:px-8 sm:pb-8 sm:pt-9 lg:px-12 lg:pb-8 lg:pt-10 xl:px-16">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.08, ease }} className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100/15 bg-black/25 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-50/75 backdrop-blur-2xl"><Sparkles size={12} className="text-cyan-300" /> Computer Engineering / AI</div>
          <div className="hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/38 sm:flex"><Radio size={11} className="text-emerald-300" /> Visual research archive / 2026</div>
        </motion.div>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(410px,0.82fr)_minmax(620px,1.18fr)] lg:gap-12 xl:grid-cols-[minmax(500px,0.76fr)_minmax(760px,1.24fr)]">
          <div className="relative z-20 max-w-[760px]">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-100/50">Digital Technology & Artificial Intelligence</p>
            <h1 className="hero-focal-headline font-display text-[clamp(3.05rem,6.1vw,7.15rem)] font-semibold leading-[0.95] tracking-[-0.058em] text-white">
              {headline.map(({ word, index, accent }) => (
                <span key={word} className="block pb-[0.06em]">
                  <motion.span custom={index} variants={wordVariants} initial={reduceMotion ? false : 'hidden'} animate="visible" className={`block ${accent ? 'luxury-gradient-text' : ''}`}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: reduceMotion ? 0 : 0.78, delay: 0.62, ease }} className="mt-7 max-w-2xl border-l border-cyan-100/25 pl-5">
              <p className="text-base leading-7 text-white/78 sm:text-lg">Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/48">{student.bio}</p>
            </motion.div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.72, delay: 0.76, ease }} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.button type="button" onClick={() => setActiveTab('projects')} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.045 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-200 via-emerald-300 to-cyan-300 px-6 py-3.5 text-sm font-semibold text-[#02100d] shadow-[0_18px_55px_rgba(45,212,191,0.24)]"><Layers size={17} /> Khám phá bài tập <ArrowRight size={16} /></motion.button>
              <motion.button type="button" onClick={() => setActiveTab('evidence')} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.045, backgroundColor: 'rgba(255,255,255,0.12)' }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-2xl"><FileCheck2 size={17} /> Xem minh chứng</motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 36, scale: 0.94, filter: 'blur(14px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: 0.24, ease }}
            style={reduceMotion ? undefined : { x: mediaX, y: mediaY, rotateX: mediaRotateX, rotateY: mediaRotateY, transformPerspective: 1500 }}
            className="hero-media-dominant relative z-10 mx-auto w-full max-w-[1040px] lg:mx-0"
          >
            <div className="hero-media-orb absolute inset-[8%] rounded-full bg-cyan-300/[0.12] blur-[64px]" />
            <div className="hero-media-glass-frame relative aspect-[16/10] overflow-hidden rounded-[34px] border border-cyan-100/[0.18] bg-black/35 p-2 shadow-[0_48px_130px_rgba(0,0,0,0.62)] backdrop-blur-sm">
              <div className="relative h-full overflow-hidden rounded-[26px] bg-[#010404]">
                {reduceMotion ? (
                  <img src="/media/hero-poster.png" alt="Cinematic computer engineering visual" width="1600" height="1000" className="h-full w-full object-cover object-center" />
                ) : (
                  <video ref={videoRef} muted playsInline poster="/media/hero-poster.png" preload="auto" aria-label="Scroll-scrubbed cinematic computer engineering visual" className="h-full w-full object-cover object-center">
                    <source src="/media/hero-loop.mp4" type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-cyan-950/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/58 backdrop-blur-xl">Hero-loop.mp4 / compute signal</div>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-300/[0.075] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-100/78 backdrop-blur-xl"><Radio size={11} className="text-emerald-300" /> Live visual</div>
                </div>
              </div>
            </div>

            <motion.div animate={reduceMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-3 top-[12%] hidden min-w-48 rounded-2xl border border-cyan-100/[0.14] bg-[#061310]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-md sm:block">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200/10 bg-emerald-300/[0.08] text-emerald-200"><CircuitBoard size={18} /></span><div><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">System focus</p><p className="mt-1 text-sm font-semibold text-white/86">AI Engineering</p></div></div>
            </motion.div>

            <motion.div animate={reduceMotion ? undefined : { y: [0, 10, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }} className="absolute -bottom-5 right-[7%] hidden w-56 rounded-2xl border border-cyan-100/[0.14] bg-[#04100e]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-md sm:block">
              <div className="flex items-center justify-between"><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Portfolio index</p><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,0.9)]" /></div>
              <div className="mt-3 flex items-end justify-between"><p className="font-display text-3xl font-semibold tracking-[-0.04em] text-white">06</p><p className="pb-1 text-[10px] text-white/42">documented projects</p></div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]"><motion.div initial={reduceMotion ? { width: '86%' } : { width: 0 }} animate={{ width: '86%' }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.9, ease }} className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" /></div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={reduceMotion ? false : 'hidden'} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.9 } } }} className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.09] bg-black/30 backdrop-blur-2xl lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.article key={stat.label} variants={{ hidden: { opacity: 0, y: 22, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.68, ease } } }} whileHover={reduceMotion ? undefined : { backgroundColor: 'rgba(103,232,249,0.055)' }} className={`p-4 sm:p-5 ${index % 2 === 0 ? 'border-r border-white/[0.07]' : ''} ${index < 2 ? 'border-b border-white/[0.07] lg:border-b-0' : ''} ${index !== stats.length - 1 ? 'lg:border-r lg:border-white/[0.07]' : ''}`}>
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cyan-100/38">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between gap-3"><AnimatedNumber value={stat.value} className="font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl" /><p className="pb-1 text-right text-[10px] leading-4 text-white/35">{stat.detail}</p></div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 1.2 }} className="mt-5 hidden items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-[0.22em] text-white/28 sm:flex">
          <ArrowDown size={12} /> Scroll to explore the portfolio system
        </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### src/components/HomeTab.jsx

```jsx
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { blurSlideUp, buttonHover, buttonTap, cardHover, lineReveal, motionViewport, staggerGrid } from '../motion/variants';
import Hero from './Hero';

export default function HomeTab({ setActiveTab }) {
  const { student, overview } = portfolioData;
  const reduceMotion = useReducedMotion();

  return (
    <div className="home-luxury-shell space-y-0 pb-0">
      <Hero student={student} setActiveTab={setActiveTab} />

      <section className="home-story-section relative overflow-hidden px-3 py-24 sm:px-5 sm:py-28 lg:px-10 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_30%,rgba(16,185,129,0.1),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(34,211,238,0.08),transparent_30%)]" />
        <div className="luxury-noise absolute inset-0 opacity-[0.025]" />

        <motion.div initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp} className="relative mx-auto max-w-[1280px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300/62">01 / Capability architecture</p>
              <motion.div variants={lineReveal} className="mt-5 h-px origin-left bg-gradient-to-r from-cyan-200/40 to-transparent" />
            </div>
            <div>
              <h2 className="max-w-4xl font-display text-[clamp(2.8rem,5vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">Năng lực số được xây dựng qua <span className="luxury-gradient-text">thực hành thật.</span></h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/46">Hệ thống hóa các nhóm năng lực hình thành trong quá trình học tập, nghiên cứu và ứng dụng AI thành một hồ sơ có cấu trúc, minh chứng và khả năng truy xuất.</p>
            </div>
          </div>

          <motion.div initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {overview.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.id} variants={blurSlideUp} whileHover={reduceMotion ? undefined : cardHover} className="competency-cinematic-card group relative min-h-72 overflow-hidden rounded-[26px] border border-cyan-100/[0.09] bg-[#04100e]/68 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/[0.09] blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-100/28">0{index + 1}</span>
                    <ArrowUpRight size={18} className="text-white/25 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </div>
                  <div className="relative mt-12 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100/[0.1] bg-cyan-100/[0.055] text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.07)]"><Icon size={21} strokeWidth={1.65} /></div>
                  <div className="relative mt-8"><h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-white/92">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/42">{item.desc}</p></div>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.button type="button" onClick={() => setActiveTab('projects')} initial={reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={motionViewport} transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap} className="mt-12 inline-flex items-center gap-3 rounded-full border border-cyan-100/[0.12] bg-cyan-100/[0.04] px-5 py-3 text-sm font-semibold text-cyan-50/78 backdrop-blur-xl">
            Khám phá toàn bộ bài tập <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
```

### src/motion/variants.js

```js
export const premiumEase = [0.25, 0.46, 0.45, 0.94];

export const blurSlideUp = {
  hidden: { opacity: 0, y: 56, scale: 0.985, filter: 'blur(18px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: premiumEase },
  },
};

export const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

export const cardHover = {
  y: -12,
  scale: 1.025,
  transition: { type: 'spring', stiffness: 280, damping: 20 },
};

export const buttonHover = { scale: 1.055, y: -3 };
export const buttonTap = { scale: 0.97 };

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: premiumEase, delay: 0.18 },
  },
};

export const motionViewport = { once: true, amount: 0.28, margin: '0px 0px -8% 0px' };

export const pageTransition = {
  hidden: { opacity: 0, y: 42, scale: 0.972, filter: 'blur(18px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.74, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -26,
    scale: 0.982,
    filter: 'blur(16px)',
    transition: { duration: 0.34, ease: premiumEase },
  },
};

export const modalReveal = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(8px)',
    transition: { duration: 0.22, ease: premiumEase },
  },
};

export const tableRowReveal = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.56, ease: premiumEase },
  },
};
```

### src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    border-color: theme('colors.line');
  }

  html {
    background: theme('colors.canvas');
    overflow-x: clip;
  }

  body {
    margin: 0;
    min-width: 320px;
    overflow-x: clip;
    background: theme('colors.canvas');
    color: theme('colors.ink');
    font-family: theme('fontFamily.sans');
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, a {
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible, a:focus-visible {
    outline: 2px solid theme('colors.ink');
    outline-offset: 3px;
  }
}

@layer components {
  .page-shell {
    @apply mx-auto min-w-0 w-full max-w-[1180px] space-y-10 pb-12;
  }

  .page-heading {
    @apply font-display text-3xl font-semibold tracking-[-0.025em] text-ink md:text-4xl;
  }

  .page-description {
    @apply mt-2 max-w-3xl text-base leading-7 text-muted;
  }

  .section-label {
    @apply font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted;
  }

  .surface-card {
    @apply rounded-2xl border border-line bg-panel shadow-ambient;
  }

  .quiet-card {
    @apply rounded-xl border border-line bg-panel;
  }

  .badge-neutral {
    @apply inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink;
  }

  .badge-success {
    @apply inline-flex items-center gap-1.5 rounded-full border border-emerald/15 bg-emerald-soft px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-emerald;
  }

  .badge-warning {
    @apply inline-flex items-center gap-1.5 rounded-full border border-amber/15 bg-amber-soft px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-amber;
  }

  .button-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-black;
  }

  .button-secondary {
    @apply inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-soft;
  }

  .animate-fade-in {
    animation: fade-in 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

.hero-aurora {
  background:
    radial-gradient(circle at 15% 15%, rgba(124, 240, 189, 0.16), transparent 32%),
    radial-gradient(circle at 82% 18%, rgba(134, 184, 255, 0.16), transparent 30%),
    radial-gradient(circle at 52% 88%, rgba(79, 70, 229, 0.12), transparent 36%),
    linear-gradient(125deg, #151817 0%, #111815 40%, #101521 100%);
  background-size: 140% 140%;
  animation: aurora-shift 16s ease-in-out infinite alternate;
}

.hero-gradient-text {
  background: linear-gradient(105deg, #7cf0bd 5%, #b6ead2 40%, #86b8ff 95%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero-cinematic::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.035) 45%, transparent 68%);
  transform: translateX(-60%);
  animation: hero-sheen 9s ease-in-out infinite;
}

@keyframes hero-sheen {
  0%, 35% { transform: translateX(-70%); opacity: 0; }
  50% { opacity: 1; }
  70%, 100% { transform: translateX(70%); opacity: 0; }
}

@keyframes aurora-shift {
  0% { background-position: 0% 20%; filter: hue-rotate(0deg); }
  50% { background-position: 70% 50%; filter: hue-rotate(8deg); }
  100% { background-position: 100% 80%; filter: hue-rotate(-5deg); }
}

.stat-depth-card,
.competency-card,
.assignment-premium-card {
  background: linear-gradient(150deg, #ffffff 0%, #fafaf7 100%);
}

.stat-depth-card::after,
.competency-card::after,
.assignment-premium-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.card-sheen {
  background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.22) 48%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.assignment-premium-card:hover .card-sheen {
  transform: translateX(120%);
}

.hero-media-frame::before {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(125deg, rgba(124, 240, 189, 0.5), rgba(255, 255, 255, 0.08) 42%, rgba(134, 184, 255, 0.45));
  filter: blur(16px);
  opacity: 0.55;
}

.home-luxury-shell {
  margin: 0 auto;
  width: 100%;
  max-width: 1600px;
  background: #030606;
}

.luxury-hero {
  background: #020506;
}

.luxury-aurora {
  background:
    radial-gradient(circle at 72% 38%, rgba(34, 211, 238, 0.16), transparent 30%),
    radial-gradient(circle at 58% 46%, rgba(16, 185, 129, 0.16), transparent 38%),
    radial-gradient(circle at 12% 88%, rgba(8, 145, 178, 0.09), transparent 30%),
    linear-gradient(128deg, #020505 0%, #04100d 42%, #02070b 100%);
  background-size: 145% 145%;
  animation: luxury-aurora 18s ease-in-out infinite alternate;
}

.luxury-grid {
  opacity: 0.22;
  background-image:
    linear-gradient(rgba(103, 232, 249, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(103, 232, 249, 0.12) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 65% 45%, black, transparent 68%);
}

.luxury-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
}

.luxury-gradient-text {
  background: linear-gradient(100deg, #a7f3d0 0%, #67e8f9 48%, #93c5fd 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 28px rgba(103, 232, 249, 0.13));
}

.luxury-video-frame::before {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(125deg, rgba(110, 231, 183, 0.7), rgba(255,255,255,0.06) 40%, rgba(103, 232, 249, 0.65));
  filter: blur(24px);
  opacity: 0.5;
}

.cinematic-hero {
  background: #010505;
}

.cinematic-hero-rebuilt::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(115deg, rgba(1, 5, 5, 0.92) 0%, rgba(1, 6, 6, 0.68) 34%, rgba(1, 6, 7, 0.18) 62%, rgba(1, 5, 5, 0.72) 100%),
    radial-gradient(circle at 68% 40%, transparent 0%, rgba(1, 4, 5, 0.22) 45%, rgba(1, 4, 5, 0.82) 100%);
}

.hero-focal-rebuild {
  background:
    radial-gradient(circle at 78% 34%, rgba(34, 211, 238, 0.12), transparent 31%),
    radial-gradient(circle at 22% 74%, rgba(16, 185, 129, 0.12), transparent 28%),
    #010505;
}

.hero-focal-vignette {
  background:
    linear-gradient(110deg, rgba(1, 5, 5, 0.9) 0%, rgba(1, 5, 5, 0.64) 34%, rgba(1, 5, 5, 0.12) 62%, rgba(1, 5, 5, 0.34) 100%),
    radial-gradient(circle at 72% 45%, transparent 0%, rgba(1, 5, 5, 0.1) 48%, rgba(1, 5, 5, 0.76) 100%);
}

.hero-focal-headline {
  overflow-wrap: normal;
  word-break: normal;
}

.hero-media-glass-frame::before {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(125deg, rgba(110, 231, 183, 0.72), rgba(255, 255, 255, 0.08) 40%, rgba(103, 232, 249, 0.68));
  filter: blur(28px);
  opacity: 0.62;
}

.hero-media-glass-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    inset 0 -40px 80px rgba(0, 0, 0, 0.18);
}

.tab-motion-shell {
  transform-origin: 50% 24%;
  will-change: opacity, filter;
}

.cinematic-hero-video-grade {
  background:
    linear-gradient(to top, rgba(1, 5, 5, 0.86), transparent 42%, rgba(1, 5, 5, 0.18)),
    radial-gradient(circle at 72% 34%, rgba(103, 232, 249, 0.14), transparent 26%),
    radial-gradient(circle at 22% 72%, rgba(16, 185, 129, 0.14), transparent 28%);
}

.cinematic-hero-aurora {
  background:
    radial-gradient(circle at 76% 40%, rgba(34, 211, 238, 0.17), transparent 30%),
    radial-gradient(circle at 60% 54%, rgba(16, 185, 129, 0.15), transparent 39%),
    radial-gradient(circle at 8% 92%, rgba(14, 116, 144, 0.1), transparent 34%),
    linear-gradient(124deg, #010404 0%, #04100d 43%, #02070b 100%);
  background-size: 145% 145%;
  animation: luxury-aurora 18s ease-in-out infinite alternate;
}

.cinematic-hero-vignette {
  background:
    linear-gradient(90deg, rgba(1, 5, 5, 0.34), transparent 50%, rgba(1, 4, 5, 0.12)),
    radial-gradient(circle at 66% 42%, transparent 16%, rgba(1, 4, 5, 0.12) 53%, rgba(1, 4, 5, 0.82) 100%);
}

.cinematic-video-stage::before {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(125deg, rgba(110, 231, 183, 0.62), rgba(255, 255, 255, 0.04) 42%, rgba(103, 232, 249, 0.58));
  filter: blur(24px);
  opacity: 0.48;
}

.cinematic-video-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* Shared cinematic application shell. Print mode intentionally sits outside this scope. */
.app-luxury-shell {
  isolation: isolate;
  background:
    radial-gradient(circle at 76% 8%, rgba(34, 211, 238, 0.055), transparent 28rem),
    radial-gradient(circle at 18% 78%, rgba(16, 185, 129, 0.05), transparent 32rem),
    #020606;
}

.luxury-app-atmosphere {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.luxury-app-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(110px);
  opacity: 0.25;
  animation: app-glow-drift 18s ease-in-out infinite alternate;
}

.luxury-app-glow-primary {
  right: -10rem;
  top: -12rem;
  width: 38rem;
  height: 38rem;
  background: rgba(34, 211, 238, 0.42);
}

.luxury-app-glow-secondary {
  bottom: -16rem;
  left: 8%;
  width: 42rem;
  height: 42rem;
  background: rgba(16, 185, 129, 0.3);
  animation-delay: -7s;
}

.luxury-app-grid {
  position: absolute;
  inset: 0;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(103, 232, 249, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(103, 232, 249, 0.1) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.luxury-app-noise {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}

.luxury-app-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 58% 34%, transparent 18%, rgba(0, 0, 0, 0.3) 76%, rgba(0, 0, 0, 0.68) 100%);
}

.luxury-content {
  position: relative;
  min-height: calc(100vh - 4rem);
}

.app-luxury-shell:not(.print-mode) .page-heading {
  color: rgba(240, 253, 250, 0.96);
  text-shadow: 0 0 36px rgba(103, 232, 249, 0.055);
}

.app-luxury-shell:not(.print-mode) .page-description,
.app-luxury-shell:not(.print-mode) .text-muted {
  color: rgba(203, 213, 225, 0.58);
}

.app-luxury-shell:not(.print-mode) .section-label {
  color: rgba(165, 243, 252, 0.48);
}

.app-luxury-shell:not(.print-mode) .text-ink {
  color: rgba(240, 253, 250, 0.92);
}

.app-luxury-shell:not(.print-mode) .bg-canvas {
  background-color: rgba(3, 11, 10, 0.72);
}

.app-luxury-shell:not(.print-mode) .bg-panel {
  background-color: rgba(7, 17, 16, 0.88);
}

.app-luxury-shell:not(.print-mode) .bg-soft {
  background-color: rgba(255, 255, 255, 0.035);
}

.app-luxury-shell:not(.print-mode) .border-line,
.app-luxury-shell:not(.print-mode) .divide-line > :not([hidden]) ~ :not([hidden]) {
  border-color: rgba(165, 243, 252, 0.09);
}

.app-luxury-shell:not(.print-mode) .surface-card,
.app-luxury-shell:not(.print-mode) .quiet-card {
  border-color: rgba(165, 243, 252, 0.1);
  background:
    linear-gradient(145deg, rgba(12, 28, 25, 0.82), rgba(4, 12, 12, 0.9)),
    rgba(4, 12, 12, 0.88);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.035),
    0 30px 95px rgba(0, 0, 0, 0.34),
    0 0 55px rgba(34, 211, 238, 0.035),
    0 0 0 1px rgba(34, 211, 238, 0.018);
  backdrop-filter: blur(20px);
}

.app-luxury-shell:not(.print-mode) .surface-card:hover,
.app-luxury-shell:not(.print-mode) .quiet-card:hover {
  border-color: rgba(103, 232, 249, 0.16);
}

.app-luxury-shell:not(.print-mode) table thead tr {
  border-color: rgba(165, 243, 252, 0.1);
  background: rgba(2, 8, 8, 0.72);
  color: rgba(207, 250, 254, 0.5);
}

.app-luxury-shell:not(.print-mode) table tbody tr:hover {
  background-color: rgba(34, 211, 238, 0.035) !important;
  box-shadow: inset 3px 0 0 rgba(103, 232, 249, 0.34), 0 0 28px rgba(34, 211, 238, 0.045);
}

.app-luxury-shell:not(.print-mode) .badge-neutral {
  border-color: rgba(148, 163, 184, 0.15);
  background: rgba(148, 163, 184, 0.07);
  color: rgba(226, 232, 240, 0.68);
}

.app-luxury-shell:not(.print-mode) .badge-success {
  border-color: rgba(110, 231, 183, 0.18);
  background: rgba(16, 185, 129, 0.09);
  color: rgba(167, 243, 208, 0.88);
}

.app-luxury-shell:not(.print-mode) .badge-warning {
  border-color: rgba(251, 191, 36, 0.18);
  background: rgba(245, 158, 11, 0.08);
  color: rgba(253, 230, 138, 0.85);
}

.app-luxury-shell:not(.print-mode) .button-primary {
  background: linear-gradient(110deg, #a7f3d0, #67e8f9);
  color: #03110f;
  box-shadow: 0 12px 32px rgba(34, 211, 238, 0.13);
}

.app-luxury-shell:not(.print-mode) .button-secondary {
  border-color: rgba(165, 243, 252, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(236, 254, 255, 0.82);
}

.app-luxury-shell:not(.print-mode) .button-secondary:hover {
  border-color: rgba(103, 232, 249, 0.28);
  background: rgba(103, 232, 249, 0.07);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.24), 0 0 28px rgba(103, 232, 249, 0.075);
}

.app-luxury-shell:not(.print-mode) button:focus-visible,
.app-luxury-shell:not(.print-mode) a:focus-visible {
  outline-color: rgba(103, 232, 249, 0.9);
}

.app-luxury-shell:not(.print-mode) .stat-depth-card,
.app-luxury-shell:not(.print-mode) .competency-card,
.app-luxury-shell:not(.print-mode) .assignment-premium-card {
  border-color: rgba(165, 243, 252, 0.1);
  background: linear-gradient(150deg, rgba(11, 27, 24, 0.94), rgba(4, 12, 12, 0.96));
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
}

.app-luxury-shell:not(.print-mode) .stat-depth-card::after,
.app-luxury-shell:not(.print-mode) .competency-card::after,
.app-luxury-shell:not(.print-mode) .assignment-premium-card::after {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.luxury-sidebar::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(150deg, rgba(110, 231, 183, 0.025), transparent 38%, rgba(34, 211, 238, 0.025));
}

.home-story-section {
  background:
    linear-gradient(180deg, #030606 0%, #020706 44%, #030909 100%);
}

.competency-cinematic-card::before,
.assignment-cinematic-card::before,
.hero-intelligence-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.05), transparent 35%),
    radial-gradient(circle at 80% 12%, rgba(103, 232, 249, 0.08), transparent 30%);
}

.editorial-page-hero {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background:
    radial-gradient(circle at 86% 16%, rgba(103, 232, 249, 0.12), transparent 30%),
    radial-gradient(circle at 12% 88%, rgba(110, 231, 183, 0.09), transparent 34%),
    linear-gradient(145deg, rgba(10, 26, 23, 0.86), rgba(3, 10, 10, 0.94));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 34px 110px rgba(0, 0, 0, 0.34),
    0 0 80px rgba(34, 211, 238, 0.035);
}

.editorial-page-hero .page-heading {
  font-size: clamp(2.55rem, 5.8vw, 5.6rem);
  line-height: 0.96;
  letter-spacing: -0.065em;
}

.projects-cinematic-grid {
  perspective: 1200px;
}

.evidence-luxury-page .quiet-card,
.rubric-luxury-page .surface-card,
.summary-luxury-page .quiet-card {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 28px 90px rgba(0, 0, 0, 0.3),
    0 0 55px rgba(34, 211, 238, 0.035);
}

.motion-depth-section {
  position: relative;
  transform-origin: 50% 34%;
  will-change: opacity, transform, filter;
}

.motion-depth-section::after {
  content: '';
  position: absolute;
  inset: 1px;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.045), transparent 34%, rgba(103, 232, 249, 0.035));
  opacity: 0.88;
}

.motion-hover-depth {
  will-change: transform;
}

.motion-hover-depth:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.055),
    0 38px 120px rgba(0, 0, 0, 0.42),
    0 0 80px rgba(34, 211, 238, 0.06);
}

.competency-cinematic-card,
.assignment-cinematic-card,
.summary-cinematic-panel,
.summary-integrity-panel,
.evidence-dashboard,
.rubric-score-card {
  transform-style: preserve-3d;
}

.inner-page-hero {
  background:
    linear-gradient(145deg, rgba(10, 26, 23, 0.72), rgba(3, 10, 10, 0.84)),
    rgba(3, 10, 10, 0.8);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.035),
    0 24px 80px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(22px);
}

.inner-luxury-page .surface-card,
.inner-luxury-page .quiet-card,
.inner-luxury-page .assignment-premium-card {
  position: relative;
}

.inner-luxury-page .surface-card::before,
.inner-luxury-page .quiet-card::before,
.inner-luxury-page .assignment-premium-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: radial-gradient(circle at 85% 8%, rgba(103, 232, 249, 0.065), transparent 30%), radial-gradient(circle at 8% 88%, rgba(110, 231, 183, 0.045), transparent 28%);
}

.evidence-dashboard table {
  border-spacing: 0;
}

.evidence-dashboard tbody tr,
.rubric-luxury-page tbody tr {
  background: rgba(255, 255, 255, 0.012);
}

.rubric-score-card {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 30px 90px rgba(0, 0, 0, 0.28),
    0 0 55px rgba(16, 185, 129, 0.045);
}

.summary-cinematic-panel,
.summary-integrity-panel {
  background:
    radial-gradient(circle at 86% 12%, rgba(103, 232, 249, 0.09), transparent 30%),
    linear-gradient(145deg, rgba(10, 27, 24, 0.86), rgba(2, 8, 8, 0.94));
}

@keyframes app-glow-drift {
  from { transform: translate3d(-3%, -2%, 0) scale(0.96); }
  to { transform: translate3d(4%, 3%, 0) scale(1.06); }
}

@keyframes luxury-aurora {
  0% { background-position: 0% 30%; filter: hue-rotate(0deg); }
  55% { background-position: 70% 55%; filter: hue-rotate(7deg); }
  100% { background-position: 100% 80%; filter: hue-rotate(-4deg); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .hero-cinematic::after,
  .hero-aurora,
  .luxury-aurora,
  .cinematic-hero-aurora,
  .luxury-app-glow { animation: none; }
}

@media print {
  @page { margin: 14mm; }

  .no-print { display: none !important; }

  body, html, #root {
    background: white !important;
    color: black !important;
  }

  .print-card {
    box-shadow: none !important;
    border: 1px solid #cfcfcf !important;
    background: white !important;
  }

  .break-inside-avoid {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .page-break-before {
    page-break-before: always;
    break-before: page;
  }
}
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171817',
        muted: '#666966',
        canvas: '#f7f7f5',
        panel: '#ffffff',
        soft: '#efefec',
        line: '#deded9',
        emerald: '#087a55',
        'emerald-soft': '#e2f3eb',
        amber: '#9a5b08',
        'amber-soft': '#fff1d6',
        danger: '#b42318',
        'danger-soft': '#fee9e7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        ambient: '0 12px 32px rgba(23, 24, 23, 0.06)',
        lift: '0 18px 40px rgba(23, 24, 23, 0.09)',
      },
    },
  },
  plugins: [],
};
```

## Commands And Results

### npm run lint

```text

> my-portfolio@0.0.0 lint
> eslint .
```

### npm run build

```text

> my-portfolio@0.0.0 build
> vite build

[36mvite v8.0.16 [32mbuilding client environment for production...[36m[39m
[2Ktransforming...✓ 2160 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.46 kB │ gzip:   0.29 kB
dist/assets/index-DH-V-jvX.css   61.31 kB │ gzip:  12.17 kB
dist/assets/index-Bvv008Tq.js   526.91 kB │ gzip: 171.87 kB

[32m✓ built in 1.37s[39m
```

### git status --short

```text
 M .agents/skills/premium-animated-ui/SKILL.md
 M AGENTS.md
 M package-lock.json
 M package.json
 M src/App.jsx
 M src/components/EvidenceTable.jsx
 M src/components/HomeTab.jsx
 M src/components/PrintView.jsx
 M src/components/ProjectsTab.jsx
 M src/components/RubricTable.jsx
 M src/components/Sidebar.jsx
 M src/components/Summary.jsx
 M src/index.css
 M tailwind.config.js
?? docs/CODEBASE_CONTEXT_FOR_CHATGPT.md
?? public/media/
?? src/components/AnimatedNumber.jsx
?? src/components/AssignmentCard.jsx
?? src/components/AssignmentDetail.jsx
?? src/components/Hero.jsx
?? src/motion/
```

### git diff --stat

```text
 .agents/skills/premium-animated-ui/SKILL.md | 158 ++++--
 AGENTS.md                                   |  86 +++-
 package-lock.json                           |  65 ++-
 package.json                                |   3 +
 src/App.jsx                                 |  73 ++-
 src/components/EvidenceTable.jsx            | 167 ++-----
 src/components/HomeTab.jsx                  | 125 ++---
 src/components/PrintView.jsx                |   6 +-
 src/components/ProjectsTab.jsx              | 280 ++---------
 src/components/RubricTable.jsx              | 135 ++----
 src/components/Sidebar.jsx                  | 121 +++--
 src/components/Summary.jsx                  |  73 +--
 src/index.css                               | 713 +++++++++++++++++++++++++++-
 tailwind.config.js                          |  37 +-
 14 files changed, 1252 insertions(+), 790 deletions(-)
```

## What Should Not Be Changed

- Do not break the Print PDF page.
- Do not animate the Print PDF page.
- Do not break Ctrl+P / Save PDF behavior.
- Do not remove PDF/report links.
- Do not remove Google Drive links.
- Do not change assignment data.
- Do not change evidence data.
- Do not fake content, stats, assignments, evidence, or reports.
- Do not rewrite the whole app from scratch unless explicitly authorized.

## Suggested Next Debugging Steps

1. Open the actual visible browser the user is using and inspect `matchMedia('(prefers-reduced-motion: reduce)').matches`. If true, the current code will intentionally show the poster and no video.
2. In browser devtools console, inspect `window.__heroScrubDebug`, `window.__heroScrubDebug.video`, and `window.__heroScrubDebug.scrollTriggers` in dev mode.
3. Verify `document.querySelector('video')` exists on the Home tab when reduced motion is false.
4. Verify `video.duration`, `video.readyState`, `video.seekable`, and `video.currentTime` while manually scrolling.
5. Check computed styles for `html`, `body`, `#root`, app shell, `main`, `.tab-motion-shell`, `[data-hero-section]`, and `.cinematic-hero`: specifically `overflowX`, `overflowY`, `transform`, `willChange`, `contain`, `position`, and bounding rects while scrolling.
6. Temporarily lower hero media overlays in devtools to confirm whether the video is present but visually darkened.
7. Test the MP4 independently in a blank page with a simple `<video controls src="/media/hero-loop.mp4">` and manual `currentTime` changes.
8. Inspect video encoding. If scrubbing feels static despite `currentTime` changing, re-encode with fast-start metadata and frequent keyframes, for example 24/30 fps with keyframes every 0.5 seconds or less.
9. Disable heavy blur/backdrop filters around the hero temporarily and check whether visual motion becomes smoother.
10. Consider replacing CSS sticky with GSAP pinning again only after confirming no ancestor containment/transform issues remain. If pinning is used, validate layout in the visible browser and mobile widths.
11. Verify mobile/responsive behavior at 375px, 768px, and 1280px after any hero fix.
12. Re-run `npm run lint` and `npm run build`, but treat them only as static checks, not proof that visual scroll-scrub works.

## Source Files Included

- `package.json`
- `src/App.jsx`
- `src/components/Hero.jsx`
- `src/components/HomeTab.jsx`
- `src/motion/variants.js`
- `src/index.css`
- `tailwind.config.js`
