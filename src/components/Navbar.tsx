import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: 'home' | 'about';
  setActivePage: (page: 'home' | 'about') => void;
  setCursorHovered: (hovered: boolean) => void;
  setContactOpen: (open: boolean) => void;
}

export default function Navbar({ activePage, setActivePage, setCursorHovered, setContactOpen }: NavbarProps) {
  const [shrunk, setShrunk] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'work' | 'about'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    
    const handleScroll = () => {
      setShrunk(window.scrollY > 40);

      if (activePage === 'about') {
        setActiveTab('about');
        return;
      }

      const workEl = document.getElementById('work');
      if (workEl) {
        const rect = workEl.getBoundingClientRect();
        // If the top of the work section is past 35% of the viewport height, highlight Work
        const isWorkInView = rect.top <= window.innerHeight * 0.35;
        if (isWorkInView) {
          setActiveTab('work');
        } else {
          setActiveTab('home');
        }
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleMagneticMove = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMagneticLeave = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 flex justify-center pointer-events-none">
      <motion.header
        className={`nav-capsule rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center w-full pointer-events-auto transition-all duration-300 ${
          shrunk 
            ? 'py-2.5 px-5 max-w-2xl bg-white/90 border border-gray-200/50 shadow-md backdrop-blur-md' 
            : 'py-3.5 px-8 max-w-3xl bg-white/75 border border-gray-100 backdrop-blur-sm shadow-sm'
        }`}
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="flex justify-between items-center w-full md:w-auto">
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMenuOpen(false);
            }}
            className="font-extrabold tracking-tight text-sm text-black flex items-center gap-2 logo-link outline-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
            GURDEV THAKUR
          </button>

          {/* Hamburger Menu Icon for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden items-center justify-center p-1.5 text-black hover:text-blue-600 transition-colors outline-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 relative">
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveTab('home');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors relative outline-none ${
              activeTab === 'home' ? 'text-black font-extrabold' : 'hover:text-black'
            }`}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            {activeTab === 'home' && (
              <motion.span
                layoutId="activeNavBackground"
                className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Home
          </button>

          <button
            onClick={() => {
              setActivePage('home');
              setTimeout(() => {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
              setActiveTab('work');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors relative outline-none ${
              activeTab === 'work' ? 'text-black font-extrabold' : 'hover:text-black'
            }`}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            {activeTab === 'work' && (
              <motion.span
                layoutId="activeNavBackground"
                className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Work
          </button>

          <button
            onClick={() => {
              setActivePage('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveTab('about');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors relative outline-none ${
              activeTab === 'about' ? 'text-black font-extrabold' : 'hover:text-black'
            }`}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            {activeTab === 'about' && (
              <motion.span
                layoutId="activeNavBackground"
                className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            About
          </button>

          <a
            href="/Gurdev_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 hover:text-black transition-colors rounded-lg"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            Resume ↗
          </a>

          <button
            onClick={() => setContactOpen(true)}
            className="px-3 py-1.5 hover:text-black transition-colors rounded-lg outline-none"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex md:hidden flex-col gap-1 w-full mt-4 border-t border-gray-100 pt-4 text-xs font-bold uppercase tracking-wider text-gray-500 overflow-hidden"
            >
              <button
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveTab('home');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors outline-none ${
                  activeTab === 'home' ? 'text-black bg-gray-50 font-extrabold' : 'hover:text-black hover:bg-gray-50/50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  setActivePage('home');
                  setTimeout(() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                  setActiveTab('work');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors outline-none ${
                  activeTab === 'work' ? 'text-black bg-gray-50 font-extrabold' : 'hover:text-black hover:bg-gray-50/50'
                }`}
              >
                Work
              </button>

              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveTab('about');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors outline-none ${
                  activeTab === 'about' ? 'text-black bg-gray-50 font-extrabold' : 'hover:text-black hover:bg-gray-50/50'
                }`}
              >
                About
              </button>

              <a
                href="/Gurdev_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-3 py-2.5 hover:text-black hover:bg-gray-50/50 transition-colors rounded-lg block"
              >
                Resume ↗
              </a>

              <button
                onClick={() => {
                  setContactOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 hover:text-black hover:bg-gray-50/50 transition-colors rounded-lg outline-none"
              >
                Contact
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
