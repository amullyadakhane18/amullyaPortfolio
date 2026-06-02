import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 200);
          return 100;
        }
        return prev + Math.random() * 7 + 2;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#060611" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Bg orbs */}
          <div className="absolute inset-0">
            <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px] float-1"
              style={{ background: "radial-gradient(circle, #6366f1, transparent)", top: "10%", left: "20%" }} />
            <div className="absolute w-80 h-80 rounded-full opacity-[0.1] blur-[80px] float-2"
              style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", bottom: "15%", right: "20%" }} />
          </div>

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Spinning logo */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, transparent, transparent)",
                  borderRadius: "50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[3px] rounded-full" style={{ background: "#060611" }} />
              {/* Inner pulse rings */}
              {[0,1].map(i => (
                <motion.div key={i}
                  className="absolute inset-0 rounded-full border border-indigo-500/30"
                  animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
                />
              ))}
              <div className="absolute inset-[3px] rounded-full flex items-center justify-center">
                <span className="font-display font-bold text-2xl"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>AD</span>
              </div>
            </div>

            {/* Name */}
            <div className="text-center">
              <motion.h1
                className="font-display font-bold text-2xl text-white tracking-wider"
                initial={{ letterSpacing: "0.3em", opacity: 0 }}
                animate={{ letterSpacing: "0.1em", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Amullya Dakhane
              </motion.h1>
              <p className="text-slate-500 text-xs font-mono mt-1 tracking-[0.3em] uppercase">
                Frontend Developer
              </p>
            </div>

            {/* Progress */}
            <div className="w-64">
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                <motion.div className="h-full rounded-full relative"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
                    width: `${Math.min(progress, 100)}%`,
                  }}
                  transition={{ duration: 0.1 }}>
                  {/* Shimmer */}
                  <div className="absolute inset-0 opacity-60"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      animation: "shimmerBar 1.5s linear infinite",
                    }} />
                </motion.div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-slate-600 text-xs font-mono">Initialising</span>
                <span className="text-slate-400 text-xs font-mono">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
