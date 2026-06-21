import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Phone, Linkedin, X, ChevronRight } from 'lucide-react';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import CaseStudyModal from './components/CaseStudyModal';
import Home from './pages/Home';
import About from './pages/About';

// --- DATA DEFINITIONS ---
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

interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  pdfLink?: string;
  pdfLabel?: string;
}

interface Responsibility {
  organization: string;
  role: string;
  period: string;
  bullets: string[];
  pdfLink?: string;
  pdfLabel?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    tag: "Compliance Operations",
    title: "Pan-India Warehouse Compliance Execution",
    subtitle: "Shop and Establishment Registrations, CLRA Principal Employer Registrations, and Contract Labour Licences across 36+ Warehouses and Offices in 5 States",
    metrics: [
      { value: "36+", label: "Hubs & Offices" },
      { value: "5", label: "States Covered" },
      { value: "90+", label: "Licences Filed" },
      { value: "~80", label: "Approvals Received" }
    ],
    pdfLink: "/prozo_compliance.pdf",
    context: "Prozo is a tech-enabled, full-stack logistics company operating a distributed warehouse network across India. Every facility - including warehouses and corporate offices - is required to hold valid Shop and Establishment (S&E) registrations, CLRA Principal Employer Registrations, and Contract Labour licences. The compliance gap spanned 36+ warehouses and corporate offices across 5 states: Maharashtra, Haryana, Uttar Pradesh, Telangana, and Karnataka.",
    bullets: [
      "Government Portal Research: Studied and navigated state portals including Aaple Sarkar (MH), eKarmika (KA), Nivesh Mitra (UP), Telangana Labour Dept, and Shram Suvidha (Haryana & central).",
      "Regulatory Mapping: Built a state-wise compliance matrix documenting applicable Acts, headcount thresholds, fee schedules, and contacts.",
      "Data Collection & Processing: Coordinated GST documents, rent deeds, worker counts, digital signatures, and warehouse imagery across teams.",
      "Filing & Approvals: Resolved portal file limits by building document compression pipelines and completed 90+ registrations sequentially."
    ],
    challenges: [
      {
        title: "C1: Government Portal Instability & File Limits",
        desc: "Developed a custom document compression workflow that targeted resolution on non-critical pages while locking high quality on signature/stamp sections, satisfying AI-gated readability."
      },
      {
        title: "C2: AI-Gated Portal Verification & Geo-Tagging",
        desc: "Researched and integrated manual geo-tagging methods to embed GPS metadata directly into warehouse facility media assets, preventing automated portal rejection cooldown cycles."
      }
    ],
    learnings: [
      "Process before execution: Front-loaded research and state mapping dramatically minimized backend portal errors.",
      "Technical compliance: Mastering document workflows, metadata, and geo-tagging is crucial for digital compliance.",
      "Accuracy over speed: Slowing down to verify document legibility avoided costly cooldown penalties and regulatory exposure."
    ]
  },
  {
    id: 2,
    tag: "Talent Acquisition",
    title: "InternVillage : Talent Ecosystem Reconstruction",
    subtitle: "Rebooting an Inactive Undergraduate Talent platform at Delhi University",
    metrics: [
      { value: "70+", label: "Corporate Partners" },
      { value: "1,000+", label: "Student Members" },
      { value: "95%", label: "Fair Turnout" },
      { value: "4.8/5", label: "Employer Rating" }
    ],
    pdfLink: "/internvillage.pdf",
    context: "InternVillage was a DU-focused undergraduate talent platform that had gone completely inactive—handles were paused, recruiter outreach was stagnant, and student pipelines were disconnected. Our mission was to rebuild and revive the ecosystem from silence, providing students with structured internship channels and connections to top-tier recruiters.",
    bullets: [
      "Outreach Engine: Constructed a cold outreach channel contacting corporate hiring managers directly with customized student profile decks.",
      "Curated Listings: Replaced random listings with vetted, DU-friendly internship roles (remote, hybrid, startup roles).",
      "Community Channels: Structured dedicated Instagram and WhatsApp channels to feed real-time curated notifications to candidates.",
      "Internship Fair: Organized flagship event connecting 1,000+ registered students with 70+ participating employers."
    ],
    challenges: [
      {
        title: "C1: Student Engagement Drop",
        desc: "Addressed long-term platform inactivity by shifting marketing content towards direct value propositions like salary metrics and remote availability."
      },
      {
        title: "C2: Sourcing Pipeline Coordination",
        desc: "Structured real-time sheets for candidate tracking and interview status updates, which increased employer satisfaction rating to 4.8/5."
      }
    ],
    learnings: [
      "Student-First Placement Empathy: Students do not need elaborate websites; they need accountability and to feel certain that their profile is being viewed by a real recruiter.",
      "Curation Wins Over Volume: Maintaining structured listings with clear metadata significantly increased student response and interview-to-selection rates."
    ]
  },
  {
    id: 3,
    tag: "Growth & Funnel Ops",
    title: "EvolveSphere : Traffic & Funnel Operations",
    subtitle: "Building an Independent Community Distribution & Monetization Network",
    metrics: [
      { value: "500K+", label: "Organic Reach" },
      { value: "INR 10L+", label: "Revenue Generated" },
      { value: "300+", label: "Videos Produced" },
      { value: "5K+", label: "Loyal Subscribers" }
    ],
    pdfLink: "/evolvesphere.pdf",
    context: "EvolveSphere was built out of curiosity: Can content, made fast and right, build more trust than traditional big media? I launched a multi-platform content engine focused on football fanwear and tactical updates. The goal was to build a highly targeted, conversion-ready audience, and monetize it through direct brand deals and traffic partnerships without heavy infrastructure overhead.",
    bullets: [
      "Community Distribution: Built Telegram & WhatsApp distribution pipelines delivering real-time kit deals, football transfers, and score alerts directly to fans.",
      "B2B Placements: Partnered with score tracking platforms and sports merchants, selling direct placements based on engagement data, leading to stable recurring brand retainers.",
      "System Optimization: Deployed automated bots for news formatting, scheduling, and analytics tracking."
    ],
    challenges: [
      {
        title: "C1: Algorithm Volatility",
        desc: "Navigated platform feed updates by multiplying channels and cross-promoting community groups to shield core subscriber counts."
      },
      {
        title: "C2: Operations Overhead",
        desc: "Delegated and streamlined video templates to scale production to 300+ videos with zero fixed infrastructure expense."
      }
    ],
    learnings: [
      "Audience ownership beats renting: Direct community channels (Telegram/WhatsApp) yield much higher CTR than public search algorithms.",
      "Agility in content: Speed of publishing during live games was the single biggest driver of viral viewer spikes."
    ]
  }
];

