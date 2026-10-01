import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Wand2, Volume2, VolumeX, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { BatBabeGhost, BatBabeGhostType } from './BatBabeGhostSprites';
import { soundManager } from '../../lib/sound';

interface FairyEntity {
  id: string;
  type: BatBabeGhostType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  speed: number;
  phase: number;
  scale: number;
  facing: 1 | -1;
  tilt: number;
  spinAngle: number;
  isSpinning: boolean;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  maxLife: number;
  life: number;
}

const FAIRY_QUOTES = [
  '✨ Wingardium Leviosa!',
  '🦇 Bat Babe Magic!',
  '🪄 Lumos Fairy Glow!',
  '💜 Spooky & Chic!',
  '✨ Fairy Dust!',
  '🎃 Peek-a-boo!',
  '⭐ Mischief Managed!',
  '💖 Spooky Sweet!'
];

const GHOST_TYPES: { id: BatBabeGhostType; label: string; desc: string }[] = [
  { id: 'witch', label: 'Witch Babe Ghost', desc: 'Witch hat & red lipstick smile' },
  { id: 'scarf', label: 'Scarf Babe Ghost', desc: 'Halloween striped scarf & mini bats' },
  { id: 'cocktail', label: 'Cocktail Babe Ghost', desc: 'Nerdy glasses, bow & spooky drink' },
  { id: 'purple-hair', label: 'Purple Glam Ghost', desc: 'Flowing violet hair & bat clips' },
  { id: 'bat-bow', label: 'Bat-Bow Babe Ghost', desc: 'Oversized bat pattern ribbon bows' },
  { id: 'goth', label: 'Goth Siren Ghost', desc: 'Horns, winged eyeliner & dark gown' },
];

