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
