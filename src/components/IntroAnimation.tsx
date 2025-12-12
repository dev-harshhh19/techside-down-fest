import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Generate a vein path
const generateVeinPath = (startX: number, startY: number, length: number, direction: number) => {
  let path = `M ${startX} ${startY}`;
  let x = startX;
  let y = startY;
  
  for (let i = 0; i < length; i++) {
    const dx = Math.cos(direction) * (15 + Math.random() * 10);
    const dy = Math.sin(direction) * (15 + Math.random() * 10);
    direction += (Math.random() - 0.5) * 0.5;
    x += dx;
    y += dy;
    path += ` Q ${x - dx/2 + (Math.random() - 0.5) * 8} ${y - dy/2 + (Math.random() - 0.5) * 8} ${x} ${y}`;
  }
  
  return path;
};

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'zoom' | 'reveal' | 'subtitle' | 'fadeout'>('zoom');
  const title = "TECHXPRESSION";
  const subtitle = "THE TECHSIDE DOWN";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 500),
      setTimeout(() => setPhase('subtitle'), 4500),
      setTimeout(() => setPhase('fadeout'), 6500),
      setTimeout(() => onComplete(), 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Generate floating particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  // Generate Vecna veins
  const veins = useMemo(() => [
    { path: generateVeinPath(0, 200, 12, 0.3), delay: 0 },
    { path: generateVeinPath(0, 400, 15, 0.1), delay: 0.3 },
    { path: generateVeinPath(0, 600, 10, -0.2), delay: 0.6 },
    { path: generateVeinPath(window.innerWidth, 150, 14, Math.PI - 0.2), delay: 0.2 },
    { path: generateVeinPath(window.innerWidth, 350, 12, Math.PI + 0.1), delay: 0.5 },
    { path: generateVeinPath(window.innerWidth, 550, 11, Math.PI - 0.1), delay: 0.8 },
    { path: generateVeinPath(200, 0, 10, Math.PI / 2 + 0.2), delay: 0.4 },
    { path: generateVeinPath(window.innerWidth - 200, 0, 10, Math.PI / 2 - 0.2), delay: 0.7 },
  ], []);

  return (
    <AnimatePresence>
      {phase !== 'fadeout' ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Deep black gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
          
          {/* Atmospheric red fog */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 3 }}
          >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[300px] bg-red-800/10 blur-[80px] rounded-full" />
          </motion.div>

          {/* Floating particles/embers */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-red-500"
                style={{
                  left: `${particle.x}%`,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: '0 0 6px 2px rgba(239, 68, 68, 0.6)',
                }}
                initial={{ y: '100vh', opacity: 0 }}
                animate={{ 
                  y: '-100vh', 
                  opacity: [0, 0.8, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Vecna Veins */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
            <defs>
              <filter id="intro-vein-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {veins.map((vein, i) => (
              <motion.path
                key={i}
                d={vein.path}
                fill="none"
                stroke="rgba(220, 38, 38, 0.7)"
                strokeWidth="2"
                filter="url(#intro-vein-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase !== 'zoom' ? { 
                  pathLength: 1, 
                  opacity: [0, 0.8, 0.6, 0.8, 0.6],
                } : { pathLength: 0, opacity: 0 }}
                transition={{
                  pathLength: { duration: 3, delay: vein.delay, ease: "easeOut" },
                  opacity: { duration: 2, delay: vein.delay, repeat: Infinity, repeatType: "reverse" },
                }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.8))',
                }}
              />
            ))}
          </svg>

          {/* Main Title Container - Netflix-style zoom */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ 
              scale: phase === 'zoom' ? 0.3 : 1,
              opacity: phase === 'zoom' ? 0 : 1,
            }}
            transition={{ 
              duration: 4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Title with letter-by-letter reveal */}
            <h1 className="relative text-center">
              <span className="sr-only">{title}</span>
              <span className="flex justify-center tracking-[0.15em]" aria-hidden="true">
                {title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold"
                    style={{
                      fontFamily: "'EB Garamond', 'Times New Roman', serif",
                      color: 'transparent',
                      WebkitTextStroke: '1px #dc2626',
                      textShadow: `
                        0 0 20px rgba(220, 38, 38, 0.8),
                        0 0 40px rgba(220, 38, 38, 0.6),
                        0 0 60px rgba(220, 38, 38, 0.4),
                        0 0 80px rgba(220, 38, 38, 0.3),
                        0 0 120px rgba(220, 38, 38, 0.2)
                      `,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      phase !== 'zoom'
                        ? { 
                            opacity: 1, 
                            y: 0,
                          }
                        : { opacity: 0, y: 50 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                      ease: 'easeOut',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              
              {/* Glow layer behind text */}
              <motion.div
                className="absolute inset-0 flex justify-center tracking-[0.15em] blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase !== 'zoom' ? 0.6 : 0 }}
                transition={{ duration: 2 }}
                aria-hidden="true"
              >
                {title.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-red-600"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', serif" }}
                  >
                    {letter}
                  </span>
                ))}
              </motion.div>
            </h1>

            {/* Subtitle */}
            <motion.div
              className="mt-6 md:mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: phase === 'subtitle' ? 1 : 0,
                y: phase === 'subtitle' ? 0 : 20,
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.5em] uppercase"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: '#991b1b',
                  textShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                }}
              >
                {subtitle}
              </p>
            </motion.div>
          </motion.div>

          {/* Horizontal flickering lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-red-600/30"
              style={{ top: `${30 + i * 20}%` }}
              animate={{
                opacity: [0, 0.3, 0, 0.1, 0],
                scaleX: [0.8, 1, 0.9, 1, 0.8],
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 4 + i,
              }}
            />
          ))}

          {/* VHS scanlines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />

          {/* Film grain noise */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
