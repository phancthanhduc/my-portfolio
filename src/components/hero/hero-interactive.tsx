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
      {/* Mouse follower glow - subtle gold */}
      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full blur-3xl transition-opacity duration-300"
        style={{
          left: isHovering ? `calc(50% + ${mousePos.x * 200}px - 192px)` : '50%',
          top: isHovering ? `calc(50% + ${mousePos.y * 150}px - 192px)` : '50%',
          opacity: isHovering ? 0.3 : 0,
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, rgba(100, 116, 139, 0.15) 50%, transparent 70%)',
          transform: isHovering ? 'scale(1)' : 'scale(0.5)',
        }}
      />

      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 165, 116, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles - subtle gold */}
      {isHovering && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#fbbf24] rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translate(${mousePos.x * (10 + i % 10)}px, ${mousePos.y * (10 + i % 10)}px)`,
              }}
            />
          ))}
        </>
      )}

      {/* Main content with parallax */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default HeroInteractive;
