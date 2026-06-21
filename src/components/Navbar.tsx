import { useState, useEffect, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activePage: 'home' | 'about';
  setActivePage: (page: 'home' | 'about') => void;
  setCursorHovered: (hovered: boolean) => void;
  setContactOpen: (open: boolean) => void;
}

export default function Navbar({ activePage, setActivePage, setCursorHovered, setContactOpen }: NavbarProps) {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrunk(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`nav-capsule rounded-2xl flex justify-between items-center w-full pointer-events-auto transition-colors duration-300 ${
          shrunk 
            ? 'py-2.5 px-5 max-w-2xl bg-white/90 border border-gray-200/50 shadow-md backdrop-blur-md' 
            : 'py-4 px-8 max-w-3xl bg-white/75 border border-gray-100 backdrop-blur-sm shadow-sm'
        }`}
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <button
          onClick={() => setActivePage('home')}
          className="font-extrabold tracking-tight text-sm text-black flex items-center gap-2 logo-link outline-none"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
        >
          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
          GURDEV THAKUR
        </button>

        <nav className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 relative">
          <button
            onClick={() => {
              setActivePage('home');
              setTimeout(() => {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors relative outline-none ${
              activePage === 'home' ? 'text-black font-extrabold' : 'hover:text-black'
            }`}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            {activePage === 'home' && (
              <motion.span
                layoutId="activeNavBackground"
                className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Work
          </button>

          <button
            onClick={() => setActivePage('about')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative outline-none ${
              activePage === 'about' ? 'text-black font-extrabold' : 'hover:text-black'
            }`}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onMouseEnter={() => setCursorHovered(true)}
          >
            {activePage === 'about' && (
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

        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          HR OPS
        </div>
      </motion.header>
    </div>
  );
}
