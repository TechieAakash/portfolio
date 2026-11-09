import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Zap, Database, Cpu, Award } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl z-10 p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                  {project.hackathon}
                </span>
                <span className="text-xs text-slate-400 font-mono">SWE Flagship Project</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{project.name}</h2>
              <p className="text-sm text-cyan-300 font-medium mt-0.5">{project.category}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          {/* Key Points */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider">
              Project Highlights:
            </h3>
            <div className="space-y-2.5">
              {project.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">The Challenge:</span>
              <p className="text-xs text-slate-300 leading-relaxed">{project.challenge}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Engineered Solution:</span>
              <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Architecture Details */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase block mb-1">
              Architecture & Data Flow:
            </span>
            <p className="text-xs font-mono text-cyan-300">{project.architecture}</p>
          </div>

          {/* Tech Arsenal */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase block mb-2">Technologies Used:</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Live Application
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
