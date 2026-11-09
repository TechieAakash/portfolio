import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  FileText, 
  Sparkles,
  MapPin
} from 'lucide-react';

const ContactSection = ({ themeMode }) => {
  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const emailAddress = 'aakash3121733@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Software Engineering Opportunity: ${name}`);
    const body = encodeURIComponent(`Hi Aakash,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border font-mono text-xs uppercase tracking-wider mb-4 ${
            isNeural
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              : isLight
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Open for SWE Internships & Full-Time Opportunities
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Let's Connect & Build
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Looking for a motivated Software Engineer with proven architectural execution? Let's discuss systems, engineering roles, and collaborative projects.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Connect & Profiles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Email Card with Copy button */}
            <div className={`p-6 rounded-2xl border shadow-xl ${
              isLight
                ? 'bg-white/65 border-slate-200 backdrop-blur-xl'
                : isNeural
                ? 'bg-slate-950/45 border-emerald-900/50 backdrop-blur-xl'
                : 'bg-slate-950/45 border-slate-700/60 backdrop-blur-xl'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Direct Email</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Responds &lt; 24h
                </span>
              </div>
              <div className={`text-base sm:text-lg font-bold font-display break-all ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {emailAddress}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={copyEmail}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md shadow-cyan-500/20"
                  title="Open Mail Client"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Profiles Hub */}
            <div className={`p-6 rounded-2xl border shadow-xl space-y-3 ${
              isLight
                ? 'bg-white/65 border-slate-200 backdrop-blur-xl'
                : isNeural
                ? 'bg-slate-950/45 border-emerald-900/50 backdrop-blur-xl'
                : 'bg-slate-950/45 border-slate-700/60 backdrop-blur-xl'
            }`}>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Professional Links:
              </span>

              {/* GitHub */}
              <a
                href="https://github.com/TechieAakash"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-600 text-slate-200 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-display">GitHub: TechieAakash</div>
                    <div className="text-[10px] text-slate-500 font-mono">Repositories & Architecture</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/aakash-yadav-33a135332"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    : 'bg-slate-950/60 border-slate-800 hover:border-blue-500/40 text-slate-200 hover:text-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-display">LinkedIn Network</div>
                    <div className="text-[10px] text-slate-500 font-mono">Connect & Network</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </a>

              {/* Resume */}
              <a
                href="https://drive.google.com/file/d/1JH_-iIz0Kq_Tm5tPQmRmBR9DmAgEKhpx/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-display text-white group-hover:text-cyan-300">Curriculum Vitae (PDF)</div>
                    <div className="text-[10px] text-cyan-400/80 font-mono">Verified Resume Document</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Send Message Directly */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 shadow-2xl backdrop-blur-xl ${
            isLight
              ? 'bg-white/65 border-slate-200'
              : isNeural
              ? 'bg-slate-950/45 border-emerald-900/50'
              : 'bg-slate-950/45 border-slate-700/60'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connects directly via your preferred email app:
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                        : 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                        : 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Message / Engineering Opportunity</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your team, tech stack, or engineering project..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all resize-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                      : 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400'
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-6 rounded-xl font-display font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isNeural
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25'
                }`}
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
