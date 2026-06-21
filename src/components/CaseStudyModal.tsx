import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  metrics: Metric[];
  pdfLink: string;
  context: string;
  bullets: string[];
  challenges: { title: string; desc: string }[];
  learnings: string[];
}

interface CaseStudyModalProps {
  selectedCaseStudy: CaseStudy | null;
  setSelectedCaseStudy: (study: CaseStudy | null) => void;
  setCursorHovered: (hovered: boolean) => void;
}

export default function CaseStudyModal({ selectedCaseStudy, setSelectedCaseStudy, setCursorHovered }: CaseStudyModalProps) {
  const contentVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const itemFade = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
  };

  return (
    <AnimatePresence>
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedCaseStudy(null)}
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-[3px]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            className="relative w-full max-w-4xl bg-[#F8F9FA] h-full shadow-2xl flex flex-col z-10 overflow-hidden select-text"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 md:px-12 flex justify-between items-center z-20">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                  {selectedCaseStudy.tag}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href={selectedCaseStudy.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  Open Original PDF ↗
                </a>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="text-sm font-bold text-black hover:text-blue-600 flex items-center gap-1 transition-colors outline-none"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto px-6 py-12 md:px-16 md:py-16 text-black select-text"
            >
              <motion.div variants={itemFade} className="mb-10">
                <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black mb-3">{selectedCaseStudy.title}</h3>
                <p className="text-gray-500 font-light text-sm md:text-base max-w-2xl leading-relaxed">{selectedCaseStudy.subtitle}</p>
              </motion.div>

              {/* Metrics */}
              <motion.div variants={itemFade} className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-gray-100 py-8 mb-10">
                {selectedCaseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="border-l-2 border-blue-500 pl-4 md:pl-6">
                    <div className="text-2xl md:text-4xl font-extrabold text-black">{m.value}</div>
                    <div className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={contentVariants} className="space-y-10 max-w-3xl">
                {/* Context */}
                <motion.div variants={itemFade}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Context &amp; Problem Statement</h4>
                  <p className="text-gray-600 leading-relaxed font-light text-base">{selectedCaseStudy.context}</p>
                </motion.div>

                {/* Bullets */}
                <motion.div variants={itemFade}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Core Deliverables &amp; Execution</h4>
                  <ul className="space-y-3 text-gray-600 font-light text-sm list-disc pl-5 marker:text-blue-400">
                    {selectedCaseStudy.bullets.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                  </ul>
                </motion.div>

                {/* Challenges */}
                <motion.div variants={itemFade} className="bg-blue-50/60 border border-blue-100 rounded-3xl p-6 md:p-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">Key Challenges &amp; Resolutions</h4>
                  <div className="space-y-4">
                    {selectedCaseStudy.challenges.map((c, cIdx) => (
                      <div key={cIdx}>
                        <strong className="text-blue-900 block mb-1 text-sm">{c.title}</strong>
                        <p className="text-xs text-gray-600 leading-relaxed font-light">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Learnings */}
                <motion.div variants={itemFade}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Key Insights &amp; Learnings</h4>
                  <ul className="list-disc pl-5 text-gray-600 font-light space-y-2 text-sm marker:text-blue-400">
                    {selectedCaseStudy.learnings.map((l, lIdx) => <li key={lIdx}>{l}</li>)}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
