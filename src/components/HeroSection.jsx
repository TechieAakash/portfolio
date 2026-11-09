import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  Code2, 
  ArrowRight, 
  GraduationCap,
  Sparkles,
  Cpu,
  Layers,
  Database,
  Terminal,
  Activity,
  Award,
  CheckCircle2,
  Binary
} from 'lucide-react';
import InteractiveHeroBackground from './InteractiveHeroBackground';

const HeroSection = ({ scrollToSection, themeMode }) => {
  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  return (
    <section id="overview" className="relative min-h-[96vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* ================= WHOLE-BACKGROUND INTERACTIVE & ANIMATED SYSTEMS VISUAL ================= */}
      {/* Spans across the entire background behind all hero text, badges, and CTAs (not confined to a card) */}
      <InteractiveHeroBackground themeMode={themeMode} />

      {/* ================= HERO CONTENT LAYER ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8 text-left"
        >
          {/* Top Eyebrow Badges: Role & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-mono shadow-xl backdrop-blur-xl ${
              isNeural
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-emerald-950/40'
                : isLight
                ? 'bg-white/85 border-slate-200 text-blue-700 shadow-slate-200/50'
                : 'bg-slate-950/65 border-cyan-500/35 text-cyan-300 shadow-cyan-950/40'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isNeural ? 'bg-emerald-400' : isLight ? 'bg-blue-500' : 'bg-cyan-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isNeural ? 'bg-emerald-500' : isLight ? 'bg-blue-600' : 'bg-cyan-500'
                }`}></span>
              </span>
              <span className="font-semibold">Software Engineer & Solution Builder</span>
              <span className="opacity-40">•</span>
              <span>B.Tech IT @ NSUT Delhi</span>
            </div>

            {/* Available For Hire Pulse Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-xl ${
              isNeural
                ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
                : isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-900/60 border-emerald-500/30 text-emerald-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Hire (SWE / SDE)</span>
            </div>
          </div>

          {/* Engineer Name & University Identification */}
          <div className="space-y-2">
            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-display font-black text-base border shadow-xl backdrop-blur-xl ${
                isNeural
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-emerald-900/30'
                  : isLight
                  ? 'bg-white border-blue-200 text-blue-600 shadow-blue-100'
                  : 'bg-slate-900/85 border-cyan-500/50 text-cyan-300 shadow-cyan-950/40'
              }`}>
                &lt;/&gt;
              </div>
              <div>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight leading-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Aakash Yadav
                </h2>
                <p className={`text-xs sm:text-sm font-mono flex items-center gap-1.5 ${
                  isNeural ? 'text-emerald-400' : isLight ? 'text-blue-600 font-semibold' : 'text-cyan-400'
                }`}>
                  <GraduationCap className="w-4 h-4" /> Netaji Subhas University of Technology (NSUT), Delhi
                </p>
              </div>
            </div>
          </div>

          {/* Catchy Main Headline & High-Impact Subtext */}
          <div className="space-y-4 max-w-4xl">
            <h1 className={`text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-[1.12] ${
              isLight ? 'text-slate-900 drop-shadow-sm' : 'text-white drop-shadow-lg'
            }`}>
              I Engineer{' '}
              <span className={`bg-clip-text text-transparent ${
                isNeural
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400'
                  : 'bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400'
              }`}>
                Resilient Systems
              </span>{' '}
              & High-Impact Software Solutions.
            </h1>

            <p className={`text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-3xl drop-shadow ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}>
              Turning complex computational problems into elegant, production-ready software. Passionate about architecting scalable backends, real-time data pipelines, and intelligent systems that solve tangible real-world problems.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('projects')}
              className={`px-7 py-4 rounded-xl font-display font-bold text-sm sm:text-base shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer group ${
                isNeural
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-cyan-500/25'
              }`}
            >
              <Code2 className="w-5 h-5 text-slate-950" />
              <span>Explore Flagship Projects</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href="https://drive.google.com/file/d/1JH_-iIz0Kq_Tm5tPQmRmBR9DmAgEKhpx/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-4 rounded-xl font-display text-sm sm:text-base font-semibold border backdrop-blur-xl transition-all flex items-center gap-2 shadow-lg ${
                isLight
                  ? 'bg-white/80 hover:bg-white text-slate-800 border-slate-300 shadow-slate-200/50'
                  : 'bg-slate-950/60 hover:bg-slate-900/90 text-slate-200 border-slate-700/80'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Resume (PDF)</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-4 rounded-xl font-display text-sm sm:text-base font-semibold border backdrop-blur-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                isLight
                  ? 'bg-blue-50/80 text-blue-700 border-blue-200 hover:bg-blue-100'
                  : 'bg-slate-950/60 hover:bg-slate-900/90 text-cyan-300 border-cyan-500/40'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Let's Connect</span>
            </button>
          </div>

          {/* Social Profiles Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className={`text-xs font-mono uppercase tracking-wider ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Profiles:
            </span>

            <a
              href="https://github.com/TechieAakash"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-xl text-xs font-mono font-semibold transition-all shadow-md ${
                isLight
                  ? 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/aakash-yadav-33a135332"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-xl text-xs font-mono font-semibold transition-all shadow-md ${
                isLight
                  ? 'bg-white/80 border-slate-200 text-blue-700 hover:bg-blue-50'
                  : 'bg-slate-950/60 border-slate-800 text-blue-400 hover:text-blue-300 hover:border-blue-500/40'
              }`}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:aakash3121733@gmail.com"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-xl text-xs font-mono font-semibold transition-all shadow-md ${
                isLight
                  ? 'bg-white/80 border-slate-200 text-cyan-700 hover:bg-cyan-50'
                  : 'bg-slate-950/60 border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* ================= ARCHITECTURAL TELEMETRY HUD BAR ================= */}
          {/* Integrated seamlessly across the hero rather than in a separate card */}
          <div className={`mt-8 pt-6 border-t backdrop-blur-md rounded-2xl p-5 ${
            isLight
              ? 'bg-white/60 border-slate-200/80 shadow-lg'
              : isNeural
              ? 'bg-emerald-950/30 border-emerald-500/20 shadow-xl shadow-emerald-950/20'
              : 'bg-slate-950/45 border-slate-800/80 shadow-2xl'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Specialization */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>High-Performance Systems</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Python • C++ • Flask backend APIs, relational database transaction locking, and computational efficiency.
                </p>
              </div>

              {/* Hackathon Recognition */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>SIH 2026 & Hack4Delhi</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Architected Nagar Drishti (SIH 2026 AI Road Sensing) & SmartPark (Hack4Delhi Slot Allocator).
                </p>
              </div>

              {/* Primary Stack Chips */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-400">
                  <Binary className="w-3.5 h-3.5" />
                  <span>Primary Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {['Python', 'Flask', 'MySQL', 'C++', 'Computer Vision', 'GIS', 'React', 'Git'].map((item) => (
                    <span
                      key={item}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                        isLight
                          ? 'bg-white/90 text-slate-800 border-slate-300'
                          : 'bg-slate-900/80 text-slate-200 border-slate-700/60'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;