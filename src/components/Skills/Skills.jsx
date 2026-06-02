import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { skills } from "../../assets/data/portfolioData";

const categories = Object.keys(skills);

const SkillBar = ({ skill, inView, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay }}
    className="group"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-lg">{skill.icon}</span>
        <span className="text-slate-300 text-sm font-medium font-body">{skill.name}</span>
      </div>
      <span className="text-xs font-mono" style={{ color: "#a5bafb" }}>{skill.level}%</span>
    </div>
    <div className="skill-bar">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  </motion.div>
);

const Skills = () => {
  const [ref, inView] = useInView();
  const [active, setActive] = useState("Frontend");

  const techIcons = [
    { name: "React", bg: "#61dafb20", color: "#61dafb", letter: "⚛" },
    { name: "JS", bg: "#f7df1e20", color: "#f7df1e", letter: "JS" },
    { name: "HTML", bg: "#e34f2620", color: "#e34f26", letter: "5" },
    { name: "CSS", bg: "#264de420", color: "#264de4", letter: "3" },
    { name: "Git", bg: "#f0503220", color: "#f05032", letter: "⎇" },
    { name: "Node", bg: "#339933​20", color: "#68A063", letter: "⬡" },
  ];

  return (
    <section
      id="skills"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #111128 0%, #0d0d1a 100%)" }}
    >
      <div className="max-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Skills</span>
          <h2 className="section-title gradient-text">Technical Arsenal</h2>
          <p className="section-subtitle">Technologies I work with daily to build world-class interfaces.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left — tech cloud */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Hexagonal grid */}
            <div
              className="p-8 rounded-2xl flex flex-col gap-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Core Technologies</p>
              <div className="grid grid-cols-3 gap-4">
                {techIcons.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, type: "spring", bounce: 0.4 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="flex flex-col items-center gap-2 cursor-default"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-200"
                      style={{
                        background: tech.bg,
                        border: `1px solid ${tech.color}30`,
                        color: tech.color,
                        boxShadow: `0 4px 20px ${tech.color}10`,
                      }}
                    >
                      {tech.letter}
                    </div>
                    <span className="text-slate-500 text-xs">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Concepts */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4">Concepts</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Responsive Design", "Component Architecture", "State Management",
                  "REST API", "Agile/Scrum", "WCAG Accessibility",
                  "Performance Optimization", "Code Review", "Git Flow",
                ].map((concept) => (
                  <span key={concept} className="tag text-xs">{concept}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            {/* Category tabs */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={
                    active === cat
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
            </div>

            {/* Bars */}
            <div
              className="p-8 rounded-2xl flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {skills[active].map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  inView={inView}
                  delay={0.1 + i * 0.06}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
