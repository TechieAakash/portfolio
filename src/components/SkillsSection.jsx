import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Orbit, Grid, Info, CheckCircle2 } from 'lucide-react';
import SkillsGlobe from './SkillsGlobe';

const SkillsSection = ({ themeMode }) => {
  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const [viewMode, setViewMode] = useState('globe'); // 'globe' or 'grid'
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillsList = [
    { name: 'Python', category: 'Backend & AI', level: 90, icon: '🐍', tag: 'Flask • Computer Vision', applied: 'Nagar Drishti' },
    { name: 'C++', category: 'Core & Algorithms', level: 88, icon: '⚡', tag: 'High-Performance & Memory', applied: 'Algorithms & Core Systems' },
    { name: 'Flask', category: 'Backend Framework', level: 90, icon: '🌶️', tag: 'RESTful Microservices', applied: 'SmartPark & Nagar Drishti' },
    { name: 'MySQL', category: 'Databases', level: 86, icon: '🐬', tag: 'ACID • Relational Schemas', applied: 'SmartPark Transactional DB' },
    { name: 'Computer Vision', category: 'AI & Systems', level: 85, icon: '👁️', tag: 'Edge AI • Road Defect Detection', applied: 'Nagar Drishti' },
    { name: 'GIS Mapping', category: 'Geospatial AI', level: 84, icon: '🗺️', tag: 'Incident Heatmaps & Telemetry', applied: 'Nagar Drishti Dashboard' },
    { name: 'GPS Telemetry', category: 'IoT Systems', level: 85, icon: '📡', tag: 'Public Bus Fleet Ingestion', applied: 'Nagar Drishti Sensor Units' },
    { name: 'JavaScript (ES6+)', category: 'Frontend', level: 86, icon: '💛', tag: 'Async APIs • DOM Engineering', applied: 'SmartPark Client UI' },
    { name: 'React.js', category: 'Frontend', level: 85, icon: '⚛️', tag: 'Component Systems & Framer Motion', applied: 'Portfolio & Dashboards' },
    { name: 'Git & GitHub', category: 'DevOps & Tooling', level: 88, icon: '🐙', tag: 'Version Control & Repos', applied: 'Hackathons & Repos' },
    { name: 'HTML5 & CSS3', category: 'Frontend', level: 92, icon: '🌐', tag: 'Semantic Markup & Flex/Grid', applied: 'SmartPark Responsive UI' },
    { name: 'RESTful APIs', category: 'Backend', level: 89, icon: '🔌', tag: 'Endpoint Design & Middleware', applied: 'Both Flagship Projects' },
    { name: 'Linux / Bash', category: 'Systems', level: 84, icon: '🐧', tag: 'Server Ops & Automation', applied: 'Cloud Hosting & Render' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 92, icon: '🎨', tag: 'Glassmorphism & Cyber Styling', applied: 'Modern Responsive Design' },
    { name: 'Java', category: 'Core OOP', level: 80, icon: '☕', tag: 'Object-Oriented Design Patterns', applied: 'Academic Foundation' },
    { name: 'Database Indexing', category: 'Databases', level: 85, icon: '🗄️', tag: 'Query Optimization & Constraints', applied: 'SmartPark Relational Logic' },
  ];

  return (
    <section id="skills" className="relative py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border font-mono text-xs uppercase tracking-wider mb-4 ${
              isNeural
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : isLight
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-slate-900 border-slate-800 text-cyan-400'
            }`}>
              <Cpu className="w-3.5 h-3.5" />
              Dynamic Technical Arsenal
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Technical Constellation
            </h2>
            <p className={`mt-3 text-sm sm:text-base max-w-2xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Interactive 3D orbit constellation of core software engineering competencies. Drag to rotate in 3D space, hover to inspect, or click for application details.
            </p>
          </div>

          {/* View Switcher: 3D Globe vs Grid View */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <div className={`flex items-center p-1 rounded-xl border backdrop-blur-md text-xs font-mono ${
              isLight
                ? 'bg-white/80 border-slate-300'
                : 'bg-slate-950/70 border-slate-800'
            }`}>
              <button
                onClick={() => setViewMode('globe')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'globe'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>3D Globe Orbit</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area: 3D Globe or Card Grid */}
        {viewMode === 'globe' ? (
          <div className={`rounded-3xl border shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${
            isLight
              ? 'bg-white/50 border-slate-200/80'
              : isNeural
              ? 'bg-slate-950/40 border-emerald-900/40 shadow-emerald-950/20'
              : 'bg-slate-950/40 border-slate-800/80 shadow-black/50'
          }`}>
            <SkillsGlobe
              themeMode={themeMode}
              onSelectSkill={setSelectedSkill}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`p-5 rounded-2xl border shadow-xl backdrop-blur-xl cursor-pointer transition-all duration-300 hover:scale-102 group ${
                  isLight
                    ? 'bg-white/70 border-slate-200 hover:border-blue-500'
                    : isNeural
                    ? 'bg-slate-950/50 border-emerald-900/40 hover:border-emerald-400'
                    : 'bg-slate-950/50 border-slate-800 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h4 className={`text-sm font-bold font-display group-hover:text-cyan-400 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 block">{skill.category}</span>
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isLight ? 'bg-blue-50 text-blue-700' : 'bg-slate-900 text-cyan-400 border border-slate-800'
                  }`}>
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-slate-800/60 rounded-full h-1.5 mb-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <p className="text-[10px] font-mono text-slate-400 truncate">
                  Applied in {skill.applied}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Selected Skill Detail Modal */}
      {selectedSkill && (
        <div
          onClick={() => setSelectedSkill(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4 font-mono text-xs sm:text-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedSkill.icon}</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">{selectedSkill.name}</h3>
                  <span className="text-xs text-slate-400">{selectedSkill.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Engineering Proficiency:</span>
                <span className="text-cyan-400 font-bold">{selectedSkill.level}%</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase">Specialization:</span>
                {selectedSkill.tag}
              </div>
              <div className="pt-2 border-t border-slate-800 text-emerald-400">
                <span className="text-slate-500 block text-[10px] uppercase">Applied in Flagships:</span>
                {selectedSkill.applied}
              </div>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all font-display text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
