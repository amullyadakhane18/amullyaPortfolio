import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiPaperAirplane, HiCheckCircle } from "react-icons/hi";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useInView } from "../../hooks/useInView";
import { personalInfo } from "../../assets/data/portfolioData";
import emailjs from "@emailjs/browser";

const contactLinks = [
  {
    icon: <HiMail size={20} />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#6366f1",
  },
  {
    icon: <HiPhone size={20} />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: "#8b5cf6",
  },
  {
    icon: <FiGithub size={20} />,
    label: "GitHub",
    value: "github.com/amullyadakhane18",
    href: personalInfo.github,
    color: "#94a3b8",
  },
  {
    icon: <FiLinkedin size={20} />,
    label: "LinkedIn",
    value: "linkedin.com/in/amullyadakhane",
    href: personalInfo.linkedin,
    color: "#0ea5e9",
  },
];

const Contact = () => {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    await emailjs.send(
      "service_69cvkip",
      "template_jeqif0f",
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      "n_3oau2PyIIKmft4F"
    );

    console.log("Success");

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {
    console.log("FULL ERROR:", error);

    alert(error.text || JSON.stringify(error));
  }

  setLoading(false);
};

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #060611 100%)" }}
    >
      <div className="max-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Contact</span>
          <h2 className="section-title gradient-text">Let's Work Together</h2>
          <p className="section-subtitle">
            Got a project in mind? Looking for a frontend developer? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Opening line */}
            <div
              className="p-7 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="w-10 h-1 rounded-full mb-5" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
              <h3 className="font-display font-bold text-xl text-white mb-3">Open to Opportunities</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you need a freelance developer, want to discuss a project, or are looking for a full-time hire — my inbox is always open.
              </p>
            </div>

            {/* Contact links */}
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${link.color}18`, color: link.color }}
                >
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">{link.label}</p>
                  <p className="text-slate-300 text-sm truncate group-hover:text-white transition-colors">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 rounded-2xl h-full"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                    <HiCheckCircle size={40} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">Message Sent!</h3>
                  <p className="text-slate-400 max-w-xs">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-outline mt-2"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {["name", "email"].map((field) => (
                      <div key={field} className="flex flex-col gap-2">
                        <label className="text-slate-400 text-xs font-mono uppercase tracking-wider capitalize">
                          {field} *
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          required
                          placeholder={field === "email" ? "your@email.com" : "Your name"}
                          className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all duration-200 placeholder-slate-600 font-body"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all duration-200 placeholder-slate-600 font-body"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all duration-200 placeholder-slate-600 resize-none font-body"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2 self-start"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
