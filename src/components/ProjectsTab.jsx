import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { blurSlideUp, lineReveal, motionViewport, staggerGrid } from '../motion/variants';
import AssignmentCard from './AssignmentCard';
import AssignmentDetail from './AssignmentDetail';

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', type: '' });
  const reduceMotion = useReducedMotion();
  const { projects } = portfolioData;

  const openPreview = (event, url, type) => {
    event.preventDefault();
    setPreviewData({ isOpen: true, url, type });
  };

  const closePreview = () => setPreviewData({ isOpen: false, url: '', type: '' });

  if (selectedProject) {
    return <AssignmentDetail project={selectedProject} onBack={() => setSelectedProject(null)} previewData={previewData} onPreview={openPreview} onClosePreview={closePreview} />;
  }

  return (
    <div data-print-section className="page-shell inner-luxury-page projects-cinematic-page">
      <motion.header data-print-section initial={reduceMotion ? false : 'hidden'} animate="visible" variants={blurSlideUp} className="inner-page-hero editorial-page-hero motion-depth-section relative overflow-hidden rounded-[30px] border border-cyan-100/[0.1] px-5 py-9 sm:px-9 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.1),transparent_68%)]" />
        <p className="section-label">Assignments archive</p>
        <h1 className="page-heading mt-3 max-w-3xl">Các bài tập thành phần</h1>
        <p className="page-description">Danh sách các bài học trọng tâm từ Chương 1 đến Chương 6, giữ nguyên toàn bộ báo cáo và minh chứng đã liên kết.</p>
        <motion.div variants={lineReveal} className="mt-6 h-px origin-left bg-gradient-to-r from-cyan-200/45 via-cyan-100/10 to-transparent" />
      </motion.header>
      <motion.section
        data-print-section
        data-print-grid
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerGrid}
        className="projects-cinematic-grid grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => <AssignmentCard key={project.id} project={project} onSelect={setSelectedProject} />)}
      </motion.section>
    </div>
  );
}
