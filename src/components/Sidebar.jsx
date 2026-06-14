import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, CheckSquare, Cpu, FileCheck, Home, Menu, MessageSquare, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const navItems = [
  { id: 'home', icon: Home, label: 'Tổng quan' },
  { id: 'projects', icon: BookOpen, label: 'Bài tập & Dự án' },
  { id: 'evidence', icon: FileCheck, label: 'Minh chứng' },
  { id: 'rubric', icon: CheckSquare, label: 'Rubric' },
  { id: 'summary', icon: MessageSquare, label: 'Tổng kết' },
];

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) {
  const { student } = portfolioData;
  const reduceMotion = useReducedMotion();
  const selectTab = (id) => { setActiveTab(id); setIsMobileOpen(false); };

  return (
    <>
      <header className="no-print sticky top-0 z-40 flex h-16 items-center justify-between border-b border-cyan-100/[0.09] bg-[#020605]/82 px-4 text-white shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-200/15 bg-gradient-to-br from-emerald-300/18 to-cyan-300/[0.05] text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,0.14)]"><Cpu size={18} /><span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" /></div>
          <div><p className="font-display text-sm font-semibold text-white/92">Engineering Portfolio</p><p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cyan-100/35">VNU - UET / AI Systems</p></div>
        </div>
        <motion.button type="button" aria-label={isMobileOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={isMobileOpen} onClick={() => setIsMobileOpen(!isMobileOpen)} whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }} className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white">{isMobileOpen ? <X size={20} /> : <Menu size={20} />}</motion.button>
      </header>

      <aside className={`${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} luxury-sidebar no-print fixed inset-y-0 left-0 z-50 flex w-[min(19rem,88vw)] flex-col overflow-hidden border-r border-cyan-100/[0.1] bg-[#020706]/84 text-white shadow-[35px_0_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl transition-transform duration-300 md:w-72 md:translate-x-0`}>
        <div className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full bg-emerald-300/[0.1] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-300/[0.08] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_38%,rgba(103,232,249,0.025))]" aria-hidden="true" />

        <div className="relative p-5 pb-4">
          <div className="rounded-[22px] border border-cyan-100/[0.09] bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-gradient-to-br from-emerald-300/20 to-cyan-300/5 text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.13)]"><Cpu size={21} /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" /></div>
              <div className="min-w-0"><h2 className="truncate font-display text-sm font-semibold text-white/92">{student.name}</h2><p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.14em] text-cyan-100/35">{student.major} / UET</p></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2"><p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/28">Mode</p><p className="mt-1 text-xs font-semibold text-emerald-100/80">Cinematic</p></div>
              <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2"><p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/28">Year</p><p className="mt-1 text-xs font-semibold text-cyan-100/80">2025-26</p></div>
            </div>
          </div>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-3 py-5" aria-label="Điều hướng chính">
          <p className="px-3 pb-3 font-mono text-[8px] uppercase tracking-[0.22em] text-cyan-100/25">Navigation matrix</p>
          <div className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button type="button" key={item.id} onClick={() => selectTab(item.id)} whileHover={reduceMotion ? undefined : { x: 4, scale: 1.01 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className={`group relative flex min-h-14 w-full items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-left text-sm transition-colors ${isActive ? 'text-white' : 'text-white/42 hover:bg-white/[0.035] hover:text-white/82'}`}>
                  {isActive && <motion.span layoutId="sidebar-active" className="absolute inset-0 rounded-2xl border border-cyan-200/[0.15] bg-gradient-to-r from-emerald-300/[0.16] via-cyan-300/[0.08] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_40px_rgba(0,0,0,0.18),0_0_32px_rgba(34,211,238,0.08)]" transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 31 }} />}
                  <span className="relative z-10 w-5 font-mono text-[9px] text-cyan-100/28">0{index + 1}</span>
                  <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border ${isActive ? 'border-cyan-200/15 bg-cyan-200/[0.12] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.1)]' : 'border-white/[0.03] bg-white/[0.025] text-white/30 group-hover:text-white/70'}`}><Icon size={17} strokeWidth={1.7} /></span>
                  <span className="relative z-10 flex-1 font-medium tracking-[-0.01em]">{item.label}</span>
                  {isActive && <span className="relative z-10 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.98)]" />}
                </motion.button>
              );
            })}
          </div>
        </nav>

        <div className="relative m-3 rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="px-1 font-mono text-[8px] uppercase leading-5 tracking-[0.15em] text-white/25"><p>Digital Technology & AI</p><p>Academic submission system</p></div>
        </div>
      </aside>

      {isMobileOpen && <button type="button" aria-label="Đóng menu" className="no-print fixed inset-0 z-40 bg-black/75 backdrop-blur-sm md:hidden" onClick={() => setIsMobileOpen(false)} />}
    </>
  );
}
