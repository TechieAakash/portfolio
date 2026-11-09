import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Sun, Moon, Brain, Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = ({ activeSection, scrollToSection, themeMode, setThemeMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects', badge: '2' },
    { id: 'skills', label: 'Skills Grid' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? themeMode === 'light'
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-md py-3'
            : themeMode === 'neural'
            ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-emerald-900/40 shadow-2xl shadow-emerald-950/20 py-3'
            : 'bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Identity */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 group cursor-pointer text-left shrink-0"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm tracking-tighter shadow-lg transition-transform duration-300 group-hover:scale-105 ${
              themeMode === 'neural'
                ? 'bg-gradient-to-tr from-emerald-400 via-teal-500 to-violet-600 text-slate-950 shadow-emerald-500/25'
                : 'bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 text-slate-950 shadow-cyan-500/20'
            }`}>
              &lt;AY/&gt;
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-black text-base sm:text-lg tracking-tight leading-snug transition-colors ${
                themeMode === 'light' ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-cyan-300'
              }`}>
                Aakash Yadav
              </span>
              <span className={`text-[11px] font-mono flex items-center gap-1.5 ${
                themeMode === 'neural' ? 'text-emerald-400' : themeMode === 'light' ? 'text-blue-600 font-semibold' : 'text-cyan-400 font-medium'
              }`}>
                Software Engineer <span className="opacity-40">•</span> NSUT IT
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-xl transition-colors ${
            themeMode === 'light'
              ? 'bg-slate-100/90 border-slate-200'
              : themeMode === 'neural'
              ? 'bg-slate-900/90 border-emerald-900/40 shadow-inner'
              : 'bg-slate-900/90 border-slate-800 shadow-inner'
          }`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-semibold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? themeMode === 'light'
                        ? 'text-blue-700 bg-white shadow-sm border border-blue-200'
                        : themeMode === 'neural'
                        ? 'text-emerald-300 bg-slate-800/90 shadow-md border border-emerald-500/40'
                        : 'text-cyan-300 bg-slate-800/90 shadow-md border border-cyan-500/30'
                      : themeMode === 'light'
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full leading-none ${
                        themeMode === 'neural'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Hub: 3-Way Mode Switcher & Profiles */}
          <div className="flex items-center gap-2.5">
            {/* 3-Way Theme Switcher: Light / Dark / Neural */}
            <div className={`flex items-center p-1 rounded-xl border text-xs font-mono transition-colors ${
              themeMode === 'light'
                ? 'bg-slate-100 border-slate-200'
                : themeMode === 'neural'
                ? 'bg-slate-900 border-emerald-900/60'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <button
                onClick={() => setThemeMode('light')}
                title="Light Mode"
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  themeMode === 'light'
                    ? 'bg-white text-amber-500 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[10px]">Light</span>
              </button>

              <button
                onClick={() => setThemeMode('dark')}
                title="Dark Mode (Obsidian)"
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[10px]">Dark</span>
              </button>

              <button
                onClick={() => setThemeMode('neural')}
                title="Neural Mode (Matrix Bio-Cyber)"
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  themeMode === 'neural'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline text-[10px]">Neural</span>
              </button>
            </div>

            {/* GitHub Fast Shortcut */}
            <a
              href="https://github.com/TechieAakash"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border transition-all hidden sm:flex ${
                themeMode === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border md:hidden ${
                themeMode === 'light' ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl space-y-2 font-display ${
            themeMode === 'light'
              ? 'bg-white/95 border-slate-200'
              : 'bg-slate-900/95 border-slate-800'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
