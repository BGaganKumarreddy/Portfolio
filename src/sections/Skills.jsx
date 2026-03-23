import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    label: 'Languages',
    icon: '⌨️',
    skills: ['C++', 'JavaScript', 'Java', 'PHP', 'TypeScript'],
  },
  {
    label: 'Frontend',
    icon: '🎨',
    skills: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion'],
  },
  {
    label: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'PHP'],
  },
  {
    label: 'Databases',
    icon: '🗄️',
    skills: ['MongoDB', 'MySQL', 'Mongoose', 'Prisma'],
  },
  {
    label: 'Tools & CS',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'DSA', 'OOP', 'Algorithms', 'Linux'],
  },
  {
    label: 'Soft Skills',
    icon: '🤝',
    skills: ['Problem Solving', 'Team Work', 'Adaptability', 'Communication'],
  },
];

const BARS = [
  { name: 'C++ / DSA', level: 90 },
  { name: 'React & Tailwind', level: 88 },
  { name: 'Node.js / Express', level: 83 },
  { name: 'MongoDB / MySQL', level: 85 },
  { name: 'JavaScript / TS', level: 87 },
  { name: 'Java & PHP', level: 75 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#2563eb' }}>What I Know</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Tech Stack</h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full" style={{ background: '#2563eb' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-8">Proficiency</h3>
            <div className="space-y-6">
              {BARS.map(({ name, level }, i) => (
                <div key={name}>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-300">{name}</span>
                    <span style={{ color: '#2563eb' }}>{level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(to right, #2563eb, #60a5fa)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category tags */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-8">Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.map(({ label, icon, skills }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass-card p-5 rounded-xl group cursor-default"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-bold text-white uppercase tracking-wider">{label}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map(s => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full font-medium text-gray-300 border border-white/5 group-hover:border-blue-500/20 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


