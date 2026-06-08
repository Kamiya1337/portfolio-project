import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FileText, Image as ImageIcon, X } from 'lucide-react';
import { blurSlideUp, buttonHover, buttonTap, cardHover, modalReveal, motionViewport, staggerGrid } from '../motion/variants';

function EvidenceItem({ icon: Icon, label, value, type, onPreview }) {
  const reduceMotion = useReducedMotion();
  const isPending = !value || value === 'Sẽ cập nhật sau';
  const isNotRequired = value === 'Không yêu cầu';

  return (
    <motion.div variants={blurSlideUp} whileHover={reduceMotion ? undefined : cardHover} className="quiet-card flex min-h-40 flex-col items-start p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-soft"><Icon size={20} /></div>
      <p className="mt-4 text-sm font-semibold text-ink">{label}</p>
      <div className="mt-auto pt-4">
        {isPending && <span className="badge-warning">Sẽ cập nhật sau</span>}
        {isNotRequired && <span className="badge-neutral">Không yêu cầu</span>}
        {!isPending && !isNotRequired && type === 'drive' && <motion.a href={value} target="_blank" rel="noreferrer" whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap} className="button-secondary px-3 py-2 text-xs">Mở Google Drive <ExternalLink size={14} /></motion.a>}
        {!isPending && !isNotRequired && type !== 'drive' && <motion.a href={value} onClick={(event) => onPreview(event, value, type)} whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap} className="button-secondary px-3 py-2 text-xs">Xem {type === 'pdf' ? 'báo cáo' : 'hình ảnh'} <ExternalLink size={14} /></motion.a>}
      </div>
    </motion.div>
  );
}

export default function AssignmentDetail({ project, onBack, previewData, onPreview, onClosePreview }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div initial={reduceMotion ? false : 'hidden'} animate="visible" variants={blurSlideUp} className="page-shell inner-luxury-page">
      <AnimatePresence>
        {previewData.isOpen && (
          <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-3 backdrop-blur-sm sm:p-6 print:hidden" role="dialog" aria-modal="true" aria-label="Xem trước minh chứng">
            <motion.div variants={modalReveal} initial={reduceMotion ? false : 'hidden'} animate="visible" exit={reduceMotion ? undefined : 'exit'} className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-lift">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
                <div><p className="section-label">Preview</p><h3 className="font-display font-semibold">{previewData.type === 'pdf' ? 'Báo cáo PDF' : 'Ảnh minh chứng'}</h3></div>
                <div className="flex items-center gap-2">
                  <motion.a href={previewData.url} target="_blank" rel="noreferrer" whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap} className="button-secondary px-3 py-2 text-xs">Mở thẻ mới</motion.a>
                  <motion.button type="button" aria-label="Đóng xem trước" onClick={onClosePreview} whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={reduceMotion ? undefined : buttonTap} className="rounded-lg border border-line p-2 hover:bg-soft"><X size={18} /></motion.button>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-auto bg-soft p-3 sm:p-5">
                {previewData.type === 'pdf' ? <iframe src={previewData.url} title="PDF Preview" className="h-full w-full rounded-lg border-0 bg-panel" /> : <img src={previewData.url} alt="Minh chứng" className="max-h-full max-w-full rounded-lg bg-panel object-contain shadow-ambient" />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button type="button" onClick={onBack} whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap} className="button-secondary"><ArrowLeft size={17} /> Quay lại danh sách</motion.button>

      <motion.article initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp} className="surface-card overflow-hidden">
        <header className="relative overflow-hidden bg-ink p-6 text-white sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative max-w-4xl">
            <span className="inline-flex rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75">{project.chapter}</span>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{project.shortDesc}</p>
          </div>
        </header>

        <div className="space-y-8 p-6 sm:p-8 lg:p-10">
          <motion.div initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="grid gap-5 md:grid-cols-2">
            <motion.section variants={blurSlideUp} whileHover={reduceMotion ? undefined : { y: -4 }} className="rounded-xl bg-soft p-5"><p className="section-label">Mục tiêu nhiệm vụ</p><p className="mt-3 text-sm leading-7 text-muted">{project.target}</p></motion.section>
            <motion.section variants={blurSlideUp} whileHover={reduceMotion ? undefined : { y: -4 }} className="rounded-xl bg-soft p-5"><p className="section-label">Kỹ năng áp dụng</p><div className="mt-3 flex flex-wrap gap-2">{project.skills?.map((skill) => <span key={skill} className="badge-neutral bg-panel normal-case tracking-normal">{skill}</span>)}</div></motion.section>
          </motion.div>
          <motion.section initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp}><p className="section-label">Quá trình thực hiện</p><p className="mt-3 max-w-4xl text-sm leading-7 text-muted sm:text-base">{project.process}</p></motion.section>
          <motion.section initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp} className="border-t border-line pt-8">
            <div className="mb-5"><p className="section-label">Deliverables</p><h2 className="mt-2 font-display text-2xl font-semibold">Sản phẩm & Minh chứng</h2></div>
            <motion.div variants={staggerGrid} className="grid gap-4 md:grid-cols-3"><EvidenceItem icon={FileText} label="Báo cáo (PDF/Word)" value={project.report} type="pdf" onPreview={onPreview} /><EvidenceItem icon={ImageIcon} label="Ảnh chụp màn hình" value={project.evidenceImg} type="img" onPreview={onPreview} /><EvidenceItem icon={ExternalLink} label="Tài nguyên Google Drive" value={project.driveLink} type="drive" onPreview={onPreview} /></motion.div>
          </motion.section>
        </div>
      </motion.article>
    </motion.div>
  );
}
