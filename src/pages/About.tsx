import { motion, useInView } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { useRef } from 'react';

interface Job { company: string; role: string; location: string; period: string; bullets: string[]; pdfLink?: string; pdfLabel?: string; }
interface Responsibility { organization: string; role: string; period: string; bullets: string[]; pdfLink?: string; pdfLabel?: string; }
interface SkillCategory { title: string; skills: string[]; }
interface AboutProps {
  jobs: Job[];
  responsibilities: Responsibility[];
  skillCategories: SkillCategory[];
  setCursorHovered: (hovered: boolean) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 20 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function TimelineItem({ icon: Icon, role, company, period, bullets, pdfLink, pdfLabel, setCursorHovered }: {
  icon: typeof Briefcase; role: string; company: string; period: string;
  bullets: string[]; pdfLink?: string; pdfLabel?: string;
  setCursorHovered: (h: boolean) => void;
}) {
  return (
    <motion.div variants={fadeUp} className="relative group">
      <div className="absolute -left-[43px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-sm z-10 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-600 group-hover:shadow-blue-100 group-hover:shadow-md">
        <Icon className="w-3 h-3 text-blue-500" />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
        <div>
          <h3 className="text-base md:text-lg font-black text-black leading-snug">{role}</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-blue-600 font-semibold mt-0.5">
            <span>{company}</span>
          </div>
        </div>
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap mt-0.5 sm:mt-0 self-start">
          {period}
        </span>
      </div>

      <ul className="space-y-2 text-sm text-gray-600 font-light list-disc pl-5 marker:text-blue-400 leading-relaxed mb-4">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>

      {pdfLink && (
        <a
          href={pdfLink} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors hover-underline"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
        >
          {pdfLabel}
        </a>
      )}
    </motion.div>
  );
}

export default function About({ jobs, responsibilities, skillCategories, setCursorHovered }: AboutProps) {
  return (
    <div className="space-y-24 select-text">

      {/* SUMMARY */}
      <Section className="pt-8">
        <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-5">
          Professional Summary
        </motion.span>
        <div className="max-w-3xl space-y-5">
          <motion.p variants={fadeUp} className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
            HR and Talent Acquisition professional with experience across end-to-end recruitment, campus hiring, and statutory compliance within multi-location operations. Skilled in managing structured hiring funnels, candidate lifecycle tracking, interview coordination, offer conversion monitoring, and compliance documentation.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
            Exposure to workforce planning support, approval tracking systems, and audit readiness processes across distributed warehouse networks. Brings business exposure from scaling digital platforms to{' '}
            <strong className="text-black font-semibold">500K+ reach</strong>, enabling alignment of people operations with growth priorities.
          </motion.p>
        </div>
      </Section>

      {/* EDUCATION */}
      <Section>
        <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-6">
          Education
        </motion.span>
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -3 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img className="w-7 h-7 object-contain" src="https://www.google.com/s2/favicons?domain=du.ac.in&sz=128" alt="DU" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-black leading-snug">College of Vocational Studies, Delhi University</h3>
              <span className="text-sm font-light text-gray-500 mt-0.5 block">BA (Vocational Studies) — Human Resource Management</span>
            </div>
          </div>
          <div className="md:text-right flex-shrink-0">
            <span className="text-sm font-bold text-black block">2023 – 2026</span>
            <span className="text-xs text-gray-400 block mt-0.5">New Delhi, India</span>
          </div>
        </motion.div>
      </Section>

      {/* EXPERIENCE */}
      <Section>
        <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-10">
          Professional Experience
        </motion.span>
        <div className="relative ml-4 pl-8 sm:pl-10 space-y-12">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="absolute left-0 top-2 w-[2px] bg-gradient-to-b from-blue-400 via-blue-200 to-transparent origin-top"
            style={{ height: '100%' }}
          />
          {jobs.map((j, i) => (
            <TimelineItem key={i} icon={Briefcase} role={j.role} company={`${j.company} · ${j.location}`} period={j.period} bullets={j.bullets} pdfLink={j.pdfLink} pdfLabel={j.pdfLabel} setCursorHovered={setCursorHovered} />
          ))}
        </div>
      </Section>

      {/* POSITIONS OF RESPONSIBILITY */}
      <Section>
        <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-10">
          Positions of Responsibility
        </motion.span>
        <div className="relative ml-4 pl-8 sm:pl-10 space-y-12">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="absolute left-0 top-2 w-[2px] bg-gradient-to-b from-blue-400 via-blue-200 to-transparent origin-top"
            style={{ height: '100%' }}
          />
          {responsibilities.map((r, i) => (
            <TimelineItem key={i} icon={Award} role={r.role} company={r.organization} period={r.period} bullets={r.bullets} pdfLink={r.pdfLink} pdfLabel={r.pdfLabel} setCursorHovered={setCursorHovered} />
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section>
        <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-8">
          Skills Directory
        </motion.span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(37,99,235,0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-4 pb-2 border-b border-gray-100">
                {cat.title}
              </h3>
              <motion.div variants={stagger} className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    variants={fadeUp}
                    whileHover={{ scale: 1.06, borderColor: '#3b82f6', color: '#2563eb' }}
                    className="text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 font-medium cursor-default transition-colors duration-150"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
