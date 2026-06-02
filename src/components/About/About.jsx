import React from "react";
import { motion } from "framer-motion";
import { HiCode, HiLightBulb, HiTrendingUp, HiLocationMarker } from "react-icons/hi";
import { FiMail, FiPhone } from "react-icons/fi";
import { useInView } from "../../hooks/useInView";
import { personalInfo } from "../../assets/data/portfolioData";

const stats = [
  { label: "Years Experience", value: "1.5+", icon: "⚡", color: "#6366f1" },
  { label: "Projects Delivered", value: "5+", icon: "🚀", color: "#8b5cf6" },
  { label: "Technologies", value: "12+", icon: "🛠️", color: "#06b6d4" },
  { label: "Sprint Cycles", value: "20+", icon: "🔄", color: "#10b981" },
];

const traits = [
  { icon: <HiCode size={22} />, title: "Clean Code Advocate", color: "#6366f1",
    desc: "Writing readable, scalable, and maintainable code with a strong emphasis on component-driven architecture." },
  { icon: <HiLightBulb size={22} />, title: "UI/UX Enthusiast", color: "#8b5cf6",
    desc: "Passionate about creating intuitive interfaces that balance aesthetic beauty with functional design." },
  { icon: <HiTrendingUp size={22} />, title: "Performance Focused", color: "#06b6d4",
    desc: "Obsessed with optimisation — from lazy loading to code-splitting — to deliver the fastest experiences." },
];

const About = () => {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section-padding"
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #111128 100%)" }}>
      <div className="max-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="tag mb-4 inline-block">About Me</span>
          <h2 className="section-title gradient-text">The Developer Behind the Code</h2>
          <p className="section-subtitle">Crafting seamless digital experiences with passion and precision.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col gap-6">
            <div className="p-8 rounded-2xl gradient-border"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-12 h-1 rounded-full mb-6"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                I'm a <span className="text-indigo-400 font-semibold">Frontend Developer</span> with 1.5 years
                of hands-on experience building modern web applications. Currently employed full-time at{" "}
                <span className="text-violet-400 font-semibold">Iceico Technologies</span> while completing my
                B.Tech in Computer Science.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                My journey started with a curiosity for how beautiful interfaces come alive — and grew into a
                professional passion for building performant, accessible, and delightful digital products.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I thrive in Agile environments, enjoy collaborating with cross-functional teams, and am always
                learning new tools and patterns to level up my craft.
              </p>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <FiMail size={16} />, label: personalInfo.email, color: "#6366f1" },
                { icon: <FiPhone size={16} />, label: personalInfo.phone, color: "#8b5cf6" },
                { icon: <HiLocationMarker size={16} />, label: personalInfo.location, color: "#06b6d4", full: true },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:border-indigo-500/30 ${item.full ? "sm:col-span-2" : ""}`}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span className="text-slate-300 text-sm font-mono">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col gap-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", bounce: 0.4 }}
                  className="glass-card p-6 text-center relative overflow-hidden">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl opacity-10"
                    style={{ background: stat.color }} />
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <motion.div
                    className="font-display font-bold text-3xl mb-1"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", bounce: 0.5 }}
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, #8b5cf6)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                    {stat.value}
                  </motion.div>
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Traits */}
            {traits.map((trait, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="glass-card p-5 flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${trait.color}18`, color: trait.color }}>
                  {trait.icon}
                </motion.div>
                <div>
                  <h4 className="font-display font-semibold text-white mb-1">{trait.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{trait.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
