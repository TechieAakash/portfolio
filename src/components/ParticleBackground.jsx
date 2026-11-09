import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ themeMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = themeMode === 'neural' 
      ? Math.min(Math.floor((width * height) / 14000), 75)
      : Math.min(Math.floor((width * height) / 18000), 55);
      
    const particles = [];

    const mouse = {
      x: null,
      y: null,
      radius: themeMode === 'neural' ? 180 : 140,
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    for (let i = 0; i < particleCount; i++) {
      let color;
      if (themeMode === 'neural') {
        color = i % 3 === 0 
          ? 'rgba(16, 185, 129, ' // emerald matrix
          : i % 3 === 1 
          ? 'rgba(168, 85, 247, ' // neon violet
          : 'rgba(20, 184, 166, '; // teal
      } else if (themeMode === 'light') {
        color = i % 3 === 0 
          ? 'rgba(14, 165, 233, ' // sky blue
          : i % 3 === 1 
          ? 'rgba(99, 102, 241, ' // indigo
          : 'rgba(56, 189, 248, ';
      } else {
        // dark
        color = i % 3 === 0 
          ? 'rgba(56, 189, 248, ' // cyan
          : i % 3 === 1 
          ? 'rgba(129, 140, 248, ' // indigo
          : 'rgba(168, 85, 247, '; // purple
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (themeMode === 'neural' ? 0.8 : 0.5),
        vy: (Math.random() - 0.5) * (themeMode === 'neural' ? 0.8 : 0.5),
        size: Math.random() * (themeMode === 'neural' ? 2.5 : 2) + 1,
        color,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        let alpha = p.baseAlpha;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            alpha = Math.min(1, alpha + (1 - dist / mouse.radius) * 0.7);
            p.x -= (dx / dist) * 0.9;
            p.y -= (dy / dist) * 0.9;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        // Connect nearby particles like neural synapses
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = themeMode === 'neural' ? 130 : 100;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (themeMode === 'neural' ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = themeMode === 'neural'
              ? `rgba(52, 211, 153, ${lineAlpha})`
              : themeMode === 'light'
              ? `rgba(14, 165, 233, ${lineAlpha})`
              : `rgba(125, 211, 252, ${lineAlpha})`;
            ctx.lineWidth = themeMode === 'neural' ? 0.9 : 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
};

export default ParticleBackground;
