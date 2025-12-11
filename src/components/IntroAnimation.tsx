import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'title' | 'subtitle' | 'fadeout'>('title');
  const [visibleLetters, setVisibleLetters] = useState(0);
  const title = "TECHXPRESSION";
  const subtitle = "TECHSIDE DOWN";

  useEffect(() => {
    if (phase === 'title' && visibleLetters < title.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'title' && visibleLetters >= title.length) {
      const timer = setTimeout(() => {
        setPhase('subtitle');
        setVisibleLetters(0);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (phase === 'subtitle' && visibleLetters < subtitle.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }

    if (phase === 'subtitle' && visibleLetters >= subtitle.length) {
      const timer = setTimeout(() => {
        setPhase('fadeout');
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'fadeout') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLetters, onComplete]);

  const showTitle = phase === 'title' || phase === 'subtitle' || phase === 'fadeout';
  const showSubtitle = phase === 'subtitle' || phase === 'fadeout';

  return (
    <AnimatePresence>
      {phase !== 'fadeout' ? (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Smoke/Fog Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl smoke-effect"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
              />
            ))}
          </div>

          {/* Scanlines Overlay */}
          <div className="absolute inset-0 scanlines opacity-30" />

          {/* Red Glow Vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary/20" />

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Title */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-stranger tracking-[0.3em] text-primary neon-text">
                {title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={
                      index < visibleLetters && showTitle
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: 20, filter: 'blur(10px)' }
                    }
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle */}
            {showSubtitle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-stranger tracking-[0.5em] text-foreground/80">
                  {subtitle.split('').map((letter, index) => {
                    const shouldShow = index < visibleLetters || showSubtitle;
                    return (
                      <motion.span
                        key={index}
                        className={`inline-block ${letter === ' ' ? 'mx-2' : ''}`}
                        initial={{ opacity: 0, rotateX: 180, y: -20 }}
                        animate={
                          shouldShow
                            ? { opacity: 1, rotateX: 0, y: 0 }
                            : { opacity: 0, rotateX: 180, y: -20 }
                        }
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    );
                  })}
                </h2>
              </motion.div>
            )}

            {/* Glitch Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0, 0.3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-primary/50" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary/30" />
              <div className="absolute top-3/4 left-0 right-0 h-[2px] bg-primary/40" />
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/50" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/50" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/50" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
