import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, RotateCw, Pause, Play, Info } from 'lucide-react';

const SkillsGlobe = ({ themeMode, onSelectSkill }) => {
  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skill items with custom colors and badges
  const skills = useMemo(() => [
    { name: 'Python', category: 'Backend & AI', icon: '🐍', color: '#38bdf8', level: 90, applied: 'Nagar Drishti' },
    { name: 'Flask', category: 'Backend', icon: '🌶️', color: '#2dd4bf', level: 90, applied: 'SmartPark & Nagar Drishti' },
    { name: 'MySQL', category: 'Database', icon: '🐬', color: '#0ea5e9', level: 86, applied: 'SmartPark Transactional DB' },
    { name: 'C++', category: 'Algorithms', icon: '⚡', color: '#818cf8', level: 88, applied: 'High Performance & STL' },
    { name: 'Computer Vision', category: 'AI & Systems', icon: '👁️', color: '#a855f7', level: 85, applied: 'Nagar Drishti Edge Sensing' },
    { name: 'GIS Mapping', category: 'Geospatial AI', icon: '🗺️', color: '#10b981', level: 84, applied: 'Nagar Drishti Dashboard' },
    { name: 'GPS Telemetry', category: 'IoT Systems', icon: '📡', color: '#34d399', level: 85, applied: 'Nagar Drishti Bus Probe' },
    { name: 'JavaScript', category: 'Frontend', icon: '💛', color: '#facc15', level: 86, applied: 'SmartPark Client UI' },
    { name: 'React.js', category: 'Frontend', level: 85, icon: '⚛️', color: '#38bdf8', applied: 'Portfolio & Dashboard' },
    { name: 'Git & GitHub', category: 'DevOps', icon: '🐙', color: '#f97316', level: 88, applied: 'Version Control & Repos' },
    { name: 'HTML5 & CSS3', category: 'Frontend', icon: '🌐', color: '#f43f5e', level: 92, applied: 'SmartPark Responsive UI' },
    { name: 'RESTful APIs', category: 'Backend', icon: '🔌', color: '#06b6d4', level: 89, applied: 'Flask Microservices' },
    { name: 'Linux / Bash', category: 'Systems', icon: '🐧', color: '#fb923c', level: 84, applied: 'Cloud Hosting & Render' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', color: '#38bdf8', level: 92, applied: 'Glassmorphic Design' },
    { name: 'Java', category: 'Core OOP', icon: '☕', color: '#ef4444', level: 80, applied: 'Academic Foundation' },
    { name: 'Database Indexing', category: 'Databases', icon: '🗄️', color: '#14b8a6', level: 85, applied: 'SmartPark Query Optimization' },
  ], []);

  // Compute 3D Fibonacci sphere distribution
  const sphereCoordinates = useMemo(() => {
    const N = skills.length;
    const radius = 220; // Sphere radius in px
    return skills.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return {
        ...skill,
        baseX: radius * Math.sin(phi) * Math.cos(theta),
        baseY: radius * Math.sin(phi) * Math.sin(theta),
        baseZ: radius * Math.cos(phi),
      };
    });
  }, [skills]);

  // Animation frame loop for smooth 3D rotation
  useEffect(() => {
    let animId;
    const update = () => {
      if (autoRotate && !isDragging && !hoveredSkill) {
        setRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.005,
        }));
      }
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate, isDragging, hoveredSkill]);

  // Mouse drag handlers to rotate sphere manually
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setRotation((prev) => ({
      x: Math.max(-1.2, Math.min(1.2, prev.x - dy * 0.005)),
      y: prev.y + dx * 0.005,
    }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePos.x;
    const dy = e.touches[0].clientY - lastMousePos.y;
    setRotation((prev) => ({
      x: Math.max(-1.2, Math.min(1.2, prev.x - dy * 0.006)),
      y: prev.y + dx * 0.006,
    }));
    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // Calculate projected positions of each skill item
  const projectedSkills = useMemo(() => {
    const { x: rotX, y: rotY } = rotation;
    const fov = 460; // Camera distance / perspective

    return sphereCoordinates.map((item) => {
      // Rotation around Y-axis
      const x1 = item.baseX * Math.cos(rotY) + item.baseZ * Math.sin(rotY);
      const z1 = -item.baseX * Math.sin(rotY) + item.baseZ * Math.cos(rotY);

      // Rotation around X-axis
      const y2 = item.baseY * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = item.baseY * Math.sin(rotX) + z1 * Math.cos(rotX);

      // Perspective projection
      const scale = fov / (fov - z2);
      const screenX = x1 * scale;
      const screenY = y2 * scale;

      // Depth based opacity and styling (front items brighter, back items faded)
      const depthAlpha = Math.max(0.2, Math.min(1, (z2 + 220) / 440));
      const zIndex = Math.round(z2 + 300);

      return {
        ...item,
        screenX,
        screenY,
        scale,
        depthAlpha,
        zIndex,
        isFront: z2 > 0,
      };
    });
  }, [sphereCoordinates, rotation]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      className="relative w-full h-[540px] sm:h-[620px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden"
    >
      {/* 3D Wireframe Cyber Globe Background (SVG Latitude/Longitude Rings) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="-250 -250 500 500"
          className="w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] opacity-25"
        >
          {/* Glowing Outer Horizon Ring */}
          <circle
            cx="0"
            cy="0"
            r="220"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Latitude Lines */}
          <ellipse
            cx="0"
            cy="0"
            rx="220"
            ry="60"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="0.8"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="220"
            ry="130"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="0.8"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="220"
            ry="190"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="0.8"
          />

          {/* Longitude Lines */}
          <ellipse
            cx="0"
            cy="0"
            rx="60"
            ry="220"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="0.8"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="130"
            ry="220"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="0.8"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="190"
            ry="220"
            fill="none"
            stroke={isNeural ? '#10b981' : '#38bdf8'}
            strokeWidth="0.8"
          />

          {/* Central Glowing Vortex Core */}
          <circle
            cx="0"
            cy="0"
            r="35"
            fill="url(#coreGlow)"
            opacity="0.8"
          />

          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isNeural ? '#34d399' : '#38bdf8'} stopOpacity="0.6" />
              <stop offset="100%" stopColor={isNeural ? '#064e3b' : '#0369a1'} stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute top-2 right-4 z-30 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAutoRotate(!autoRotate);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border backdrop-blur-md transition-all cursor-pointer ${
            isLight
              ? 'bg-white/80 border-slate-300 text-slate-800 hover:bg-white'
              : 'bg-slate-950/70 border-slate-700/80 text-slate-200 hover:border-slate-500'
          }`}
          title="Toggle Auto Rotation"
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{autoRotate ? 'Pause Orbit' : 'Auto Rotate'}</span>
        </button>

        <span className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2.5 py-1.5 rounded-xl border border-slate-800 hidden sm:inline">
          Drag to rotate 3D
        </span>
      </div>

      {/* Floating 3D Skill Nodes */}
      <div className="relative w-0 h-0">
        {projectedSkills.map((skill) => {
          const isSelected = hoveredSkill?.name === skill.name;

          return (
            <div
              key={skill.name}
              style={{
                transform: `translate3d(${skill.screenX}px, ${skill.screenY}px, 0px) scale(${skill.scale * (isSelected ? 1.15 : 1)})`,
                opacity: isSelected ? 1 : Math.max(0.28, skill.depthAlpha),
                zIndex: isSelected ? 999 : skill.zIndex,
                filter: skill.isFront ? 'none' : 'blur(0.8px)',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out, opacity 0.2s ease-out',
              }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectSkill) onSelectSkill(skill);
              }}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
            >
              {/* Skill Pill Card (Matches the uploaded design) */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border shadow-xl backdrop-blur-xl transition-all duration-200 ${
                  isLight
                    ? 'bg-white/90 text-slate-900 border-slate-300 shadow-slate-300/40 hover:border-blue-500 hover:scale-105'
                    : 'bg-slate-950/85 text-white border-slate-700/80 shadow-black/60 hover:border-cyan-400 hover:scale-105'
                }`}
                style={{
                  borderColor: isSelected ? skill.color : undefined,
                  boxShadow: isSelected ? `0 0 16px ${skill.color}55` : undefined,
                }}
              >
                {/* Tech Icon */}
                <span className="text-base select-none">{skill.icon}</span>

                {/* Tech Name */}
                <span className="text-xs font-display font-bold tracking-tight whitespace-nowrap">
                  {skill.name}
                </span>

                {/* Level Dot Indicator */}
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
              </div>

              {/* Tooltip on Hover */}
              {isSelected && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-2xl pointer-events-none z-50">
                  Applied in {skill.applied} ({skill.level}% proficiency)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsGlobe;
