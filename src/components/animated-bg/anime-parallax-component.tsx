import { useRef, useState, useCallback } from 'react';

interface AnimeParallaxProps {
  className?: string;
}

/**
 * Dark Premium Style Parallax Background
 * Features subtle gradient and minimal mouse-driven parallax effects
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
      style={{ background: 'linear-gradient(180deg, #2a2a2a 0%, #383838 50%, #2a2a2a 100%)' }}
    >
      {/* Layer 1: Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 5}px)`,
          transition: 'transform 0.4s ease-out',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Layer 2: Subtle floating elements */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Subtle yellow accent lines */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#fbbf24]/10 to-transparent"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 15}%`,
              width: '15%',
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Subtle particles */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -12}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Minimal floating particles - yellow and slate */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              background: Math.random() > 0.5 ? 'rgba(251, 191, 36, 0.3)' : 'rgba(161, 161, 170, 0.3)',
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 4}s`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Very subtle glow */}
      <div
        className="pointer-events-none fixed rounded-full blur-3xl"
        style={{
          left: `calc(50% + ${mousePos.x * 200}px - 150px)`,
          top: `calc(50% + ${mousePos.y * 150}px - 150px)`,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(161, 161, 170, 0.08) 50%, transparent 70%)',
          opacity: mousePos.x !== 0 || mousePos.y !== 0 ? 0.5 : 0,
          transform: 'scale(1)',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Vignette effect - subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </div>
  );
}

export default AnimeParallaxComponent;
