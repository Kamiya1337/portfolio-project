import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, Image as ImageIcon } from 'lucide-react';
import { blurSlideUp, buttonHover, buttonTap, cardHover } from '../motion/variants';

export default function AssignmentCard({ project, onSelect }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article data-print-card variants={blurSlideUp} whileHover={reduceMotion ? undefined : cardHover} className="assignment-premium-card assignment-cinematic-card motion-hover-depth group relative flex min-h-[460px] flex-col overflow-hidden rounded-[28px] border border-cyan-100/[0.12] shadow-[0_16px_44px_rgba(0,0,0,0.3)]">
      <div className="relative h-48 overflow-hidden border-b border-cyan-100/[0.08] bg-[#030909]">
        {project.evidenceImg && project.evidenceImg !== 'Sẽ cập nhật sau' ? (
          <motion.img src={project.evidenceImg} alt={`Minh chứng ${project.title}`} className="h-full w-full object-cover opacity-80" whileHover={reduceMotion ? undefined : { scale: 1.07, opacity: 1 }} transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }} />
        ) : (
          <div className="flex h-full items-center justify-center"><ImageIcon size={28} className="text-muted/40" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020706] via-[#020706]/15 to-cyan-300/[0.05]" />
        <div className="card-sheen absolute inset-0" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full border border-cyan-100/15 bg-[#03100d]/94 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-50/80"><FileText size={11} className="text-cyan-200" /> Assignment {String(project.id).padStart(2, '0')}</div>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-12 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(110,231,183,0.08),transparent_68%)]" />
        <div className="flex items-start justify-between gap-3"><span className="badge-neutral">{project.chapter}</span><span className="badge-warning max-w-[52%] text-right"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" /> {project.status}</span></div>
        <h2 className="relative mt-5 font-display text-xl font-semibold leading-7 tracking-[-0.02em] text-white/92">{project.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{project.shortDesc}</p>
        <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">{project.skills?.slice(0, 3).map((skill) => <span key={skill} className="rounded-md border border-cyan-100/[0.09] bg-cyan-100/[0.035] px-2 py-1 text-[10px] font-medium text-cyan-50/45">{skill}</span>)}</div>
      </div>

      <motion.button type="button" onClick={() => onSelect(project)} whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap} className="m-3 mt-0 flex min-h-12 items-center justify-between rounded-xl border border-cyan-100/[0.12] bg-gradient-to-r from-emerald-300/[0.13] to-cyan-300/[0.09] px-4 py-3.5 text-sm font-semibold text-cyan-50 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
        Xem chi tiết báo cáo <ArrowRight size={17} />
      </motion.button>
    </motion.article>
  );
}
