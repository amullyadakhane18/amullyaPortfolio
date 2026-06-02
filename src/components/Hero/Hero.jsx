import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiDownload, HiMail } from "react-icons/hi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { personalInfo } from "../../assets/data/portfolioData";

const Hero = () => {
  const canvasRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: ["#6366f1", "#8b5cf6", "#06b6d4"][Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060611 0%, #0d0d1a 60%, #111128 100%)" }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Animated BG orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full opacity-[0.1] blur-[120px] float-1"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)", top: "-15%", left: "-15%" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[90px] float-2"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", bottom: "-5%", right: "0%" }} />
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-[0.06] blur-[70px] float-3"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", top: "40%", right: "20%" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">

            {/* Badge */}
            <motion.div variants={item} className="inline-flex">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5bafb" }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <h1 className="font-display font-bold leading-[1.1]">
                <span className="block text-slate-400 text-2xl mb-2 font-normal">Hi there, I'm</span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl"
                  style={{
                    background: "linear-gradient(135deg, #e2e8f0 0%, #a5bafb 50%, #c4b5fd 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                  {personalInfo.shortName}
                </span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl"
                  style={{
                    background: "linear-gradient(135deg, #a5bafb 0%, #8b5cf6 50%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                  Dakhane
                </span>
              </h1>
            </motion.div>

            {/* Typing role */}
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="text-slate-400 text-lg font-body">I'm a</span>
              <span className="text-xl font-display font-semibold"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                <TypeAnimation
                  sequence={personalInfo.roles.flatMap((r) => [r, 2200])}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="text-slate-400 text-lg leading-relaxed max-w-lg font-body">
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                download="Amullya_Dakhane_Resume.pdf"
                className="btn-primary flex items-center gap-2"
              >
                <HiDownload size={18} />
                Download Resume
              </a>
              <button onClick={() => scrollTo("contact")} className="btn-outline flex items-center gap-2">
                <HiMail size={18} />
                Get In Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-4">
              <span className="text-slate-600 text-sm font-mono">find me →</span>
              {[
                { href: personalInfo.github, icon: <FiGithub size={18} />, hoverColor: "#e2e8f0" },
                { href: personalInfo.linkedin, icon: <FiLinkedin size={18} />, hoverColor: "#6366f1" },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — avatar orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse"
                style={{ background: "radial-gradient(circle, #6366f1, #8b5cf6, transparent)" }} />

              {/* Orbital rings with dots */}
              {[0, 1, 2].map((i) => (
                <motion.div key={i}
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    border: `1px solid rgba(99,102,241,${0.18 - i * 0.04})`,
                    transform: `scale(${1 + i * 0.18})`,
                  }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ background: i === 0 ? "#6366f1" : i === 1 ? "#8b5cf6" : "#06b6d4", boxShadow: `0 0 8px ${i === 0 ? "#6366f1" : i === 1 ? "#8b5cf6" : "#06b6d4"}` }} />
                </motion.div>
              ))}

              {/* Orbiting tech badges */}
              {[
                { label: "React", color: "#61dafb", angle: 0 },
                { label: "JS", color: "#f7df1e", angle: 90 },
                { label: "CSS", color: "#264de4", angle: 180 },
                { label: "Git", color: "#f05032", angle: 270 },
              ].map(({ label, color, angle }) => (
                <motion.div key={label}
                  className="absolute w-11 h-11 rounded-xl flex items-center justify-center text-xs font-mono font-bold shadow-lg"
                  style={{
                    background: `${color}20`, border: `1px solid ${color}40`, color,
                    top: "50%", left: "50%", transformOrigin: "0 0",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(155px) rotate(-${angle}deg)`,
                    animation: `orbit 10s linear infinite`,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  {label}
                </motion.div>
              ))}

              {/* Avatar circle */}
              <div className="absolute inset-6 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #181830, #0d0d1a)",
                  border: "2px solid rgba(99,102,241,0.35)",
                  boxShadow: "0 0 80px rgba(99,102,241,0.35), inset 0 0 50px rgba(99,102,241,0.07)",
                }}>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-display font-bold text-6xl"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>AD</span>
                  <span className="text-slate-500 text-xs font-mono tracking-widest">FRONTEND DEV</span>
                  {/* Wave bars */}
                  <div className="flex items-end gap-[3px] mt-1" style={{ height: "16px" }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.12}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-10"
            style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.7), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
