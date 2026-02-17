import type { ReactNode } from 'react';

// Neon Card Component
interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'pink' | 'cyan' | 'purple';
  hoverEffect?: boolean;
}

export function NeonCard({
  children,
  className = '',
  glowColor = 'purple',
  hoverEffect = true
}: NeonCardProps) {
  const glowStyles = {
    pink: 'hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]',
    cyan: 'hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]',
    purple: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
  };

  const borderColors = {
    pink: 'border-[var(--neon-pink)]',
    cyan: 'border-[var(--neon-cyan)]',
    purple: 'border-[var(--neon-purple)]'
  };

  return (
    <div
      className={`
        glass rounded-xl p-6 border border-[var(--border)]
        transition-all duration-300 ease-out
        ${borderColors[glowColor]}
        ${hoverEffect ? glowStyles[glowColor] : ''}
        hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Cyberpunk Button
interface CyberButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'pink' | 'cyan' | 'purple' | 'outline';
  onClick?: () => void;
}

export function CyberButton({
  children,
  className = '',
  variant = 'pink',
  onClick
}: CyberButtonProps) {
  const variants = {
    pink: 'bg-[var(--neon-pink)] text-[var(--primary-foreground)] glow-pink hover:brightness-110',
    cyan: 'bg-[var(--neon-cyan)] text-[var(--accent-foreground)] glow-cyan hover:brightness-110',
    purple: 'bg-[var(--neon-purple)] text-white glow-purple hover:brightness-110',
    outline: 'bg-transparent border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] hover:bg-[var(--neon-pink)] hover:text-white'
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-semibold tracking-wide
        transition-all duration-200
        uppercase text-sm
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// Glitch Text Component
interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function GlitchText({
  text,
  className = '',
  as: Tag = 'h2'
}: GlitchTextProps) {
  return (
    <Tag className={`glitch relative inline-block ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}

// Gradient Text
interface GradientTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function GradientText({
  text,
  className = '',
  as: Tag = 'span'
}: GradientTextProps) {
  return (
    <Tag className={`gradient-text ${className}`}>
      {text}
    </Tag>
  );
}

// Section Header
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold mb-2">
        <GradientText text={title} />
      </h2>
      {subtitle && (
        <p className="text-[var(--muted-foreground)]">{subtitle}</p>
      )}
      <div className="h-1 w-20 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-cyan)] mt-4 rounded-full" />
    </div>
  );
}

// Skill Badge
interface SkillBadgeProps {
  name: string;
  icon?: ReactNode;
  className?: string;
}

export function SkillBadge({ name, icon, className = '' }: SkillBadgeProps) {
  return (
    <div className={`
      glass rounded-full px-4 py-2
      border border-[var(--border)]
      flex items-center gap-2
      hover:border-[var(--neon-cyan)]
      hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]
      transition-all duration-200
      ${className}
    `}>
      {icon}
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

// Project Card
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  className = ''
}: ProjectCardProps) {
  const content = (
    <NeonCard glowColor="pink" className={`h-full ${className}`}>
      <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{title}</h3>
      <p className="text-[var(--muted-foreground)] text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-[var(--secondary)] text-[var(--neon-cyan)]"
          >
            {tag}
          </span>
        ))}
      </div>
      <CyberButton variant="outline" className="w-full text-xs">
        View Project
      </CyberButton>
    </NeonCard>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

// Contact Link
interface ContactLinkProps {
  icon: ReactNode;
  label: string;
  href: string;
  className?: string;
}

export function ContactLink({ icon, label, href, className = '' }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-3
        glass rounded-lg px-4 py-3
        border border-[var(--border)]
        hover:border-[var(--neon-cyan)]
        hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]
        transition-all duration-200
        ${className}
      `}
    >
      <span className="text-[var(--neon-cyan)]">{icon}</span>
      <span className="text-[var(--foreground)]">{label}</span>
    </a>
  );
}

export default {
  NeonCard,
  CyberButton,
  GlitchText,
  GradientText,
  SectionHeader,
  SkillBadge,
  ProjectCard,
  ContactLink
};
