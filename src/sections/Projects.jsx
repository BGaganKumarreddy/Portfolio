import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: 'Stock Mate',
    category: 'Full Stack',
    description: 'A smart Inventory Management System with real-time dashboards, JWT-based authentication, full CRUD REST APIs, and role-based access control. Built for production with MongoDB and React.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'JWT'],
    link: 'https://github.com/BGaganKumarreddy',
    github: 'https://github.com/BGaganKumarreddy',
    featured: true,
    gradient: 'from-pink-600/20 to-rose-600/5',
  },
  {
    id: 2,
    title: 'Agri Insight',
    category: 'Web App',
    description: 'A Smart Crop Recommendation System that analyzes soil and climate datasets to recommend optimal crops using environment-driven logic and data processing with PHP and MySQL.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    link: 'https://github.com/BGaganKumarreddy',
    github: 'https://github.com/BGaganKumarreddy',
    featured: false,
    gradient: 'from-emerald-600/10 to-cyan-600/5',
  },
  {
    id: 3,
    title: 'DSA Mastery',
    category: 'Problem Solving',
    description: 'Solved 200+ algorithmic challenges across arrays, sorting, searching, trees, graphs, and dynamic programming in optimized C++. Includes time/space complexity analysis for each solution.',
    tech: ['C++', 'Data Structures', 'Algorithms', 'OOP'],
    link: 'https://github.com/BGaganKumarreddy',
    github: 'https://github.com/BGaganKumarreddy',
    featured: false,
    gradient: 'from-violet-600/10 to-blue-600/5',
  },
];

const FILTERS = ['All', 'Full Stack', 'Web App', 'Problem Solving'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const visible = PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="projects" className="py-28" style={{ background: '#080808' }}>
      <div className="absolute left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #2563eb, transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#2563eb' }}>What I've Built</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Projects</h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full" style={{ background: '#2563eb' }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-200 ${
                filter === f
                  ? 'text-white border-transparent'
                  : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
              style={filter === f ? { background: '#2563eb', borderColor: '#2563eb' } : {}}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`glass-card group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,99,235,0.12)] ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Gradient top */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient.replace('/20', '').replace('/10', '').replace('/5', '')}`}
                  style={{ background: '#2563eb' }}
                />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">{project.category}</span>
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    </div>
                    {project.featured && (
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold border" style={{ color: '#2563eb', borderColor: '#2563eb', background: 'rgba(37,99,235,0.08)' }}>
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 leading-relaxed text-sm mb-6">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full text-gray-400 border border-white/5"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 text-sm font-bold text-white rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90"
                      style={{ background: '#2563eb' }}
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}


