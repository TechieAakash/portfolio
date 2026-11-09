import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer = ({ scrollToSection, themeMode }) => {
  const isLight = themeMode === 'light';
  const isNeural = themeMode === 'neural';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`w-full py-12 relative z-10 font-mono text-xs border-t transition-colors ${
      isLight
        ? 'bg-slate-100 border-slate-200 text-slate-600'
        : isNeural
        ? 'bg-slate-950 border-emerald-950 text-slate-500'
        : 'bg-slate-950 border-slate-900 text-slate-500'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={`font-black text-base font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Aakash Yadav
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                isNeural
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                  : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
              }`}>
                B.Tech IT @ NSUT
              </span>
            </div>
            <p className="mt-1 text-xs">
              Software Engineer & Solution Builder • Architect of SmartPark & Nagar Drishti
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['overview', 'projects', 'skills', 'experience', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`hover:text-cyan-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Aakash Yadav. Engineered with React & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/TechieAakash" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/aakash-yadav-33a135332" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:aakash3121733@gmail.com" className="hover:text-cyan-400 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
