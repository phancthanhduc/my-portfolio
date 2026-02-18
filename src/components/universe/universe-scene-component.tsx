import { useRef, useCallback, useState } from 'react';

interface UniverseSceneProps {
  className?: string;
}

// Static star component
function Star({ x, y, size, opacity, delay }: { x: number; y: number; size: number; opacity: number; delay: number }) {
  return (
    <div
      className="absolute bg-white rounded-full animate-pulse"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// Generate random stars
function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.6 + 0.3,
    delay: Math.random() * 4,
  }));
}

export function UniverseSceneComponent({
  className = '',
}: UniverseSceneProps) {
  const [stars] = useState(() => generateStars(50));
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 5;
    const y = (e.clientY / window.innerHeight - 0.5) * 5;
    containerRef.current?.style.setProperty('--px', `${x}px`);
    containerRef.current?.style.setProperty('--py', `${y}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16162a 50%, #0f0f1a 100%)',
      }}
    >
      {/* Stars layer with parallax */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: 'translate(var(--px, 0), var(--py, 0))' }}
      >
        {stars.map((star) => (
          <Star key={star.id} {...star} />
        ))}
      </div>

      {/* Subtle glow */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-purple-500/10 via-transparent to-blue-500/10" />
    </div>
  );
}

export default UniverseSceneComponent;
