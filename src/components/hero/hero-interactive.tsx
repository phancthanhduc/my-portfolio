import { useRef, useState, useCallback } from 'react';

interface HeroProps {
  children?: React.ReactNode;
}

export function HeroInteractive({ children }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    }
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse follower glow */}
      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full blur-3xl transition-opacity duration-300"
        style={{
          left: isHovering ? `calc(50% + ${mousePos.x * 200}px - 192px)` : '50%',
          top: isHovering ? `calc(50% + ${mousePos.y * 150}px - 192px)` : '50%',
          opacity: isHovering ? 0.6 : 0,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
          transform: isHovering ? 'scale(1)' : 'scale(0.5)',
        }}
      />

      {/* Interactive grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(60deg) translateY(${mousePos.y * 30}px) translateZ(-50px)`,
        }}
      />

      {/* Floating particles */}
      {isHovering && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translate(${mousePos.x * (20 + i % 10)}px, ${mousePos.y * (20 + i % 10)}px)`,
              }}
            />
          ))}
        </>
      )}

      {/* Main content with parallax */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-5"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
          backgroundSize: '100% 4px',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scanline"
          style={{
            animation: 'scanline 8s linear infinite',
          }}
        />
      </div>
    </div>
  );
}

export default HeroInteractive;
