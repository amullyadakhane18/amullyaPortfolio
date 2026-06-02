import React from "react";
import { motion } from "framer-motion";
import { HiAcademicCap, HiLocationMarker, HiCalendar } from "react-icons/hi";
import { useInView } from "../../hooks/useInView";
import { education } from "../../assets/data/portfolioData";

const Education = () => {
  const [ref, inView] = useInView();

  return (
    <section
      id="education"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #111128 100%)" }}
    >
      <div className="max-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Education</span>
          <h2 className="section-title gradient-text">Academic Background</h2>
          <p className="section-subtitle">Building a strong foundation alongside real-world experience.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="gradient-border group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {/* Gradient top */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${edu.gradient}`}
              />

              <div className="p-7 flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br ${edu.gradient}`}
                  style={{ opacity: 0.9 }}
                >
                  {edu.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white mb-1">{edu.degree}</h3>
                      <p className="text-indigo-400 font-medium text-sm">{edu.institution}</p>
                    </div>
                    {edu.percentage && (
                      <div
                        className="px-4 py-2 rounded-xl text-center flex-shrink-0"
                        style={{
                          background: "rgba(99,102,241,0.1)",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        <div
                          className="font-display font-bold text-xl"
                          style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {edu.percentage}
                        </div>
                        <div className="text-slate-500 text-xs font-mono">Score</div>
                      </div>
                    )}
                    {edu.status === "Pursuing" && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 text-xs font-medium">Pursuing</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                      <HiCalendar size={12} />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                      <HiLocationMarker size={12} />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
