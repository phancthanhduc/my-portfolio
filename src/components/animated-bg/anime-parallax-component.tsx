import { useRef, useState, useCallback } from 'react';

interface AnimeParallaxProps {
  className?: string;
}

/**
 * Anime/Cyberpunk Style Parallax Background
 * Features multiple depth layers with mouse-driven parallax effects
 */
export function AnimeParallaxComponent({ className = '' }: AnimeParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)' }}
    >
      {/* Layer 1: Far background - City silhouette */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* City skyline SVG */}
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M0,400 L0,300 L30,300 L30,250 L60,250 L60,320 L90,320 L90,220 L120,220 L120,350 L150,350 L150,280 L180,280 L180,200 L210,200 L210,320 L240,320 L240,260 L270,260 L270,300 L300,300 L300,180 L330,180 L330,280 L360,280 L360,240 L390,240 L390,310 L420,310 L420,200 L450,200 L450,290 L480,290 L480,220 L510,220 L510,330 L540,330 L540,260 L570,260 L570,300 L600,300 L600,190 L630,190 L630,280 L660,280 L660,230 L690,230 L690,310 L720,310 L720,250 L750,250 L750,290 L780,290 L780,210 L810,210 L810,320 L840,320 L840,270 L870,270 L870,300 L900,300 L900,240 L930,240 L930,310 L960,310 L960,260 L990,260 L990,330 L1020,330 L1020,280 L1050,280 L1050,200 L1080,200 L1080,340 L1110,340 L1110,290 L1140,290 L1140,320 L1170,320 L1170,300 L1200,300 L1200,400 Z"
            fill="rgba(6, 182, 212, 0.15)"
          />
        </svg>
      </div>

      {/* Layer 2: Mid background - Floating platforms */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Floating cyber platforms */}
        {[-10, 15, 40, 65, 85].map((left, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${left}%`,
              top: `${20 + (i % 3) * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <div
              className="w-24 h-3 border border-cyan-400/30 bg-cyan-400/5"
              style={{
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.1)',
              }}
            />
            <div
              className="w-1 h-8 mx-auto bg-gradient-to-b from-cyan-400/50 to-transparent"
            />
          </div>
        ))}
      </div>

      {/* Layer 3: Mid-foreground - Neon structures */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -25}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Large neon ring */}
        <div
          className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full border-2 border-pink-500/20 animate-spin-slow"
          style={{
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.2), inset 0 0 30px rgba(236, 72, 153, 0.1)',
          }}
        />
        {/* Floating data blocks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 border border-cyan-400/20 rounded"
            style={{
              left: `${15 + i * 12}%`,
              top: `${40 + (i % 2) * 25}%`,
              width: `${40 + (i % 3) * 20}px`,
              height: '24px',
              animationDelay: `${i * 0.3}s`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Layer 4: Foreground - Light streaks and particles */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * -80}px, ${mousePos.y * -40}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Vertical neon light strips */}
        <div className="absolute left-[5%] top-0 w-1 h-full bg-gradient-to-b from-cyan-400/20 via-pink-500/10 to-transparent" />
        <div className="absolute left-[25%] top-0 w-0.5 h-full bg-gradient-to-b from-pink-500/15 via-cyan-400/10 to-transparent" />
        <div className="absolute right-[15%] top-0 w-0.5 h-full bg-gradient-to-b from-cyan-400/10 via-pink-500/15 to-transparent" />
        <div className="absolute right-[35%] top-0 w-1 h-full bg-gradient-to-b from-pink-500/20 via-cyan-400/10 to-transparent" />

        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(236, 72, 153, 0.6)',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${2 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 5: Mouse follower glow */}
      <div
        className="pointer-events-none fixed rounded-full blur-3xl"
        style={{
          left: `calc(50% + ${mousePos.x * 300}px - 150px)`,
          top: `calc(50% + ${mousePos.y * 200}px - 150px)`,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
          opacity: mousePos.x !== 0 || mousePos.y !== 0 ? 0.8 : 0,
          transform: 'scale(1)',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
          backgroundSize: '100% 4px',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scanline"
          style={{ animation: 'scanline 10s linear infinite' }}
        />
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}

export default AnimeParallaxComponent;
