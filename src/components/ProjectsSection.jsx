import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Info, 
  CheckCircle2, 
  Radio, 
  Layers, 
  Database, 
  Cpu, 
  Award,
  ArrowUpRight
} from 'lucide-react';

const ProjectsSection = ({ onSelectProject, themeMode }) => {
  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const projects = [
    {
      id: 'smartpark',
      name: 'SmartPark',
      category: 'Smart Parking Management System',
      hackathon: 'Hack4Delhi Hackathon Project',
      image: '/images/smartpark.jpg',
      tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'MySQL'],
      demo: 'https://smartparking-project-2.onrender.com/',
      github: 'https://github.com/TechieAakash/SmartParking-Project',
      summary: 'A web-based parking management system for vehicle entry, slot allocation, and exit management.',
      points: [
        'Developed a web-based parking management system for vehicle entry, slot allocation, and exit management.',
        'Built Flask backend with MySQL database operations for parking slots, vehicles, users, and transactions.',
        'Developed as part of the Hack4Delhi Hackathon.',
      ],
      architecture: 'HTML5/JS Client ➔ Flask REST API Controllers ➔ MySQL ACID Storage & Slot Allocation',
      challenge: 'Manual urban parking allocation caused billing discrepancies, slow entry queues, and contractor limits violations.',
      solution: 'Engineered an automated full-stack platform managing real-time slot state tracking and transactional vehicle check-ins.',
    },
    {
      id: 'nagar-drishti',
      name: 'Nagar Drishti',
      category: 'AI-Powered Urban Intelligence & Traffic Monitoring System',
      hackathon: 'Smart India Hackathon (SIH) 2026 Solution',
      image: '/images/nagar-drishti.jpg',
      tech: ['Python', 'Computer Vision', 'GIS', 'GPS Tracking', 'Flask'],
      demo: 'https://nagar-drishti-urban-intelligence-platform.onrender.com/',
      github: 'https://github.com/TechieAakash',
      summary: 'Transforms public buses into mobile sensing units to detect potholes, damaged roads, traffic congestion, and road safety violations using AI and GPS.',
      points: [
        'Developed an AI-powered urban monitoring platform that transforms public buses into mobile sensing units to detect potholes, damaged roads, traffic congestion, waterlogging, and road safety violations using AI and GPS tracking.',
        'Designed a centralized GIS dashboard for real-time incident visualization, traffic analytics, infrastructure monitoring, and automated reporting to support smarter urban planning.',
        'Developed as a solution for Smart India Hackathon (SIH) 2026, focusing on AI-driven smart city infrastructure and intelligent traffic management.',
      ],
      architecture: 'Public Bus Edge Vision Sensor ➔ GPS Telemetry Stream ➔ Flask Analytics Service ➔ Centralized GIS Incident Heatmap',
      challenge: 'Manual road and traffic safety audits are expensive and infrequent, causing hazardous road conditions to persist for months.',
      solution: 'Crowdsources civic intelligence by converting standard public transit fleets into dynamic AI-powered scanning probes.',
    },
  ];

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border font-mono text-xs uppercase tracking-wider mb-4 ${
            isNeural
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              : isLight
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-slate-900 border-slate-800 text-cyan-400'
          }`}>
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Flagship Engineering Systems
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Featured Solutions
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Engineered for real-world impact: transactional database systems, computer vision at the edge, and geospatial intelligence.
          </p>
        </div>

        {/* 2 Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`rounded-3xl border overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between group ${
                isLight
                  ? 'bg-white/65 border-slate-200 hover:border-blue-400 shadow-slate-200/50 backdrop-blur-xl'
                  : isNeural
                  ? 'bg-slate-950/45 border-emerald-900/50 hover:border-emerald-500/60 backdrop-blur-xl shadow-emerald-950/20'
                  : 'bg-slate-950/45 border-slate-700/60 hover:border-cyan-500/60 backdrop-blur-xl shadow-black/50'
              }`}
            >
              {/* Visual Image Header with Animated Floating Ken Burns Effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold backdrop-blur-md border shadow-lg ${
                    project.id === 'smartpark'
                      ? 'bg-cyan-950/90 border-cyan-500/40 text-cyan-300'
                      : 'bg-purple-950/90 border-purple-500/40 text-purple-300'
                  }`}>
                    {project.hackathon}
                  </span>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live
                  </span>
                </div>

                {/* Bottom Image Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-medium font-mono mt-0.5">
                    {project.category}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                {/* Bullet Points */}
                <div className="space-y-3">
                  {project.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono border ${
                        project.id === 'smartpark'
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                          : 'bg-purple-950 text-purple-400 border-purple-500/40'
                      }`}>
                        ✓
                      </span>
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider block mb-2 font-semibold ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border shadow-sm ${
                          isLight
                            ? 'bg-slate-100 text-slate-800 border-slate-200'
                            : isNeural
                            ? 'bg-slate-950 text-emerald-300 border-emerald-900/60'
                            : 'bg-slate-950 text-cyan-300 border-slate-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 min-w-[140px] px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                      project.id === 'smartpark'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/20'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-3 rounded-xl font-display text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>Repo</span>
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className={`px-4 py-3 rounded-xl font-mono text-xs sm:text-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isLight
                        ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>Deep Dive</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
