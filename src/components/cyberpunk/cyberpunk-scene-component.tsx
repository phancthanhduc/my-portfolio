import { useEffect, useRef, useState, useCallback } from 'react';
import { CyberpunkScene } from './cyberpunk-scene';

interface CyberpunkSceneProps {
  className?: string;
}

export function CyberpunkSceneComponent({ className = '' }: CyberpunkSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CyberpunkScene | null>(null);
  const [hoveredShape, setHoveredShape] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleHover = useCallback((name: string | null) => {
    setHoveredShape(name);
  }, []);

  const handleClick = useCallback((name: string | null) => {
    // Could open project modal here
    console.log('Clicked:', name);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new CyberpunkScene(canvasRef.current);
    scene.setOnHover(handleHover);
    scene.setOnClick(handleClick);
    scene.setAutoRotate(autoRotate);
    scene.start();
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, [handleHover, handleClick]);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setAutoRotate(autoRotate);
    }
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[60vh] min-h-[400px] overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: 'none' }}
      />

      {/* Scene info overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <div className="glass rounded-lg px-4 py-2">
          <p className="text-sm text-[var(--foreground)]">
            <span className="text-[var(--neon-cyan)]">Drag</span> to rotate
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            <span className="text-[var(--neon-pink)]">Scroll</span> to zoom
          </p>
        </div>

        {hoveredShape && (
          <div className="glass rounded-lg px-4 py-2 border border-[var(--neon-pink)] animate-fade-in">
            <p className="text-sm font-medium text-[var(--neon-pink)]">
              {hoveredShape}
            </p>
          </div>
        )}
      </div>

      {/* Auto-rotate toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            autoRotate
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] glow-pink'
              : 'glass text-[var(--foreground)] border border-[var(--border)]'
          }`}
        >
          {autoRotate ? 'AUTO: ON' : 'AUTO: OFF'}
        </button>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[var(--neon-cyan)] opacity-50" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[var(--neon-pink)] opacity-50" />
    </div>
  );
}

export default CyberpunkSceneComponent;
