import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Zap, Code2, MapPin } from 'lucide-react';

const ExperienceTimeline = ({ themeMode }) => {
  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const milestones = [
    {
      period: '2023 - Present',
      title: 'B.Tech in Information Technology',
      organization: 'Netaji Subhas University of Technology (NSUT), Delhi',
      location: 'Dwarka, New Delhi',
      type: 'education',
      icon: GraduationCap,
      description:
        'Pursuing Bachelor of Technology in IT branch with intensive focus on Data Structures, Database Systems (DBMS), Operating Systems, Distributed Networks, and Software Architecture.',
      badge: 'Academic Foundation',
    },
    {
      period: '2026',
      title: 'Smart India Hackathon (SIH) 2026 Innovator',
      organization: 'Nagar Drishti — AI Urban Intelligence Platform',
      location: 'National Innovation Arena',
      type: 'hackathon',
      icon: Award,
      description:
        'Engineered an AI-powered urban monitoring platform transforming public buses into real-time sensing units with GIS telemetry and automated municipal reporting for smart cities.',
      badge: 'SIH 2026 Solution',
    },
    {
      period: 'Hackathon Innovation',
      title: 'Hack4Delhi Hackathon Developer',
      organization: 'SmartPark — Smart Parking Management System',
      location: 'Delhi Circuit',
      type: 'hackathon',
      icon: Zap,
      description:
        'Built a full-stack automated parking management system using Flask and MySQL for vehicle entry, real-time slot allocation, and exit management.',
      badge: 'Hack4Delhi Project',
    },
    {
      period: 'Continuous Rigor',
      title: 'Systems & Full-Stack Software Engineering',
      organization: 'Production Systems & Open Source',
      location: 'Global',
      type: 'engineering',
      icon: Code2,
      description:
        'Architecting resilient web applications, computer vision edge platforms, and transactional backends engineered to handle scale and real-world constraints.',
      badge: 'Software Engineering Focus',
    },
  ];

  return (
    <section id="experience" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border font-mono text-xs uppercase tracking-wider mb-4 ${
            isNeural
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              : isLight
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-slate-900 border-slate-800 text-cyan-400'
          }`}>
            <GraduationCap className="w-3.5 h-3.5" />
            Academic & Engineering Journey
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Milestones & Education
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            From university coursework at NSUT to national hackathon innovations and real-world system architecture.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto before:absolute before:inset-0 before:left-5 md:before:left-1/2 md:before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/50 before:via-purple-500/50 before:to-transparent">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex items-start mb-10 md:mb-12 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-xl z-10 transition-all duration-300 group-hover:scale-110 ${
                  isLight
                    ? 'bg-white border-blue-400 text-blue-600'
                    : isNeural
                    ? 'bg-slate-950 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-700 text-cyan-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Box */}
                <div
                  className={`w-full pl-16 md:pl-0 ${
                    idx % 2 === 0
                      ? 'md:w-1/2 md:pr-12 md:text-right'
                      : 'md:w-1/2 md:ml-auto md:pl-12 md:text-left'
                  }`}
                >
                  <div className={`p-6 rounded-2xl border shadow-xl transition-all ${
                    isLight
                      ? 'bg-white/65 border-slate-200 backdrop-blur-xl'
                      : isNeural
                      ? 'bg-slate-950/45 border-emerald-900/50 backdrop-blur-xl'
                      : 'bg-slate-950/45 border-slate-700/60 backdrop-blur-xl'
                  }`}>
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-2 ${
                        idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold border ${
                        isLight
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-800 text-cyan-400 border-slate-700'
                      }`}>
                        {item.period}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 font-mono text-[11px] border border-slate-800">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold font-display group-hover:text-cyan-400 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm font-semibold mt-0.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {item.organization}
                    </p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </p>

                    <p className={`text-xs mt-3 leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
