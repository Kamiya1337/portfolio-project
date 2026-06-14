import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { blurSlideUp, cardHover, lineReveal, motionViewport, staggerGrid, tableRowReveal } from '../motion/variants';

const valid = (value) => Boolean(value && value !== 'Sẽ cập nhật sau' && value !== 'Không yêu cầu');

export default function RubricTable() {
  const { projects } = portfolioData;
  const reduceMotion = useReducedMotion();
  const totalMilestones = projects.length * 2;
  const completedMilestones = projects.reduce((count, project) => count + Number(valid(project.report)) + Number(valid(project.evidenceImg)), 0);
  const progressPercent = Math.round(50 + (completedMilestones / totalMilestones) * 50);

  const rows = projects.map((project) => {
    const reportDone = valid(project.report);
    const imageDone = valid(project.evidenceImg);
    return { id: project.id, title: `${project.title.split(':')[0]}: Minh chứng thực hiện`, standard: 'Đầy đủ file báo cáo chi tiết nội dung học tập và hình ảnh screenshot thực tế.', complete: reportDone && imageDone, action: reportDone && imageDone ? 'Đã đồng bộ' : `Cần bổ sung: ${!reportDone ? 'File báo cáo PDF' : ''}${!reportDone && !imageDone ? ' & ' : ''}${!imageDone ? 'Ảnh screenshot' : ''}` };
  });

  const StatusBadge = ({ complete }) => complete ? <span className="badge-success"><CheckCircle2 size={13} /> Đạt chuẩn Xuất sắc</span> : <span className="badge-warning"><AlertTriangle size={13} /> Thiếu minh chứng</span>;

  return (
    <div className="page-shell inner-luxury-page rubric-luxury-page">
      <motion.header initial={reduceMotion ? false : 'hidden'} animate="visible" variants={blurSlideUp} className="inner-page-hero editorial-page-hero motion-depth-section relative overflow-hidden rounded-[30px] border border-cyan-100/[0.1] px-5 py-9 sm:px-9 sm:py-12"><div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.1),transparent_68%)]" /><p className="section-label">Assessment framework</p><h1 className="page-heading mt-3 max-w-4xl">Tự Đánh giá theo Rubric môn học</h1><p className="page-description">Trạng thái được tính trực tiếp từ các tệp minh chứng hiện có trong dữ liệu Portfolio.</p><motion.div initial={reduceMotion ? false : 'hidden'} animate="visible" variants={lineReveal} className="mt-6 h-px origin-left bg-gradient-to-r from-cyan-200/45 via-cyan-100/10 to-transparent" /></motion.header>

      <motion.section initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp} whileHover={reduceMotion ? undefined : cardHover} className="surface-card rubric-score-card motion-hover-depth overflow-hidden">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="section-label">Portfolio readiness score</p><h2 className="mt-2 font-display text-xl font-semibold">Tiến độ minh chứng thực tế</h2><p className="mt-2 text-sm leading-6 text-muted">Đã tích hợp <strong className="text-ink">{completedMilestones}/{totalMilestones}</strong> mục báo cáo và hình ảnh. Điểm số phản ánh đúng dữ liệu hiện có.</p></div><div className="flex items-end justify-between gap-5 lg:block lg:text-right"><p className="font-display text-5xl font-semibold tracking-[-0.05em]">{progressPercent}%</p><p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">Readiness</p></div></div>
        <div className="h-1.5 bg-cyan-100/[0.06]"><motion.div initial={reduceMotion ? { width: `${progressPercent}%` } : { width: 0 }} whileInView={{ width: `${progressPercent}%` }} viewport={motionViewport} transition={{ duration: reduceMotion ? 0 : 1, ease: [0.25, 0.46, 0.45, 0.94] }} className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.35)]" /></div>
      </motion.section>

      <motion.section initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={blurSlideUp} className="surface-card motion-depth-section overflow-hidden">
        <motion.div initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="divide-y divide-line md:hidden">
          <motion.article variants={tableRowReveal} whileHover={reduceMotion ? undefined : { y: -2, backgroundColor: 'rgba(103,232,249,0.045)' }} className="p-4"><div className="flex items-start gap-3"><div className="rounded-lg bg-soft p-2"><Target size={16} /></div><div><h2 className="font-display text-sm font-semibold">Thiết kế và cấu trúc Portfolio</h2><p className="mt-2 text-sm leading-6 text-muted">Giao diện chuyên nghiệp, cấu trúc rõ ràng, điều hướng mượt mà, chuẩn UI/UX học thuật.</p><div className="mt-3 flex flex-wrap items-center gap-2"><span className="badge-success"><CheckCircle2 size={13} /> Hoàn thành Layout</span><span className="text-xs text-muted line-through">Đã xong</span></div></div></div></motion.article>
          {rows.map((row) => <motion.article key={row.id} variants={tableRowReveal} whileHover={reduceMotion ? undefined : { y: -2, backgroundColor: 'rgba(103,232,249,0.045)' }} className="p-4"><div className="flex items-start gap-3"><div className="rounded-lg bg-soft p-2"><Target size={16} /></div><div className="min-w-0"><h2 className="font-display text-sm font-semibold leading-6">{row.title}</h2><p className="mt-2 text-sm leading-6 text-muted">{row.standard}</p><div className="mt-3"><StatusBadge complete={row.complete} /></div><p className={`mt-3 text-xs italic ${row.complete ? 'text-muted line-through' : 'text-danger'}`}>{row.action}</p></div></div></motion.article>)}
        </motion.div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead><tr className="border-b border-line bg-ink font-mono text-[10px] uppercase tracking-[0.1em] text-white/70"><th className="w-1/4 px-5 py-4 font-medium">Tiêu chí chấm điểm</th><th className="w-1/3 px-5 py-4 font-medium">Tiêu chuẩn Xuất sắc</th><th className="px-5 py-4 font-medium">Hiện trạng</th><th className="px-5 py-4 font-medium">Hành động</th></tr></thead>
            <motion.tbody initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={motionViewport} variants={staggerGrid} className="divide-y divide-line text-sm"><motion.tr variants={tableRowReveal} whileHover={reduceMotion ? undefined : { backgroundColor: 'rgba(103,232,249,0.045)' }}><td className="px-5 py-5 font-semibold"><span className="flex items-start gap-2"><Target size={16} className="mt-0.5 shrink-0" />Thiết kế và cấu trúc Portfolio</span></td><td className="px-5 py-5 leading-6 text-muted">Giao diện chuyên nghiệp, cấu trúc rõ ràng, điều hướng mượt mà, chuẩn UI/UX học thuật.</td><td className="px-5 py-5"><span className="badge-success"><CheckCircle2 size={13} /> Hoàn thành Layout</span></td><td className="px-5 py-5 text-muted line-through">Đã xong</td></motion.tr>{rows.map((row) => <motion.tr key={row.id} variants={tableRowReveal} whileHover={reduceMotion ? undefined : { backgroundColor: 'rgba(103,232,249,0.045)' }}><td className="px-5 py-5 font-semibold"><span className="flex items-start gap-2"><Target size={16} className="mt-0.5 shrink-0" />{row.title}</span></td><td className="px-5 py-5 leading-6 text-muted">{row.standard}</td><td className="px-5 py-5"><StatusBadge complete={row.complete} /></td><td className={`px-5 py-5 text-xs italic ${row.complete ? 'text-muted line-through' : 'text-danger'}`}>{row.action}</td></motion.tr>)}</motion.tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
