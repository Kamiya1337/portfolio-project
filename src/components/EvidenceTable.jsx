import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { AlertCircle, CheckCircle2, ExternalLink, FileCheck2, Files, Maximize2, X, XCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { blurSlideUp, cardHover, lineReveal, motionViewport, staggerGrid, tableRowReveal } from '../motion/variants';

function isComplete(value) {
  return Boolean(value && value !== 'Sẽ cập nhật sau' && value !== 'Không yêu cầu');
}

export default function EvidenceTable() {
  const { projects } = portfolioData;
  const reduceMotion = useReducedMotion();
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', type: '' });
  const completed = projects.filter((project) => isComplete(project.report) && isComplete(project.evidenceImg) && isComplete(project.driveLink)).length;

  const openPreview = (event, url, type) => {
    if (type === 'drive') return;
    event.preventDefault();
    setPreviewData({ isOpen: true, url, type });
  };

  const EvidenceLink = ({ value, label, type, compact = false }) => {
    if (!value || value === 'Sẽ cập nhật sau') return <span className="badge-warning">Đang chờ</span>;
    if (value === 'Không yêu cầu') return <span className="badge-neutral">Không yêu cầu</span>;
    const Icon = type === 'drive' ? ExternalLink : Maximize2;
    return <motion.a href={value} target="_blank" rel="noreferrer" onClick={(event) => openPreview(event, value, type)} whileHover={reduceMotion ? undefined : { scale: 1.025, y: -1 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-cyan-100/[0.12] bg-cyan-100/[0.045] font-semibold text-cyan-50/85 transition-colors hover:border-cyan-200/30 hover:bg-cyan-200/[0.075] ${compact ? 'w-full px-3 py-2 text-xs' : 'px-3 py-2 text-sm'}`}>{label}<Icon size={14} /></motion.a>;
  };

  const StatusBadge = ({ project }) => {
    const complete = isComplete(project.report) && isComplete(project.evidenceImg) && isComplete(project.driveLink);
    return complete ? <span className="badge-success"><CheckCircle2 size={13} /> Đã nộp</span> : <span className="inline-flex items-center gap-1.5 rounded-full border border-danger/15 bg-danger-soft px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-danger"><XCircle size={13} /> Thiếu MC</span>;
  };

  return (
    <div className="page-shell inner-luxury-page evidence-luxury-page">
      {previewData.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-2 backdrop-blur-sm sm:p-6 print:hidden" role="dialog" aria-modal="true" aria-label="Xem trước minh chứng">
          <div className="flex h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-lift sm:h-[90vh] sm:rounded-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-3 sm:px-5">
              <div className="min-w-0"><p className="section-label">Preview</p><h3 className="truncate font-display text-sm font-semibold sm:text-base">{previewData.type === 'pdf' ? 'Báo cáo PDF' : 'Ảnh minh chứng'}</h3></div>
              <div className="flex shrink-0 items-center gap-2"><a href={previewData.url} target="_blank" rel="noreferrer" className="hidden rounded-lg border border-line px-3 py-2 text-xs font-semibold sm:inline-flex">Mở thẻ mới</a><button type="button" aria-label="Đóng xem trước" onClick={() => setPreviewData({ isOpen: false, url: '', type: '' })} className="rounded-lg border border-line p-2 hover:bg-soft"><X size={18} /></button></div>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-soft p-2 sm:p-5">{previewData.type === 'pdf' ? <iframe src={previewData.url} title="PDF Preview" className="h-full w-full rounded-lg border-0 bg-panel" /> : <img src={previewData.url} alt="Minh chứng" className="max-h-full max-w-full rounded-lg bg-panel object-contain shadow-ambient" />}</div>
          </div>
        </div>
      )}

      <motion.header initial={reduceMotion ? false : 'hidden'} animate="visible" variants={blurSlideUp} className="inner-page-hero editorial-page-hero motion-depth-section relative overflow-hidden rounded-[30px] border border-cyan-100/[0.1] px-5 py-9 sm:px-9 sm:py-12"><div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-300/[0.08] blur-3xl" /><p className="section-label">Evidence control board</p><h1 className="page-heading mt-3 max-w-4xl">Bảng Kiểm soát Minh chứng</h1><p className="page-description">Tổng hợp tình trạng các file báo cáo, hình ảnh và liên kết sản phẩm cần nộp.</p><motion.div initial={reduceMotion ? false : 'hidden'} animate="visible" variants={lineReveal} className="mt-6 h-px origin-left bg-gradient-to-r from-cyan-200/45 via-cyan-100/10 to-transparent" /></motion.header>

      <motion.section initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[{ label: 'Bài tập', value: projects.length, icon: Files }, { label: 'Đã đủ minh chứng', value: completed, icon: CheckCircle2 }, { label: 'Cần kiểm tra', value: projects.length - completed, icon: AlertCircle }, { label: 'Loại tài nguyên', value: 3, icon: FileCheck2 }].map((item) => { const Icon = item.icon; return <motion.article key={item.label} variants={blurSlideUp} whileHover={reduceMotion ? undefined : cardHover} className="quiet-card motion-hover-depth p-4 sm:p-5"><div className="flex items-center justify-between"><p className="section-label leading-4">{item.label}</p><Icon size={17} className="text-muted" /></div><p className="mt-3 font-display text-3xl font-semibold tracking-tight">{item.value}</p></motion.article>; })}
      </motion.section>

      <motion.section initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp} className="surface-card evidence-dashboard motion-depth-section overflow-hidden">
        <div className="flex items-start gap-3 border-b border-line bg-soft px-4 py-4 sm:px-5"><AlertCircle className="mt-0.5 shrink-0 text-muted" size={18} /><p className="text-sm leading-6 text-muted"><strong className="text-ink">Ghi chú:</strong> Chọn Báo cáo hoặc Hình ảnh để xem nhanh. Google Drive mở trong thẻ mới.</p></div>

        <motion.div initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="divide-y divide-line md:hidden">
          {projects.map((project) => <motion.article key={project.id} variants={tableRowReveal} whileHover={reduceMotion ? undefined : { y: -2, backgroundColor: 'rgba(103,232,249,0.045)' }} className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-display text-sm font-semibold leading-6">{project.title}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">{project.chapter}</p></div><StatusBadge project={project} /></div><div className="mt-4 grid grid-cols-1 gap-2 min-[430px]:grid-cols-3"><EvidenceLink value={project.report} label="Báo cáo" type="pdf" compact /><EvidenceLink value={project.evidenceImg} label="Hình ảnh" type="img" compact /><EvidenceLink value={project.driveLink} label="Drive" type="drive" compact /></div></motion.article>)}
        </motion.div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead><tr className="border-b border-line bg-panel font-mono text-[10px] uppercase tracking-[0.1em] text-muted"><th className="w-[32%] px-5 py-4 font-medium">Bài tập / Nhiệm vụ</th><th className="px-4 py-4 font-medium">Báo cáo</th><th className="px-4 py-4 font-medium">Screenshot</th><th className="px-4 py-4 font-medium">Google Drive</th><th className="px-4 py-4 text-center font-medium">Trạng thái</th></tr></thead>
            <motion.tbody initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="divide-y divide-line">{projects.map((project) => <motion.tr key={project.id} variants={tableRowReveal} whileHover={reduceMotion ? undefined : { backgroundColor: 'rgba(103,232,249,0.045)' }} className="transition-colors duration-200"><td className="px-5 py-5"><p className="font-display text-sm font-semibold leading-6">{project.title}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{project.chapter}</p></td><td className="px-4 py-5"><EvidenceLink value={project.report} label="Xem báo cáo" type="pdf" /></td><td className="px-4 py-5"><EvidenceLink value={project.evidenceImg} label="Xem ảnh" type="img" /></td><td className="px-4 py-5"><EvidenceLink value={project.driveLink} label="Mở Drive" type="drive" /></td><td className="px-4 py-5 text-center"><StatusBadge project={project} /></td></motion.tr>)}</motion.tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
