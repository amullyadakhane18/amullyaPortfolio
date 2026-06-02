import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon, HiMenuAlt3, HiX } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";
import { navLinks, personalInfo } from "../../assets/data/portfolioData";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? isDark
                ? "bg-[rgba(6,6,17,0.85)] backdrop-blur-xl border border-white/[0.07] shadow-2xl"
                : "bg-[rgba(248,250,255,0.85)] backdrop-blur-xl border border-indigo-100 shadow-xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              AD
            </div>
            <span
              className="font-display font-semibold text-base hidden sm:block"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Amullya Dakhane
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-body font-medium rounded-xl transition-all duration-200 ${
                    active === link.href.replace("#", "")
                      ? isDark ? "text-white" : "text-indigo-700"
                      : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-indigo-700"
                  }`}
                >
                  {active === link.href.replace("#", "") && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(99,102,241,0.12)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-yellow-300"
                  : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600"
              }`}
            >
              {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isDark ? "bg-white/5 hover:bg-white/10 text-white" : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {menuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden md:hidden"
            style={{
              background: isDark ? "rgba(13,13,26,0.95)" : "rgba(248,250,255,0.97)",
              backdropFilter: "blur(20px)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <ul className="p-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active === link.href.replace("#", "")
                        ? isDark ? "bg-indigo-500/15 text-indigo-300" : "bg-indigo-50 text-indigo-700"
                        : isDark ? "text-slate-300 hover:bg-white/5" : "text-slate-600 hover:bg-indigo-50/50"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
