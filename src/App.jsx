import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import HomeTab from './components/HomeTab';
import ProjectsTab from './components/ProjectsTab';
import EvidenceTable from './components/EvidenceTable';
import RubricTable from './components/RubricTable';
import Summary from './components/Summary';
import { pageTransition } from './motion/variants';

const tabTitles = {
  home: 'Tổng quan Portfolio',
  projects: 'Bài tập & Dự án',
  evidence: 'Kiểm soát Minh chứng',
  rubric: 'Rubric & Đánh giá',
  summary: 'Tổng kết Cá nhân',
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
      default: return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleBeforePrint = () => lenis.stop();
    const handleAfterPrint = () => lenis.start();

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return (
    <div className="app-luxury-shell relative min-h-screen overflow-x-clip bg-[#020606] text-white md:flex">
      <div className="luxury-app-atmosphere no-print" aria-hidden="true">
        <div className="luxury-app-glow luxury-app-glow-primary" />
        <div className="luxury-app-glow luxury-app-glow-secondary" />
        <div className="luxury-app-grid" />
        <div className="luxury-app-noise" />
        <div className="luxury-app-vignette" />
      </div>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="relative z-10 min-w-0 flex-1 md:ml-72">
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

        <main className={`luxury-content w-full ${activeTab === 'home' ? 'px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4' : 'px-4 py-7 sm:px-6 md:px-8 md:py-12 lg:px-12'}`}>
          {activeTab === 'home' ? (
            renderContent()
          ) : (
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
