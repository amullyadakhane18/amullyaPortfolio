import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "../../assets/data/portfolioData";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="py-10 px-4 border-t"
      style={{
        background: "#060611",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <button onClick={scrollToTop} className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            AD
          </div>
          <span className="text-slate-500 text-sm font-mono">
            {personalInfo.name}
          </span>
        </button>

        {/* Copyright */}
        <p className="text-slate-600 text-sm font-mono text-center">
          © {new Date().getFullYear()} — Built with React.js & Tailwind CSS
        </p>

        {/* Social */}
        <div className="flex items-center gap-3">
          {[
            { icon: <FiGithub size={16} />, href: personalInfo.github },
            { icon: <FiLinkedin size={16} />, href: personalInfo.linkedin },
            { icon: <FiMail size={16} />, href: `mailto:${personalInfo.email}` },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