export const FloatingBatFairy: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | BatBabeGhostType>('all');
  const [fairyCount, setFairyCount] = useState<number>(2); // Default to 2 for optimal speed
  const [activeQuotes, setActiveQuotes] = useState<Record<string, string>>({});

  const fairiesListState = useRef<FairyEntity[]>([]);
  const fairyDomElements = useRef<Map<string, HTMLDivElement>>(new Map());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const particlesRef = useRef<SparkleParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Sync state for rendering the elements in React only when list structure changes
  const [renderedFairies, setRenderedFairies] = useState<FairyEntity[]>([]);

  // Initialize or re-create fairies
  const initFairies = useCallback((count: number, filter: 'all' | BatBabeGhostType) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    const newFairies: FairyEntity[] = [];
    const types: BatBabeGhostType[] = ['witch', 'scarf', 'cocktail', 'purple-hair', 'bat-bow', 'goth'];

    for (let i = 0; i < count; i++) {
      const type = filter === 'all' ? types[i % types.length] : filter;
      newFairies.push({
        id: `fairy-${i}`,
        type,
        x: Math.random() * (width - 150) + 75,
        y: Math.random() * (height - 200) + 100,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        targetX: Math.random() * (width - 150) + 75,
        targetY: Math.random() * (height - 200) + 100,
        speed: 1.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        scale: 0.85 + Math.random() * 0.2,
        facing: Math.random() > 0.5 ? 1 : -1,
        tilt: 0,
        spinAngle: 0,
        isSpinning: false,
      });
    }

    fairiesListState.current = newFairies;
    setRenderedFairies(newFairies);
  }, []);

  // Sync when count or filter changes
  useEffect(() => {
    if (isEnabled) {
      initFairies(fairyCount, selectedTypeFilter);
    } else {
      setRenderedFairies([]);
      fairiesListState.current = [];
    }
  }, [isEnabled, fairyCount, selectedTypeFilter, initFairies]);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // High-Performance Hardware Accelerated Animation Loop (NO React setState inside!)
  useEffect(() => {
    if (!isEnabled) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    let frameCounter = 0;
    const fairySparkleColors = ['#FDE047', '#E879F9', '#38BDF8', '#F43F5E', '#A78BFA'];

    const animate = (currentTime: number) => {
      // Pause if tab is not focused to conserve battery & CPU
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      frameCounter++;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update Fairy Positions directly via DOM transform (0ms React overhead!)
      const fairies = fairiesListState.current;
      for (let i = 0; i < fairies.length; i++) {
        const fairy = fairies[i];

        // Pick new wandering target periodically
        const distToTarget = Math.hypot(fairy.targetX - fairy.x, fairy.targetY - fairy.y);
        if (distToTarget < 60 || Math.random() < 0.005) {
          fairy.targetX = Math.random() * (width - 180) + 90;
          fairy.targetY = Math.random() * (height - 200) + 100;
        }

        // Steer towards target smoothly
        const angle = Math.atan2(fairy.targetY - fairy.y, fairy.targetX - fairy.x);
        const desiredVx = Math.cos(angle) * fairy.speed * 50;
        const desiredVy = Math.sin(angle) * fairy.speed * 50;

        fairy.vx += (desiredVx - fairy.vx) * 0.035;
        fairy.vy += (desiredVy - fairy.vy) * 0.035;

        // Interactive mouse dodge / curiosity
        const distToMouse = Math.hypot(fairy.x - mousePos.current.x, fairy.y - mousePos.current.y);
        if (distToMouse < 90) {
          const repelAngle = Math.atan2(fairy.y - mousePos.current.y, fairy.x - mousePos.current.x);
          fairy.vx += Math.cos(repelAngle) * 30;
          fairy.vy += Math.sin(repelAngle) * 30;
        }

        // Gentle sinusoidal wave bobbing
        const bob = Math.sin(currentTime * 0.0035 + fairy.phase) * 1.2;

        fairy.x += (fairy.vx + bob * 0.4) * dt;
        fairy.y += (fairy.vy + bob) * dt;

        // Boundaries
        if (fairy.x < 20) { fairy.x = 20; fairy.vx = Math.abs(fairy.vx) * 0.7; }
        if (fairy.x > width - 100) { fairy.x = width - 100; fairy.vx = -Math.abs(fairy.vx) * 0.7; }
        if (fairy.y < 30) { fairy.y = 30; fairy.vy = Math.abs(fairy.vy) * 0.7; }
        if (fairy.y > height - 120) { fairy.y = height - 120; fairy.vy = -Math.abs(fairy.vy) * 0.7; }

        if (fairy.vx > 0.5) fairy.facing = 1;
        else if (fairy.vx < -0.5) fairy.facing = -1;

        const targetTilt = Math.max(-18, Math.min(18, fairy.vx * 0.35 + fairy.vy * 0.15));
        fairy.tilt += (targetTilt - fairy.tilt) * 0.1;

        if (fairy.isSpinning) {
          fairy.spinAngle += 720 * dt;
          if (fairy.spinAngle >= 360) {
            fairy.spinAngle = 0;
            fairy.isSpinning = false;
          }
        }

        // Direct DOM update: Blazing fast GPU transform without re-rendering React!
        const el = fairyDomElements.current.get(fairy.id);
        if (el) {
          el.style.transform = `translate3d(${fairy.x}px, ${fairy.y}px, 0) scale(${fairy.scale}) scaleX(${fairy.facing}) rotate(${fairy.tilt + fairy.spinAngle}deg)`;
        }

        // Spawn sparkle particles (throttled to avoid overhead)
        if (showTrails && frameCounter % 4 === 0 && particlesRef.current.length < 25) {
          particlesRef.current.push({
            x: fairy.x + 44 + (Math.random() - 0.5) * 16,
            y: fairy.y + 44 + (Math.random() - 0.5) * 16,
            vx: (Math.random() - 0.5) * 0.8 - fairy.vx * 0.1,
            vy: (Math.random() - 0.5) * 0.8 + 0.6,
            size: 2 + Math.random() * 3,
            alpha: 0.85,
            color: fairySparkleColors[Math.floor(Math.random() * fairySparkleColors.length)],
            maxLife: 0.6 + Math.random() * 0.3,
            life: 0,
          });
        }
      }

      // Render Sparkles onto lightweight Canvas
      const canvas = canvasRef.current;
      if (canvas && showTrails) {
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);

          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.life += dt;
            if (p.life >= p.maxLife) {
              particlesRef.current.splice(i, 1);
              continue;
            }

            p.x += p.vx;
            p.y += p.vy;
            const progress = p.life / p.maxLife;
            const currentAlpha = p.alpha * (1 - progress);

            ctx.save();
            ctx.globalAlpha = currentAlpha;
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            const r = p.size;
            ctx.beginPath();
            ctx.moveTo(0, -r);
            ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.quadraticCurveTo(0, 0, 0, r);
            ctx.quadraticCurveTo(0, 0, -r, 0);
            ctx.quadraticCurveTo(0, 0, 0, -r);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isEnabled, showTrails]);

  // Click on a fairy -> fairy loop-de-loop spin, star confetti, sound chime, quote bubble!
  const handleFairyClick = (fairyId: string) => {
    const fairy = fairiesListState.current.find((f) => f.id === fairyId);
    if (!fairy) return;

    fairy.isSpinning = true;
    fairy.spinAngle = 0;

    const randomQuote = FAIRY_QUOTES[Math.floor(Math.random() * FAIRY_QUOTES.length)];
    setActiveQuotes((prev) => ({ ...prev, [fairyId]: randomQuote }));

    setTimeout(() => {
      setActiveQuotes((prev) => {
        const next = { ...prev };
        delete next[fairyId];
        return next;
      });
    }, 2800);

    if (soundEnabled) {
      soundManager.playFairySparkle();
    }

    const normX = (fairy.x + 44) / window.innerWidth;
    const normY = (fairy.y + 44) / window.innerHeight;

    confetti({
      particleCount: 16,
      spread: 50,
      startVelocity: 16,
      origin: { x: normX, y: normY },
      colors: ['#FDE047', '#E879F9', '#38BDF8', '#F43F5E', '#A78BFA'],
      shapes: ['star', 'circle'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  };

  // Summon Swarm button
  const handleSummonSwarm = () => {
    if (!isEnabled) setIsEnabled(true);
    setFairyCount(4);
    setSelectedTypeFilter('all');

    if (soundEnabled) {
      soundManager.playFairySparkle();
    }

    confetti({
      particleCount: 35,
      spread: 75,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FDE047', '#E879F9', '#38BDF8', '#F43F5E', '#A78BFA'],
      shapes: ['star', 'circle'],
      zIndex: 9999,
    });
  };

  return (
    <>
      {/* Canvas for Fairy Dust Sparkle Trails */}
      {isEnabled && showTrails && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 will-change-transform"
          style={{ width: '100vw', height: '100vh' }}
        />
      )}

      {/* Floating Fairy Entities Layer */}
      {isEnabled && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {renderedFairies.map((fairy) => (
            <div
              key={fairy.id}
              ref={(el) => {
                if (el) fairyDomElements.current.set(fairy.id, el);
                else fairyDomElements.current.delete(fairy.id);
              }}
              onClick={() => handleFairyClick(fairy.id)}
              className="absolute top-0 left-0 pointer-events-auto cursor-pointer select-none will-change-transform group"
              style={{
                transform: `translate3d(${fairy.x}px, ${fairy.y}px, 0) scale(${fairy.scale})`,
              }}
              title="Click the Bat Babe Ghost for fairy magic!"
            >
              {/* Whimsical Speech Bubble */}
              {activeQuotes[fairy.id] && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-950/90 border border-purple-500/60 shadow-lg shadow-purple-950/60 text-[11px] font-mono text-purple-200 animate-in fade-in duration-150 pointer-events-none z-50 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                  <span>{activeQuotes[fairy.id]}</span>
                </div>
              )}

              {/* Bat Babe Ghost SVG Character Sprite */}
              <div className="relative hover:scale-105 active:scale-95 transition-transform duration-100">
                <BatBabeGhost type={fairy.type} size={82} isFlapping={true} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Fairy Magic Controller (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
        {/* Expanded Panel */}
        {isControlsOpen && (
          <div className="w-72 bg-slate-950/95 backdrop-blur-xl border border-purple-900/60 rounded-2xl p-4 shadow-2xl shadow-purple-950/50 text-slate-100 space-y-3.5 animate-in slide-in-from-bottom-2 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Wand2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Bat Babe Fairies</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950 border border-purple-800 text-purple-300">
                      Harry Potter Flight
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400">Whimsical flying ghosts with fairy trails</p>
                </div>
              </div>

              <button
                onClick={() => setIsControlsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Active Switch */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                {isEnabled ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                <span>Fly Across Website</span>
              </span>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isEnabled ? 'bg-purple-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Fairy Trails Toggle */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Pixie Dust Trails</span>
              </span>
              <button
                onClick={() => setShowTrails(!showTrails)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border transition-colors ${
                  showTrails
                    ? 'bg-purple-950 border-purple-700 text-purple-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                {showTrails ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Sound Chimes Toggle */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                <span>Sound Chimes</span>
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border transition-colors ${
                  soundEnabled
                    ? 'bg-cyan-950 border-cyan-700 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Ghost Count Selector */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span>Fairies on Screen:</span>
                <span className="font-mono text-purple-300 font-bold">{fairyCount} Ghosts</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setFairyCount(num);
                      if (!isEnabled) setIsEnabled(true);
                    }}
                    className={`py-1 text-xs font-mono font-bold rounded-lg border transition-colors ${
                      fairyCount === num
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Character Selection */}
            <div>
              <div className="text-[11px] text-slate-400 mb-1.5">Select Bat Babe Style:</div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedTypeFilter('all')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-medium border text-left truncate transition-colors ${
                    selectedTypeFilter === 'all'
                      ? 'bg-purple-950 border-purple-500 text-purple-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🌈 All 6 Clipart Babes
                </button>
                {GHOST_TYPES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedTypeFilter(g.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-medium border text-left truncate transition-colors ${
                      selectedTypeFilter === g.id
                        ? 'bg-purple-950 border-purple-500 text-purple-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={g.desc}
                  >
                    🦇 {g.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Summon Swarm CTA */}
            <button
              onClick={handleSummonSwarm}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-950/60 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
              <span>Summon Fairy Swarm</span>
            </button>
          </div>
        )}

        {/* Compact Toggle Button Pill */}
        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md border border-purple-800/60 rounded-full p-1.5 shadow-xl shadow-purple-950/40 text-xs">
          <button
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-slate-900 text-purple-200 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-bold flex items-center gap-1">
              <span>🪄 Bat Babe Fairies</span>
              <span className="text-[10px] text-purple-300 font-mono">({isEnabled ? 'Active' : 'Off'})</span>
            </span>
            {isControlsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`p-1.5 rounded-full transition-colors ${
              isEnabled ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
            title={isEnabled ? 'Pause Fairies' : 'Start Fairy Flight'}
          >
            {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
};
