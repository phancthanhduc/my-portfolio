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
      {/* Subtle glow on hover */}
      <div
        className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(45deg, rgba(212, 165, 116, 0.2), rgba(100, 116, 139, 0.2), rgba(212, 165, 116, 0.2))',
        }}
      />

      {/* Card */}
      <div
        className={`
          relative p-6 rounded-lg border transition-all duration-300
          bg-[#333333] border-[#525252]
          group-hover:border-[#fbbf24]/50 group-hover:bg-[#363636]
          ${isHovered ? 'animate-float' : ''}
        `}
        style={{ animationDuration: '3s' }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div
            className={`
              absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#fbbf24]/10 to-transparent
              transform transition-transform duration-300 group-hover:scale-150
            `}
          />
        </div>

        {/* Icon */}
        <div
          className={`
            mb-4 transition-all duration-300
            ${isHovered ? 'text-[#fbbf24] scale-110' : 'text-[#a3a3a3]'}
          `}
        >
          {icon}
        </div>

        {/* Name */}
        <h3 className="text-lg font-mono text-[#f5f5f5]/80 group-hover:text-[#fbbf24] transition-colors mb-2">
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
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#64748b]'
                  : 'bg-[#525252]'}
                ${i < Math.floor(level / 20) && isHovered ? 'animate-pulse' : ''}
              `}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Percentage */}
        <div className="mt-2 text-xs font-mono text-[#a3a3a3]/50 group-hover:text-[#fbbf24]/80 transition-colors">
          {level}%
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
