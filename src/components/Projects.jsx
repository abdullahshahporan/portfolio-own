import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../context/DataContext';

export default function Projects() {
  const { data } = usePortfolioData();
  const { projects } = data;
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const allTags = [...new Set(projects.flatMap((p) => p.tags))];
  const displayTags = ['all', ...allTags.slice(0, 7)];

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.tags.some((t) => t.toLowerCase() === filter.toLowerCase()));

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  const tagColors = [
    'bg-primary-500/15 text-primary-300 border-primary-500/20',
    'bg-[#E9C46A]/15 text-[#E9C46A] border-[#E9C46A]/20',
    'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    'bg-[#F4A261]/15 text-[#F4A261] border-[#F4A261]/20',
    'bg-[#E76F51]/15 text-[#E76F51] border-[#E76F51]/20',
    'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  ];

  return (
    <section id="projects" className="relative py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary-400 font-mono text-sm font-medium tracking-wider uppercase">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {displayTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => { setFilter(tag); setShowAll(false); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 ${
                filter === tag
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tag === 'all' ? 'All Projects' : tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="group relative bg-dark-100/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5"
              >
                {/* Project Image / Gradient */}
                <div className="h-48 relative overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${
                      ['from-[#264653]/30 to-[#2A9D8F]/30', 'from-[#2A9D8F]/30 to-[#E9C46A]/30', 'from-[#E9C46A]/30 to-[#F4A261]/30', 'from-[#F4A261]/30 to-[#E76F51]/30'][i % 4]
                    } flex items-center justify-center`}>
                      <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                        {['💻', '📱', '🌐', '⚙️', '🔬', '🎯'][i % 6]}
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-primary-500/90 text-xs font-semibold rounded-lg text-white shadow-lg">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${tagColors[tagIndex % tagColors.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                      >
                        <FaGithub size={14} /> Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 hover:bg-primary-600/30 hover:text-white transition-all duration-300"
                      >
                        <FaExternalLinkAlt size={12} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less */}
        {filtered.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-white/5 border border-white/10 hover:border-primary-500/30 hover:bg-white/10 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
            >
              {showAll ? 'Show Less' : `Show All (${filtered.length})`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
