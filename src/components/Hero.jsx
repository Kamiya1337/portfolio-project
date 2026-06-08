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
  hidden: { opacity: 0, y: 34 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    // filter: 'blur(0px)',
    transition: { duration: 0.82, delay: 0.12 + index * 0.09, ease },
  }),
};

export default function Hero({ student, setActiveTab }) {
  const reduceMotion = useReducedMotion();
  const forceVideo = import.meta.env.DEV && new URLSearchParams(window.location.search).get('forceVideo') === '1';
  const shouldReduceMotion = reduceMotion && !forceVideo;
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

    if (shouldReduceMotion) return undefined;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) {
      setScrubDebug((current) => ({ ...current, videoPresent: Boolean(video) }));
      return undefined;
    }

    let trigger;
    let frameRequest = 0;

    const updateDebug = () => {};

    const createScrollScrub = () => {
      const duration = video.duration;

      if (!Number.isFinite(duration) || duration <= 0) return;

      video.pause();
      video.currentTime = 0.001;

      const scrubTo = gsap.quickTo(video, 'currentTime', {
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      trigger = ScrollTrigger.create({
        id: 'hero-video-scrub',
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const safeDuration = Math.max(video.duration - 0.08, 0);
          const nextTime = progress * safeDuration;

          if (Number.isFinite(nextTime)) {
            scrubTo(nextTime);
          }
        },
      });

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
      gsap.killTweensOf(video, 'currentTime');
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
        {false && import.meta.env.DEV && (
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
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100/15 bg-black/25 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-50/75 backdrop-blur-sm"><Sparkles size={12} className="text-cyan-300" /> Computer Engineering / AI</div>
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

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.78, delay: 0.62, ease }} className="mt-7 max-w-2xl border-l border-cyan-100/25 pl-5">
              <p className="text-base leading-7 text-white/78 sm:text-lg">Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/48">{student.bio}</p>
            </motion.div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.72, delay: 0.76, ease }} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.button type="button" onClick={() => setActiveTab('projects')} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.045 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-200 via-emerald-300 to-cyan-300 px-6 py-3.5 text-sm font-semibold text-[#02100d] shadow-[0_18px_55px_rgba(45,212,191,0.24)]"><Layers size={17} /> Khám phá bài tập <ArrowRight size={16} /></motion.button>
              <motion.button type="button" onClick={() => setActiveTab('evidence')} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.045, backgroundColor: 'rgba(255,255,255,0.12)' }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-sm"><FileCheck2 size={17} /> Xem minh chứng</motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 36, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: 0.24, ease }}
            style={reduceMotion ? undefined : { x: mediaX, y: mediaY, rotateX: mediaRotateX, rotateY: mediaRotateY, transformPerspective: 1500 }}
            className="hero-media-dominant relative z-10 mx-auto w-full max-w-[1040px] lg:mx-0"
          >
            <div className="hero-media-orb absolute inset-[8%] rounded-full bg-cyan-300/[0.12] blur-[64px]" />
            <div className="hero-media-glass-frame relative aspect-[16/10] overflow-hidden rounded-[34px] border border-cyan-100/[0.18] bg-black/35 p-2 shadow-[0_48px_130px_rgba(0,0,0,0.62)] backdrop-blur-sm">
              <div className="relative h-full overflow-hidden rounded-[26px] bg-[#010404]">
                {shouldReduceMotion ? (
                  <img src="/media/hero-poster.png" alt="Cinematic computer engineering visual" width="1600" height="1000" className="h-full w-full object-cover object-center" />
                ) : (
                  <video ref={videoRef} muted playsInline poster="/media/hero-poster.png" preload="auto" aria-label="Scroll-scrubbed cinematic computer engineering visual" className="h-full w-full object-cover object-center">
                    <source src="/media/hero-loop-scrub-60-interp.mp4" type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-cyan-950/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/58 backdrop-blur-sm">Hero-loop.mp4 / compute signal</div>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-300/[0.075] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-100/78 backdrop-blur-sm"><Radio size={11} className="text-emerald-300" /> Live visual</div>
                </div>
              </div>
            </div>

            <motion.div animate={reduceMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-3 top-[12%] hidden min-w-48 rounded-2xl border border-cyan-100/[0.14] bg-[#061310]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:block">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200/10 bg-emerald-300/[0.08] text-emerald-200"><CircuitBoard size={18} /></span><div><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">System focus</p><p className="mt-1 text-sm font-semibold text-white/86">AI Engineering</p></div></div>
            </motion.div>

            <motion.div animate={reduceMotion ? undefined : { y: [0, 10, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }} className="absolute -bottom-5 right-[7%] hidden w-56 rounded-2xl border border-cyan-100/[0.14] bg-[#04100e]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-sm sm:block">
              <div className="flex items-center justify-between"><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Portfolio index</p><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,0.9)]" /></div>
              <div className="mt-3 flex items-end justify-between"><p className="font-display text-3xl font-semibold tracking-[-0.04em] text-white">06</p><p className="pb-1 text-[10px] text-white/42">documented projects</p></div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]"><motion.div initial={reduceMotion ? { width: '86%' } : { width: 0 }} animate={{ width: '86%' }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.9, ease }} className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" /></div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={reduceMotion ? false : 'hidden'} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.9 } } }} className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.09] bg-black/30 backdrop-blur-sm lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.article key={stat.label} variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease } } }} whileHover={reduceMotion ? undefined : { backgroundColor: 'rgba(103,232,249,0.055)' }} className={`p-4 sm:p-5 ${index % 2 === 0 ? 'border-r border-white/[0.07]' : ''} ${index < 2 ? 'border-b border-white/[0.07] lg:border-b-0' : ''} ${index !== stats.length - 1 ? 'lg:border-r lg:border-white/[0.07]' : ''}`}>
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
