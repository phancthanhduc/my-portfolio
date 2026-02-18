import { useEffect, useRef, useState, useCallback } from 'react';
import { InteractiveScene } from './interactive-scene';

interface ThreeJsSceneProps {
  className?: string;
}

export function ThreeJsScene({ className = '' }: ThreeJsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<InteractiveScene | null>(null);
  const [hoveredShape, setHoveredShape] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleHover = useCallback((name: string | null) => {
    setHoveredShape(name);
  }, []);

  const handleClick = useCallback((name: string | null) => {
    setSelectedShape(name);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new InteractiveScene(canvasRef.current);
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

  // Update auto-rotate setting
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setAutoRotate(autoRotate);
    }
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[500px] rounded-xl overflow-hidden bg-[var(--background)] ${className}`}
      style={{ border: '1px solid var(--border)' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: 'none' }}
      />

      {/* Overlay Info */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <div className="bg-[var(--card)]/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-[var(--border)]">
          <p className="text-sm text-[var(--foreground)]">Drag to rotate</p>
          <p className="text-xs text-[var(--muted-foreground)]">Scroll to zoom</p>
        </div>

        {hoveredShape && (
          <div className="bg-[var(--card)]/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-[var(--primary)] animate-fade-in">
            <p className="font-medium text-[var(--primary)]">{hoveredShape}</p>
            {selectedShape !== hoveredShape && (
              <p className="text-xs text-[var(--muted-foreground)]">Click to select</p>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            autoRotate
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
              : 'bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)]'
          }`}
        >
          {autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
        </button>
      </div>

      {/* Selected indicator */}
      {selectedShape && (
        <div className="absolute top-4 left-4 bg-[var(--primary)]/10 border border-[var(--primary)] rounded-lg px-4 py-2">
          <p className="text-sm font-medium text-[var(--primary)]">
            Selected: {selectedShape}
          </p>
        </div>
      )}
    </div>
  );
}

export default ThreeJsScene;
