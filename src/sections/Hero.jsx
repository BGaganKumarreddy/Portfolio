import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import heroImg from '../assets/hero.png';
import { useTypewriter } from '../hooks/useTypewriter';

export default function Hero() {
  const role = useTypewriter(['Full-Stack Developer', 'DSA Enthusiast', 'Software Engineer'], 90, 55, 1800);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center z-10 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* subtle dot particles in bg */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-10 md:px-20 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        
        {/* LEFT TEXT */}
        <div className="flex-1 z-10 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-5"
          >
            Gagan Kumar<br />Reddy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-2xl md:text-3xl font-bold" style={{ color: '#2563eb' }}>
              {role}
            </span>
            <span
              className="inline-block w-0.5 h-8 animate-pulse"
              style={{ background: '#2563eb' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-md"
          >
            A passionate Software Engineering student crafting scalable, visually stunning web applications and solving complex algorithmic challenges.
          </motion.p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white rounded-sm transition-all"
            style={{
              background: '#2563eb',
              boxShadow: '0 4px 20px rgba(37,99,235,0.45)'
            }}
          >
            <Briefcase size={20} />
            Hire Me
          </motion.a>
        </div>

        {/* RIGHT — animated stack graphic */}
        <motion.div
          className="flex-1 flex justify-end items-center h-full pointer-events-none relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Pulsing glow ring behind the image */}
          <motion.div
            className="absolute right-8 rounded-full"
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.15, 0.28, 0.15],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 320,
              height: 320,
              background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Floating image */}
          <motion.img
            src={heroImg}
            alt="Gagan Kumar Reddy"
            className="w-auto max-h-[82vh] object-contain object-bottom relative z-10"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(37,99,235,0.25)) drop-shadow(0 0 80px rgba(37,99,235,0.1))',
              maskImage: 'linear-gradient(to top, transparent 0%, black 18%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 18%)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}



