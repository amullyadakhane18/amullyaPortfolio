import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiCode, HiCheck } from "react-icons/hi";
import { FiGithub } from "react-icons/fi";
import { useInView } from "../../hooks/useInView";
import { projects } from "../../assets/data/portfolioData";

const categories = ["All", "Enterprise", "AI/ML"];

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="gradient-border group relative overflow-hidden rounded-2xl flex flex-col"
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    {/* Top accent bar */}
    <div
      className="h-1 w-full"
      style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}80)` }}
    />

    {/* Card header */}
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: `${project.accentColor}15`,
            border: `1px solid ${project.accentColor}25`,
          }}
        >
          {project.icon}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: `${project.accentColor}15`,
              border: `1px solid ${project.accentColor}25`,
              color: project.accentColor,
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-indigo-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
    </div>

    {/* Features */}
    <div className="px-6 pb-4">
      <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-3">Features</p>
      <div className="grid grid-cols-2 gap-2">
        {project.features.map((f, i) => (
          <div key={i} className="flex items-start gap-2">
            <HiCheck size={12} className="mt-1 flex-shrink-0" style={{ color: project.accentColor }} />
            <span className="text-slate-400 text-xs leading-relaxed">{f}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Tech stack */}
    <div className="px-6 pb-4">
      <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-3">Tech Stack</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="tag text-xs">{t}</span>
        ))}
      </div>
    </div>

    {/* Footer links */}
    <div className="mt-auto px-6 py-4 border-t border-white/[0.05] flex items-center justify-between">
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
      >
        <FiGithub size={16} />
        Source
      </a>
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm font-medium transition-all"
        style={{ color: project.accentColor }}
      >
        Live Demo
        <HiExternalLink size={16} />
      </a>
    </div>
  </motion.div>
);

const Projects = () => {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #111128 100%)" }}
    >
      <div className="max-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="tag mb-4 inline-block">Projects</span>
          <h2 className="section-title gradient-text">Featured Work</h2>
          <p className="section-subtitle">Hand-picked projects that showcase my skills and problem-solving approach.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={
                filter === cat
                  ? {
                      background: "rgba(99,102,241,0.2)",
                      border: "1px solid rgba(99,102,241,0.4)",
                      color: "#a5bafb",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#94a3b8",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
