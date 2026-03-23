import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy — highlight active section
  useEffect(() => {
    const sections = NAV_ITEMS.map(id => document.getElementById(id.toLowerCase()));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1));
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5">
            <span className="text-xl font-black text-white tracking-tight">
              i<span style={{ color: '#2563eb' }}>Port</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {NAV_ITEMS.map((item, i) => (
              <div key={item} className="flex items-center">
                {i > 0 && <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.12)' }} />}
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`px-5 py-2 text-sm font-semibold tracking-wider uppercase transition-colors duration-200 relative group ${
                    active === item ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                  {/* active underline */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: '#2563eb',
                      width: active === item ? '60%' : '0%',
                    }}
                  />
                </a>
              </div>
            ))}
            <div className="ml-6">
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-bold text-white rounded transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ background: '#2563eb', boxShadow: '0 2px 12px rgba(37,99,235,0.35)' }}
              >
                Hire Me
              </a>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden"
            style={{
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="block px-8 py-4 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-white hover:pl-10 transition-all border-b border-white/5"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