const jobs: Job[] = [
  {
    company: "Clinikally (YC S22)",
    role: "People and Culture Intern",
    location: "Delhi, India",
    period: "Apr 2026 – Present",
    bullets: [
      "Drove end-to-end hiring for 3+ critical roles (QA Engineer, Associate Product Manager, DevOps), sourcing 400+ candidates via YC founder network, LinkedIn, and Naukri along with IIT placement cells, conducting 100+ structured screenings, and managing multi-stage pipelines; closed QA role within 7-day turnaround while accelerating parallel mandates to 2–3 week closures.",
      "Supported the design and rollout of a Performance Management System (PMS) for 100+ employees, contributing to goal-setting frameworks, appraisal workflows, and evaluation criteria through 15+ stakeholder discussions; assisted in coordinating appraisal cycles across 10+ teams and enabling manager alignment.",
      "Supported people operations for 200+ employees via Zoho HRMS, assisting in payroll input validation (attendance, leave, reimbursements) and maintaining structured HR data systems; contributed to a post-appraisal L&OD program for 60+ employees, mapping skill gaps to role-based learning pathways."
    ]
  },
  {
    company: "Prozo",
    role: "HR and Compliance Intern",
    location: "Gurugram, India",
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Executed data-driven end-to-end hiring for 7+ roles (HR Executive, Program Manager, D2C Analyst, Key Account Manager), sourcing 320+ profiles, running 160+ screenings, and tracking 5-stage ATS hiring funnels.",
      "Led analytical campus hiring across 5 Tier-1 institutes (IIM Kashipur, IIM Rohtak, MDI, IIT Delhi, IIT Kharagpur), managing 75+ candidates, coordinating 45+ interview panels, and tracking offer-to-joining conversion metrics.",
      "Owned compliance execution for 50+ pan-India warehouses, filing 55+ Shop & Establishment and CL/CLR registrations, maintaining approval TAT trackers, and ensuring audit-ready statutory documentation."
    ],
    pdfLink: "/prozo_compliance.pdf",
    pdfLabel: "View Compliance Case Study ↗"
  },
  {
    company: "Ferns N Petals (FNP)",
    role: "Marketplace Operations Intern",
    location: "Gurugram, India",
    period: "Jul 2025 – Aug 2025",
    bullets: [
      "Program-managed marketplace operations for 200+ SKUs across Amazon, Flipkart, Tata Cliq, and Myntra, maintaining pricing accuracy, catalog hygiene, and platform compliance through structured audits and performance tracking.",
      "Directed data-driven hyperlocal fulfillment for 50–70 daily orders by monitoring inventory levels, dispatch SLAs, and last-mile workflows, sustaining a 98% on-time delivery rate.",
      "Standardized analytical QC for 100+ SKUs (images, descriptions, A+ content), reducing listing errors by 20% and improving approval velocity through compliance-led content frameworks."
    ]
  },
  {
    company: "EvolveSphere",
    role: "Founder & Growth Strategist",
    location: "Delhi, India",
    period: "Jul 2022 – Jan 2025",
    bullets: [
      "Produced YouTube, Instagram, and sports content achieving 500K+ views and 5K+ subscribers in under 12 months through strategic content optimization.",
      "Generated INR 10,00,000+ revenue via brand deals, affiliate partnerships, and monetized digital content strategies.",
      "Leveraged viewer insights to optimize scripts, thumbnails, and upload timing for maximum engagement and ROI performance."
    ],
    pdfLink: "/evolvesphere.pdf",
    pdfLabel: "View EvolveSphere Case Study ↗"
  }
];

