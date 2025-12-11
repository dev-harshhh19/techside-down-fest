import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1 } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using a royalty-free synthwave track as placeholder
  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-card/90 backdrop-blur-sm p-3 rounded-lg neon-border"
    >
      <audio ref={audioRef} src={audioSrc} loop />
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors neon-box"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-primary" />
        ) : (
          <Play className="w-5 h-5 text-primary" />
        )}
      </button>

      {/* Volume Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-primary/20 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          <VolumeIcon className="w-4 h-4 text-foreground/70" />
        </button>

        {/* Volume Levels */}
        <div className="flex gap-1">
          {[0.25, 0.5, 0.75, 1].map((level) => (
            <button
              key={level}
              onClick={() => setVolumeLevel(level)}
              className={`w-2 h-6 rounded-sm transition-all ${
                volume >= level && !isMuted
                  ? 'bg-primary neon-box'
                  : 'bg-muted hover:bg-muted-foreground/30'
              }`}
              style={{ height: `${level * 24}px` }}
              aria-label={`Set volume to ${level * 100}%`}
            />
          ))}
        </div>
      </div>

      {/* Track Info */}
      <div className="hidden sm:block ml-2 text-xs text-muted-foreground font-stranger">
        {isPlaying ? (
          <span className="animate-pulse">♪ NOW PLAYING</span>
        ) : (
          <span>PRESS PLAY</span>
        )}
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
