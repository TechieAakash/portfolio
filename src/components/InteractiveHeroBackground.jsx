import React, { useEffect, useRef } from 'react';

const InteractiveHeroBackground = ({ themeMode }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isNeural = themeMode === 'neural';
  const isLight = themeMode === 'light';

  const bgImage = isNeural 
    ? '/images/neural-bg.jpg' 
    : '/images/systems-hero-backdrop.jpg';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates relative to canvas
    const mouse = {
      x: width * 0.75,
      y: height * 0.45,
      targetX: width * 0.75,
      targetY: height * 0.45,
      active: false,
      radius: 180,
      ripples: []
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.ripples.push({
        x,
        y,
        radius: 10,
        maxRadius: 180,
        alpha: 0.8
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    // Palette definition
    const colors = isNeural
      ? {
          primary: 'rgba(16, 185, 129, ', // emerald
          secondary: 'rgba(20, 184, 166, ', // teal
          accent: 'rgba(168, 85, 247, ', // neon purple
          line: 'rgba(52, 211, 153, ',
          text: 'rgba(167, 243, 208, '
        }
      : isLight
      ? {
          primary: 'rgba(2, 132, 199, ', // sky
          secondary: 'rgba(79, 70, 229, ', // indigo
          accent: 'rgba(14, 165, 233, ',
          line: 'rgba(56, 189, 248, ',
          text: 'rgba(30, 41, 59, '
        }
      : {
          primary: 'rgba(6, 182, 212, ', // cyan
          secondary: 'rgba(59, 130, 246, ', // blue
          accent: 'rgba(139, 92, 246, ', // violet
          line: 'rgba(56, 189, 248, ',
          text: 'rgba(186, 230, 253, '
        };

    // System Architecture Nodes
    const nodeLabels = [
      { name: 'API Gateway', sub: 'REST / gRPC' },
      { name: 'C++ Engine', sub: 'Low Latency' },
      { name: 'Python Core', sub: 'Flask / Asynchronous' },
      { name: 'MySQL Cluster', sub: 'MVCC Locking' },
      { name: 'Spatial GIS', sub: 'GeoJSON Topology' },
      { name: 'Computer Vision', sub: 'Real-time Inference' },
      { name: 'Redis Cache', sub: 'In-Memory Pipeline' },
      { name: 'Task Queue', sub: 'Distributed Stream' },
    ];

    const nodes = nodeLabels.map((lbl, idx) => {
      // Distribute nodes visually across the canvas
      const angle = (idx / nodeLabels.length) * Math.PI * 2;
      const dist = Math.min(width, height) * 0.35;
      return {
        x: width * 0.5 + Math.cos(angle) * dist + (Math.random() - 0.5) * 80,
        y: height * 0.5 + Math.sin(angle) * dist * 0.7 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 4.5,
        label: lbl.name,
        sub: lbl.sub,
        ping: Math.random() * 100,
        colorIndex: idx % 3
      };
    });

    // Code & High-Performance Tokens floating in space
    const codeTokens = [
      'std::vector<Transaction>',
      'SELECT ... FOR UPDATE',
      'O(1) Hash Table',
      'Flask HTTP 200 (1.1ms)',
      'cv2.dnn.forward()',
      'ST_DWithin(geom, 50m)',
      'thread_pool.submit()',
      'B-Tree Index Scan',
      'CUDA Kernel [256x]',
      'Atomic Compare-And-Swap',
      'gRPC Channel Active',
      'GeoSpatial R-Tree'
    ];

    const floatingTokens = codeTokens.map((text, i) => ({
      text,
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.25 + 0.15),
      vx: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.28 + 0.12,
      size: Math.random() * 2 + 10.5
    }));

    // Data packets travelling between nodes
    const packets = [];
    for (let i = 0; i < 18; i++) {
      packets.push({
        sourceIdx: Math.floor(Math.random() * nodes.length),
        targetIdx: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: Math.random() * 0.007 + 0.004
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Draw floating code & telemetry tokens
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      floatingTokens.forEach((tok) => {
        tok.y += tok.vy;
        tok.x += tok.vx;

        if (tok.y < -20) {
          tok.y = height + 20;
          tok.x = Math.random() * width;
        }
        if (tok.x < 0) tok.x = width;
        if (tok.x > width) tok.x = 0;

        ctx.font = `${tok.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `${colors.text}${isLight ? tok.alpha * 0.5 : tok.alpha})`;
        ctx.fillText(tok.text, tok.x, tok.y);
      });

      // 2. Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = Math.min(width, height) * 0.5;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isLight ? 0.15 : 0.28);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${colors.line}${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 6]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 3. Draw travelling data packets along node edges
      packets.forEach((pkt) => {
        if (pkt.sourceIdx === pkt.targetIdx) {
          pkt.targetIdx = (pkt.sourceIdx + 1) % nodes.length;
        }
        const src = nodes[pkt.sourceIdx];
        const tgt = nodes[pkt.targetIdx];

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.sourceIdx = pkt.targetIdx;
          pkt.targetIdx = Math.floor(Math.random() * nodes.length);
        }

        const px = src.x + (tgt.x - src.x) * pkt.progress;
        const py = src.y + (tgt.y - src.y) * pkt.progress;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isNeural ? '#10b981' : isLight ? '#0284c7' : '#38bdf8';
        ctx.shadowColor = isNeural ? '#10b981' : '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Update and draw nodes
      nodes.forEach((node) => {
        // Move with drift
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently inside padding
        const pad = 60;
        if (node.x < pad || node.x > width - pad) node.vx *= -1;
        if (node.y < pad || node.y > height - pad) node.vy *= -1;

        // Mouse interactive attraction & tether
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const force = (1 - mdist / mouse.radius) * 0.6;
          node.x += (mdx / mdist) * force;
          node.y += (mdy / mdist) * force;

          // Connect cursor to node
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `${colors.accent}${(1 - mdist / mouse.radius) * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Periodic pulsing ring
        node.ping = (node.ping + 0.4) % 60;
        const pingRadius = node.radius + (node.ping / 60) * 16;
        const pingAlpha = Math.max(0, 1 - node.ping / 60) * 0.4;

        ctx.beginPath();
        ctx.arc(node.x, node.y, pingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${colors.primary}${pingAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node Core Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNeural ? '#10b981' : isLight ? '#0284c7' : '#06b6d4';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Labels (Subtle & High-tech)
        ctx.font = `600 11px 'JetBrains Mono', monospace`;
        ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
        ctx.fillText(node.label, node.x + 10, node.y - 2);

        ctx.font = `500 9px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `${colors.primary}0.85)`;
        ctx.fillText(node.sub, node.x + 10, node.y + 10);
      });

      // 5. Draw Interactive Ripples on Click
      for (let r = mouse.ripples.length - 1; r >= 0; r--) {
        const rip = mouse.ripples[r];
        rip.radius += 3.5;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${colors.accent}${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          mouse.ripples.splice(r, 1);
        }
      }

      // 6. Draw Subtle Mouse Pointer Halo
      if (mouse.active) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          120
        );
        grad.addColorStop(0, `${colors.primary}${isLight ? '0.12' : '0.18'})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode, isNeural, isLight]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto overflow-hidden select-none"
    >
      {/* Photorealistic & Cybernetic Genre Background Backdrop Image */}
      <img
        src={bgImage}
        alt="High-Performance Systems & Software Engineering Architecture"
        className={`w-full h-full object-cover object-center animate-kenburns transition-opacity duration-1000 ${
          isLight
            ? 'opacity-20 filter contrast-110 brightness-110'
            : isNeural
            ? 'opacity-40 filter contrast-125'
            : 'opacity-45 filter contrast-125'
        }`}
      />

      {/* Cyber Grid Coordinates & Horizon Scan Lines */}
      <div
        className={`absolute inset-0 pointer-events-none cyber-grid ${
          isLight ? 'opacity-15' : 'opacity-25'
        }`}
      />

      {/* Dynamic Multi-stop Radial Lighting & Vignette Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
          isLight
            ? 'bg-gradient-to-b from-slate-50/85 via-slate-50/60 to-slate-50/95'
            : isNeural
            ? 'bg-gradient-to-b from-[#030712]/85 via-[#030712]/55 to-[#030712]/95'
            : 'bg-gradient-to-b from-[#020617]/85 via-[#020617]/55 to-[#020617]/95'
        }`}
      />

      {/* Dual Radiant Ambient Spotlights */}
      <div
        className={`absolute top-1/4 right-1/4 w-[600px] h-[450px] rounded-full blur-[140px] pointer-events-none ${
          isNeural
            ? 'bg-emerald-500/20'
            : isLight
            ? 'bg-blue-400/15'
            : 'bg-cyan-500/18'
        }`}
      />
      <div
        className={`absolute bottom-1/4 left-1/5 w-[500px] h-[400px] rounded-full blur-[130px] pointer-events-none ${
          isNeural
            ? 'bg-purple-600/15'
            : isLight
            ? 'bg-indigo-400/12'
            : 'bg-indigo-600/18'
        }`}
      />

      {/* High-Performance Interactive HTML5 Canvas (Nodes, Pulses, Connections, Code Tokens) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full cursor-crosshair"
      />
    </div>
  );
};

export default InteractiveHeroBackground;