const responsibilities: Responsibility[] = [
  {
    organization: "Corporate Relations, E-Cell & Marketing Society | CVS, Delhi University",
    role: "Core Member",
    period: "Sep 2023 – Dec 2024",
    bullets: [
      "Acquired 10+ sponsorships and increased funding by 25% through strategic negotiation, outreach, and value alignment.",
      "Directed logistics for 5 major events, improving execution efficiency and participant satisfaction by 30%.",
      "Built long-term stakeholder partnerships, securing multi-event collaborations and sustained brand presence.",
      "Utilized outreach data and sponsor profiling to enhance targeting strategy, boosting response rate by 20%."
    ]
  },
  {
    organization: "Growth & Outreach Lead | InternVillage",
    role: "Lead Strategist",
    period: "Sep 2023 – Dec 2024",
    bullets: [
      "Created 15+ reels and marketing content to build a 1,000+ member community across Instagram and WhatsApp platforms.",
      "Organized internship fair with 1,000+ registrations, achieving 95% turnout and 4.8/5 employer satisfaction rating.",
      "Handled end-to-end outreach, logistics coordination, and student engagement, driving high-value recruiter-student connections."
    ],
    pdfLink: "/internvillage.pdf",
    pdfLabel: "View InternVillage Case Study ↗"
  }
];

const skillCategories = [
  {
    title: "Human Resources",
    skills: ["Talent Acquisition", "Stakeholder Management", "Campus Hiring Strategies", "Hiring Funnel Analytics", "Offer & Pipeline Tracking", "HR Documentation", "Compliance Operations"]
  },
  {
    title: "HR Operations",
    skills: ["Statutory Compliance (S&E, CL/CLR)", "Payroll Support", "Zoho HRMS", "Performance Management Systems", "Learning & Organizational Development", "Audit Readiness", "Workforce Planning"]
  },
  {
    title: "Core Skills",
    skills: ["Communication", "Negotiation", "Leadership", "Strategic Execution", "Project Management", "Data-Informed Decision Making", "Cross-Functional Coordination"]
  }
];

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about'>('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorViewText, setCursorViewText] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden select-none">
      {/* Floating Canvas */}
      <BackgroundCanvas />

      {/* Custom Cursor */}
      <CustomCursor cursorHovered={cursorHovered} cursorViewText={cursorViewText} />

      {/* Floating Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} setCursorHovered={setCursorHovered} setContactOpen={setContactOpen} />

      {/* Page Content Holder */}
      <div className="max-w-5xl mx-auto px-6 pt-36 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Home
                caseStudies={caseStudies}
                setSelectedCaseStudy={setSelectedCaseStudy}
                setCursorHovered={setCursorHovered}
                setCursorViewText={setCursorViewText}
              />
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <About
                jobs={jobs}
                responsibilities={responsibilities}
                skillCategories={skillCategories}
                setCursorHovered={setCursorHovered}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200/80 bg-white/70 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-light">&copy; 2026 Gurdev Thakur. All rights reserved.</p>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500">
            <a
              href="https://www.linkedin.com/in/gurdevthakur2430/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-200"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              LinkedIn
            </a>
            <a
              href="mailto:gurdevthakur1312@gmail.com"
              className="hover:text-black transition-colors duration-200"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              Email
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 font-normal normal-case">Gurdev's Portfolio</span>
          </div>
        </div>
      </footer>

      {/* Case Study Detailed Drawer Modal */}
      <CaseStudyModal
        selectedCaseStudy={selectedCaseStudy}
        setSelectedCaseStudy={setSelectedCaseStudy}
        setCursorHovered={setCursorHovered}
      />

      {/* Contact Modal Overlay */}
      <AnimatePresence>
        {contactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 z-10 text-black flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold tracking-tight">Let's Connect</h3>
                <button
                  onClick={() => setContactOpen(false)}
                  className="text-gray-400 hover:text-black transition-colors outline-none"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                Feel free to reach out to discuss recruitment operations, statutory compliance projects, or potential team roles.
              </p>

              {/* Actions list */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:gurdevthakur1312@gmail.com"
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-150 rounded-2xl transition-all duration-200 group"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-250">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address</span>
                      <span className="text-sm font-semibold text-gray-700">gurdevthakur1312@gmail.com</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/gurdevthakur2430/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-150 rounded-2xl transition-all duration-200 group"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-250">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">LinkedIn Profile</span>
                      <span className="text-sm font-semibold text-gray-700">gurdevthakur2430</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Phone */}
                <a
                  href="tel:+919667916497"
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-150 rounded-2xl transition-all duration-200 group"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-250">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone Number</span>
                      <span className="text-sm font-semibold text-gray-700">+91 9667916497</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
