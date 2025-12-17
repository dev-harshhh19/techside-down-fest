import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1 } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSrc = "/audio/bgsong.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-play on mount
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Browser may block autoplay, user will need to click play
          console.log('Autoplay blocked by browser');
        }
      }
    };
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolumeLevel = (level: number) => {
    setVolume(level);
    setIsMuted(false);
  };

  const VolumeIcon = isMuted || volume === 0 
    ? VolumeX 
    : volume < 0.5 
      ? Volume1 
      : Volume2;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-6 z-50 flex items-center gap-4 bg-card/90 backdrop-blur-sm px-5 py-3 rounded-full border border-border/50"
    >
      <audio ref={audioRef} src={audioSrc} loop />
      
      {/* Play/Pause Button - Circular outline style */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full border-2 border-primary/70 flex items-center justify-center hover:border-primary transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-primary" />
        ) : (
          <Play className="w-4 h-4 text-primary ml-0.5" />
        )}
      </button>

      {/* Volume Icon */}
      <button
        onClick={toggleMute}
        className="p-1 hover:opacity-80 transition-opacity"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Volume Dots */}
      <div className="flex gap-1.5 items-center">
        {[0.33, 0.66, 1].map((level) => (
          <button
            key={level}
            onClick={() => setVolumeLevel(level)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              volume >= level && !isMuted
                ? 'bg-muted-foreground'
                : 'bg-muted-foreground/30'
            }`}
            aria-label={`Set volume to ${Math.round(level * 100)}%`}
          />
        ))}
      </div>

      {/* PRESS PLAY Text */}
      <span className="text-sm text-muted-foreground font-medium tracking-widest">
        {isPlaying ? 'NOW PLAYING' : 'PRESS PLAY'}
      </span>

      {/* Register Button */}
      <a
        href="#events"
        className="ml-2 px-6 py-2.5 bg-destructive text-destructive-foreground font-semibold tracking-wider text-sm hover:bg-destructive/90 transition-colors rounded-sm"
      >
        REGISTER
      </a>
    </motion.div>
  );
};

export default AudioPlayer;
