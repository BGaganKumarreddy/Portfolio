import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';


const STATS = [
  { value: '200+', label: 'Problems Solved' },
  { value: '3+', label: 'Projects Built' },
  { value: '7+', label: 'Tech Stacks' },
  { value: 'B.Tech', label: 'CSE Student' },
];

const INFO = [
  { label: 'Name', value: 'B. Gagan Kumar Reddy' },
  { label: 'Email', value: 'gagankumarreddy.b@gmail.com' },
  { label: 'Location', value: 'Punjab, India' },
  { label: 'University', value: 'Lovely Professional University' },
  { label: 'Degree', value: 'B.Tech — CSE (2022–2026)' },
  { label: 'Status', value: 'Open to Opportunities' },
];

const fade = dir => ({
  hidden: { opacity: 0, x: dir === 'left' ? -50 : 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
});

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: '#080808' }}>
      {/* accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #2563eb, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#2563eb' }}>Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">About Me</h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full" style={{ background: '#2563eb' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            variants={fade('left')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div
                className="absolute -inset-3 rounded-2xl opacity-30 blur-xl"
                style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }}
              />
              <div className="glass-card relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={profileImg} alt="Gagan Kumar Reddy" className="w-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
              </div>
              {/* Experience badge */}
              <div
                className="absolute -bottom-5 -right-5 px-5 py-3 rounded-xl text-center shadow-xl"
                style={{ background: '#2563eb' }}
              >
                <p className="text-2xl font-black text-white">4+</p>
                <p className="text-xs text-white/80 font-semibold uppercase tracking-wider">Years Coding</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fade('right')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-5">
              Full-Stack Developer &amp; <span style={{ color: '#2563eb' }}>Problem Solver</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              I'm Brahmadevuni Gagan Kumar Reddy — a Computer Science Engineering student at Lovely Professional University, 
              passionate about crafting scalable web applications and solving complex algorithmic challenges. I thrive at the 
              intersection of clean design and solid engineering.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {INFO.map(({ label, value }) => (
                <div key={label} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#2563eb' }} />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>
                    <p className="text-sm text-gray-200 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="glass-card grid grid-cols-4 gap-4 mb-10 p-5 rounded-xl">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                try {
                  const res = await fetch('/gagan-cv.pdf');
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Gagan_Kumar_Reddy_CV.pdf';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                } catch {
                  window.open('/gagan-cv.pdf', '_blank');
                }
              }}
              className="inline-flex items-center gap-3 px-7 py-3.5 font-bold text-white rounded transition-all duration-200 text-sm hover:opacity-90 active:scale-95 cursor-pointer"
              style={{ background: '#2563eb', boxShadow: '0 4px 20px rgba(37,99,235,0.35)' }}
            >
              ↓ Download Resume
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


