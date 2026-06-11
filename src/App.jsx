import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import HomeTab from './components/HomeTab';
import ProjectsTab from './components/ProjectsTab';
import EvidenceTable from './components/EvidenceTable';
import RubricTable from './components/RubricTable';
import Summary from './components/Summary';
import PrintView from './components/PrintView';
import { homePageTransition, pageTransition } from './motion/variants';

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
        <header className="no-print sticky top-0 z-30 hidden h-16 items-center border-b border-cyan-100/[0.08] bg-[#020706]/94 px-6 text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] md:flex lg:px-10">
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
          <AnimatePresence mode="wait" initial={false}>
            {isPrintView ? (
              <div key="print">{renderContent()}</div>
            ) : (
              <motion.div
                key={activeTab}
                variants={activeTab === 'home' ? homePageTransition : pageTransition}
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                exit={reduceMotion ? undefined : 'exit'}
                className={activeTab === 'home' ? 'home-tab-motion-shell' : 'tab-motion-shell'}
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
