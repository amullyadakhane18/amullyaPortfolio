import React from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { achievements } from "../../assets/data/portfolioData";

const Achievements = () => {
  const [ref, inView] = useInView();

  return (
    <section
      id="achievements"
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
          <span className="tag mb-4 inline-block">Achievements</span>
          <h2 className="section-title gradient-text">Milestones & Recognition</h2>
          <p className="section-subtitle">A collection of certifications, milestones, and proud moments.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 flex flex-col gap-4 cursor-default"
            >
              {/* Icon + Year */}
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${ach.color}18`, border: `1px solid ${ach.color}25` }}
                >
                  {ach.icon}
                </div>
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{ background: `${ach.color}15`, color: ach.color, border: `1px solid ${ach.color}25` }}
                >
                  {ach.year}
                </span>
              </div>

              {/* Text */}
              <div>
                <h4 className="font-display font-semibold text-white mb-2 leading-snug">{ach.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{ach.description}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-[2px] w-12 rounded-full mt-auto"
                style={{ background: `linear-gradient(90deg, ${ach.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
