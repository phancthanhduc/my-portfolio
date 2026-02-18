import { useState } from 'react';

interface SkillCardProps {
  name: string;
  level: number;
  icon: React.ReactNode;
  delay: number;
}

export function SkillCard({ name, level, icon, delay }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* Animated glow on hover */}
      <div
        className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
        style={{
          background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5))',
        }}
      />

      {/* Card */}
      <div
        className={`
          relative p-6 rounded-lg border transition-all duration-300
          bg-white/[0.02] border-white/10
          group-hover:border-cyan-400/50 group-hover:bg-white/[0.05]
          ${isHovered ? 'animate-float' : ''}
        `}
        style={{ animationDuration: '3s' }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div
            className={`
              absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent
              transform transition-transform duration-300 group-hover:scale-150
            `}
          />
        </div>

        {/* Icon */}
        <div
          className={`
            mb-4 transition-all duration-300
            ${isHovered ? 'text-cyan-400 scale-110' : 'text-white/60'}
          `}
        >
          {icon}
        </div>

        {/* Name */}
        <h3 className="text-lg font-mono text-white/80 group-hover:text-cyan-400 transition-colors mb-2">
          {name}
        </h3>

        {/* Level indicator */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`
                h-1.5 flex-1 rounded-full transition-all duration-300
                ${i < Math.floor(level / 20)
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-500'
                  : 'bg-white/10'}
                ${i < Math.floor(level / 20) && isHovered ? 'animate-pulse' : ''}
              `}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Percentage */}
        <div className="mt-2 text-xs font-mono text-white/40 group-hover:text-cyan-400/80 transition-colors">
          {level}%
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
