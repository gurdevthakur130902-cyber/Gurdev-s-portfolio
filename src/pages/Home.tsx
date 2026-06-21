import { useState, useRef, MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';

interface Metric { value: string; label: string; }
interface CaseStudy {
  id: number; tag: string; title: string; subtitle: string;
  metrics: Metric[]; pdfLink: string; context: string;
  bullets: string[]; challenges: { title: string; desc: string }[]; learnings: string[];
}
interface HomeProps {
  caseStudies: CaseStudy[];
  setSelectedCaseStudy: (study: CaseStudy) => void;
  setCursorHovered: (hovered: boolean) => void;
  setCursorViewText: (text: string) => void;
}

// ── Reusable fade-up variant ─────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { type: 'spring', stiffness: 90, damping: 20 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};



export default function Home({ caseStudies, setSelectedCaseStudy, setCursorHovered, setCursorViewText }: HomeProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const workRef = useRef<HTMLElement>(null);
  const workInView = useInView(workRef, { once: true, margin: '-60px' });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ rotateX: (y / (rect.height / 2)) * -10, rotateY: (x / (rect.width / 2)) * 10 });
  };

  return (
    <div className="space-y-32">

      {/* ── HERO ──────────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row justify-between items-center gap-14 pt-10"
      >
        {/* Copy */}
        <motion.div variants={stagger} className="flex-grow order-2 md:order-1 max-w-2xl">
          <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-5">
            Talent Acquisition &amp; Compliance Portfolio
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-[3.25rem] font-black tracking-tight text-black mb-6 leading-[1.08]"
          >
            Building systematic infrastructure to scale people operations.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-500 text-base md:text-lg font-light leading-relaxed mb-9 max-w-xl">
            Human Resource Management graduate from Delhi University with hands-on corporate experience scaling structured hiring funnels, managing candidate lifecycles, and driving pan-India statutory compliance.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.linkedin.com/in/gurdevthakur2430/"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-bold text-black hover:text-blue-600 transition-colors duration-200 hover-underline"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              LinkedIn Profile ↗
            </a>
            <span className="text-gray-200">|</span>
            <a
              href="/Gurdev_Resume.pdf"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-bold text-black hover:text-blue-600 transition-colors duration-200 hover-underline"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              View PDF Resume ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Profile card */}
        <motion.div
          variants={fadeUp}
          className="w-64 h-64 md:w-76 md:h-76 order-1 md:order-2 flex-shrink-0 relative group perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
        >
          {/* Decorative bg layers */}
          <div className="absolute inset-0 bg-blue-100/60 rounded-3xl rotate-6 scale-95 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-100" />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl -rotate-3 transition-transform duration-700 group-hover:-rotate-6 border border-white/50 shadow-xl" />

          <motion.div
            className="relative w-full h-full rounded-3xl overflow-hidden border border-gray-200/70 shadow-lg"
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <img
              src="/gurdev-headshot.png"
              alt="Gurdev Thakur"
              className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── NARRATIVE BLOCKS ─────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        variants={stagger}
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-gray-150 py-16"
      >
        {/* Block 1 */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(37,99,235,0.06)' }}
          className="bg-white border border-gray-150 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-4">
              01 · TALENT ENGAGEMENT
            </span>
            <h3 className="text-base md:text-lg font-black text-black leading-snug">
              From a dead campus platform to a hiring engine for 70+ companies.
            </h3>
            <p className="text-sm font-light text-gray-500 leading-relaxed mt-4">
              InternVillage had gone silent, no traction, no employer pipeline. I rebuilt its outreach and sourcing from zero, and it became a functional talent channel connecting 1,000+ students to real opportunities.
            </p>
          </div>
        </motion.div>

        {/* Block 2 */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(37,99,235,0.06)' }}
          className="bg-white border border-gray-150 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-4">
              02 · REGULATORY COMPLIANCE
            </span>
            <h3 className="text-base md:text-lg font-black text-black leading-snug">
              90+ legal filings, 5 states, one deadline that didn't move.
            </h3>
            <p className="text-sm font-light text-gray-500 leading-relaxed mt-4">
              When Prozo's warehouse network had compliance gaps across multiple states, I owned the entire filing process across six internal teams, five different government portals, with zero legal background going in.
            </p>
          </div>
        </motion.div>

        {/* Block 3 */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(37,99,235,0.06)' }}
          className="bg-white border border-gray-150 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-4">
              03 · GROWTH &amp; DISTRIBUTION
            </span>
            <h3 className="text-base md:text-lg font-black text-black leading-snug">
              Built a media business before I built a resume.
            </h3>
            <p className="text-sm font-light text-gray-500 leading-relaxed mt-4">
              EvolveSphere started as a sports content page. It became a 10L+ revenue operation I ran solo, sourcing freelancers, negotiating brand deals, and learning what ownership actually means before anyone gave me a job title for it.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* ── SELECTED WORK ─────────────────────────────── */}
      <motion.section
        ref={workRef}
        id="work"
        initial="hidden"
        animate={workInView ? 'show' : 'hidden'}
        variants={stagger}
        className="pt-4"
      >
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black">
            Selected Work &amp; Proof of Execution
          </h2>
        </motion.div>

        <div className="flex flex-col border-t border-gray-100">
          {caseStudies.map((study, idx) => (
            <motion.button
              key={study.id}
              variants={fadeUp}
              onClick={() => setSelectedCaseStudy(study)}
              onMouseEnter={() => { setCursorHovered(true); setCursorViewText('Open'); }}
              onMouseLeave={() => { setCursorHovered(false); setCursorViewText(''); }}
              whileHover={{ x: 8, backgroundColor: 'rgba(239,246,255,0.6)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="py-7 px-4 block w-full text-left group outline-none border-b border-gray-100 rounded-xl -mx-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1 block">
                    {['Prozo Logistics', 'InternVillage', 'EvolveSphere'][idx]} — {study.tag}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-black group-hover:text-blue-600 transition-colors duration-200">
                    {study.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  {study.metrics.slice(0, 2).map((m, mi) => (
                    <span key={mi} className="text-xs font-mono bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                      {m.value} {m.label.split(' ')[0]}
                    </span>
                  ))}
                  <motion.span
                    className="text-base font-bold text-gray-400 group-hover:text-blue-600 ml-1"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >→</motion.span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
