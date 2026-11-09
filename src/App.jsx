import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ParticleBackground from './components/ParticleBackground';

const App = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  // Theme mode: 'dark' | 'light' | 'neural'
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeMode');
      if (saved === 'light' || saved === 'neural' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark';
  });

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.classList.remove('mode-dark', 'mode-light', 'mode-neural', 'dark', 'light');
    document.documentElement.classList.add(`mode-${themeMode}`);
    if (themeMode === 'dark' || themeMode === 'neural') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['overview', 'projects', 'skills', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const globalBgImage = isNeural 
    ? '/images/neural-bg.jpg'
    : '/images/systems-hero-backdrop.jpg';

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-500 ${
      isLight
        ? 'bg-slate-50 text-slate-900 selection:bg-blue-500/20 selection:text-blue-900'
        : isNeural
        ? 'bg-[#030712] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200'
        : 'bg-[#020617] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
    }`}>
      {/* GLOBAL ANIMATED BACKGROUND IMAGE (Visible across all transparent sections) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          key={globalBgImage}
          src={globalBgImage}
          alt="Global Animated Cybernetic Background"
          className={`w-full h-full object-cover object-center animate-kenburns transition-opacity duration-1000 ${
            isLight ? 'opacity-10' : isNeural ? 'opacity-40' : 'opacity-30'
          }`}
        />

        {/* Dynamic Translucent Gradient Veil */}
        <div className={`absolute inset-0 transition-colors duration-700 ${
          isLight
            ? 'bg-gradient-to-b from-slate-50/80 via-slate-50/70 to-slate-50/90'
            : isNeural
            ? 'bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950/90'
            : 'bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950/90'
        }`} />

        {/* Ambient Radial Color Spotlights */}
        <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isNeural ? 'bg-emerald-500/15' : isLight ? 'bg-blue-400/10' : 'bg-cyan-500/12'
        }`} />
        <div className={`absolute bottom-1/3 right-1/4 w-[700px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
          isNeural ? 'bg-violet-600/15' : isLight ? 'bg-indigo-300/10' : 'bg-indigo-600/12'
        }`} />
      </div>

      {/* Interactive Particle Synapses Background */}
      <ParticleBackground themeMode={themeMode} />

      {/* Cyber Grid Lines */}
      <div className={`fixed inset-0 pointer-events-none cyber-grid z-0 transition-opacity duration-500 ${
        isLight ? 'opacity-20' : isNeural ? 'opacity-40' : 'opacity-25'
      }`} />

      {/* Navbar with 3-Mode Switcher */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      {/* Main Content Sections with Translucent Glassmorphism */}
      <main className="relative z-10">
        <HeroSection
          scrollToSection={scrollToSection}
          themeMode={themeMode}
        />

        <ProjectsSection
          onSelectProject={setSelectedProject}
          themeMode={themeMode}
        />

        <SkillsSection
          themeMode={themeMode}
        />

        <ExperienceTimeline
          themeMode={themeMode}
        />

        <ContactSection
          themeMode={themeMode}
        />
      </main>

      {/* Footer */}
      <Footer
        scrollToSection={scrollToSection}
        themeMode={themeMode}
      />

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default App;
