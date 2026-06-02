import React from "react";
import { motion } from "framer-motion";
import { HiBriefcase, HiLocationMarker, HiCalendar, HiCheckCircle } from "react-icons/hi";
import { useInView } from "../../hooks/useInView";
import { experiences } from "../../assets/data/portfolioData";

const Experience = () => {
  const [ref, inView] = useInView();

  return (
    <section
      id="experience"
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
          <span className="tag mb-4 inline-block">Experience</span>
          <h2 className="section-title gradient-text">Professional Journey</h2>
          <p className="section-subtitle">Building real-world products in a fast-paced engineering environment.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-[1px] hidden md:block"
            style={{ background: "linear-gradient(180deg, #6366f1, #8b5cf6, transparent)" }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative md:pl-24 mb-8 last:mb-0"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-5 top-8 w-6 h-6 rounded-full border-4 items-center justify-center hidden md:flex"
                style={{
                  background: "#0d0d1a",
                  borderColor: exp.color,
                  boxShadow: `0 0 20px ${exp.color}60`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: exp.color }}
                />
              </div>

              {/* Card */}
              <div
                className="gradient-border p-8 rounded-2xl group hover:shadow-glow transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${exp.color}15`, color: exp.color }}
                    >
                      <HiBriefcase size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-white">{exp.role}</h3>
                      <p className="font-semibold" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <span
                      className="flex items-center gap-1.5 text-sm font-mono px-3 py-1.5 rounded-lg"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        color: "#a5bafb",
                      }}
                    >
                      <HiCalendar size={14} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center justify-end gap-1.5 text-slate-500 text-xs">
                      <HiLocationMarker size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Type badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-sm font-medium">{exp.type}</span>
                </div>

                {/* Achievements */}
                <div className="space-y-3">
                  <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
                    Key Achievements
                  </p>
                  {exp.achievements.map((ach, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + j * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <HiCheckCircle
                        size={18}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: exp.color }}
                      />
                      <p className="text-slate-300 text-sm leading-relaxed">{ach}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
