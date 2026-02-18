import { AnimeParallaxComponent, SkillCard } from './components/animated-bg';
import { HeroInteractive } from './components/hero';

const projects = [
  {
    title: 'VXCoin Exchange',
    description: 'A modern cryptocurrency exchange platform with real-time trading, wallet integration, and advanced charting features.',
    tech: ['React', 'TypeScript', 'Node.js', 'WebSocket'],
    link: '#'
  },
  {
    title: 'Portfolio V1',
    description: 'Previous portfolio version with cyberpunk theme and 3D geometric shapes showcase.',
    tech: ['React', 'Three.js', 'TailwindCSS'],
    link: '#'
  }
];

const skills = [
  { name: 'React / Next.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Three.js / WebGL', level: 70 },
  { name: 'PostgreSQL / MongoDB', level: 75 },
  { name: 'Docker / AWS', level: 70 }
];

const contacts = [
  { label: 'GitHub', value: 'github.com/ducsmac', url: 'https://github.com/ducsmac' },
  { label: 'Email', value: 'ducphandeveloper@gmail.com', url: 'mailto:ducphandeveloper@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ducphan', url: 'https://linkedin.com/in/ducphan' }
];

// Simple inline icons for skills
const SkillIcon = ({ name }: { name: string }) => {
  const getIcon = () => {
    switch (name) {
      case 'React / Next.js':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.1-.18-.22-.35-.37-.5-.15.15-.27.32-.37.5l-.81 1.5.81 1.5c.1.18.22.35.37.5.15-.15.27-.32.37-.5m4.91-.7c.23-.42.37-.88.37-1.41 0-1.1-.45-2.08-1.17-2.8-.72-.71-1.68-1.12-2.78-1.12-.69 0-1.34.17-1.92.48-.1.16-.18.33-.25.5-.19-.31-.48-.57-.84-.74-.36-.17-.76-.25-1.17-.25-1.1 0-2.08.45-2.82 1.18-.73.73-1.14 1.71-1.14 2.82 0 .77.18 1.49.51 2.11-.51.35-.96.79-1.32 1.3-.63-.53-1.33-.91-2.11-1.08-.17-.04-.35-.06-.52-.06-1.13 0-2.12.46-2.86 1.23-.73.77-1.14 1.78-1.14 2.91 0 1.1.41 2.13 1.14 2.9.74.77 1.73 1.23 2.86 1.23.55 0 1.09-.1 1.58-.29.03.38.09.74.19 1.07.51.39 1.28.65 2.23.77.95.12 1.91.05 2.77-.21.03-.36.05-.74.05-1.11 0-1.08-.41-2.06-1.08-2.78-.67-.71-1.56-1.12-2.54-1.12-.5 0-.99.1-1.44.29-.02-.47-.15-.92-.38-1.32l-1.31.55c.19.42.3.88.3 1.35 0 .6-.15 1.17-.42 1.67-.27.5-.65.92-1.11 1.24-.47.32-1 .53-1.6.61-.04.38-.04.78-.04 1.18 0 2.03.77 3.8 2.05 5.03 1.28 1.23 3.03 1.91 4.98 1.91 1.96 0 3.7-.68 4.99-1.91 1.28-1.23 2.05-3 2.05-5.03 0-.4-.01-.8-.04-1.18-.6-.08-1.13-.29-1.6-.61-.46-.32-.84-.74-1.11-1.24-.27-.5-.42-1.07-.42-1.67 0-.47.11-.93.3-1.35l-1.31-.55c-.23.4-.36.85-.38 1.32-.45-.19-.94-.29-1.44-.29-.98 0-1.87.41-2.54 1.12-.67.72-1.08 1.7-1.08 2.78 0 .37.02.75.05 1.11.86.26 1.82.33 2.77.21.95-.12 1.72-.38 2.23-.77.1-.33.16-.69.19-1.07.49.19 1.03.29 1.58.29 1.13 0 2.12-.46 2.86-1.23.74-.77 1.14-1.8 1.14-2.9 0-1.13-.4-2.14-1.14-2.91m-7.19 4.63c-.27 0-.54-.04-.79-.13-.08-.28-.12-.58-.12-.9 0-.3.12-.61.37-.88.25-.26.58-.45 1.02-.54.05-.36.13-.71.25-1.04-.53-.32-.86-.71-1.05-1.13-.19-.42-.24-.86-.24-1.29 0-.41.13-.78.37-1.08.25-.3.58-.52 1.01-.62.43-.1.88-.08 1.31.06.07.53.31 1.01.67 1.39.36.37.83.63 1.38.76.02.34.08.66.18.96.1.3.27.57.51.78.23.21.52.36.85.43.33.07.67.06 1-.04.01.31.12.59.32.82.19.23.47.39.79.47.32.07.65.05.97-.07.32-.12.59-.33.79-.61.2-.29.31-.62.31-.98 0-.32-.11-.63-.31-.88-.2-.26-.48-.46-.82-.58-.34-.13-.7-.16-1.05-.1-.05-.33-.16-.64-.32-.9-.17-.27-.41-.48-.7-.62.37-.23.63-.53.79-.87.17-.34.22-.71.22-1.09 0-.46-.18-.88-.49-1.17-.31-.29-.75-.46-1.25-.46-.47 0-.91.16-1.26.45-.35.29-.55.71-.55 1.17 0 .37.13.72.37 1.02.24.3.58.52.99.64-.04.23-.05.46-.05.7 0 .83.34 1.55.88 2.12.54.57 1.29.89 2.1.89.04 0 .09 0 .13-.01-.03.3.04.59.19.83.16.24.4.42.69.53.29.1.6.12.91.05.31-.08.57-.26.76-.53.19-.26.28-.57.28-.91 0-.33-.11-.64-.32-.88-.21-.24-.5-.42-.85-.52-.35-.1-.71-.08-1.05.07-.07-.44-.3-.83-.64-1.12-.35-.29-.8-.46-1.3-.46z"/>
          </svg>
        );
      case 'TypeScript':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M3 3h18v18H3V3zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.55l1.33-.87c-.55-.66-1.35-1.08-2.42-1.08-1.5 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8zm-3.43-4.39v1.43H12v5.65h1.71v-5.65h1.71v-1.43h-5.14z"/>
          </svg>
        );
      case 'Node.js':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.51.2.78.2.27 0 .55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2M14 8.5l4.72 2.76-4.72 2.75-4.72-2.75L14 8.5m-2 4.45l-5.44 3.14 5.44 3.14 5.44-3.14L12 12.95Z"/>
          </svg>
        );
      case 'Three.js / WebGL':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        );
      case 'PostgreSQL / MongoDB':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <ellipse cx="12" cy="6" rx="9" ry="4" fill="currentColor" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="18" rx="9" ry="4" fill="currentColor" opacity="0.3" />
          </svg>
        );
      case 'Docker / AWS':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
          </svg>
        );
      default:
        return <div className="w-8 h-8 bg-white/20 rounded" />;
    }
  };
  return getIcon();
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="min-h-screen flex items-center py-20 relative">
      <div className="w-full max-w-4xl mx-auto px-8 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
          <h2 className="text-3xl font-light text-white tracking-wider">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="relative w-full min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <AnimeParallaxComponent />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
        <span className="text-lg font-mono text-white tracking-widest">
          <span className="text-cyan-400">DUC</span>
          <span className="text-white/30">/</span>
          <span className="text-pink-500">PHAN</span>
        </span>
        <nav className="flex gap-8">
          {['about', 'work', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm font-mono text-white/50 hover:text-cyan-400 transition-colors tracking-wider"
            >
              {item.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Interactive Hero Section */}
        <HeroInteractive>
          <div className="flex items-center gap-2 mb-4 animate-fade-in-up animate-delay-100">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-green-400 tracking-widest">AVAILABLE FOR WORK</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-light text-white mb-4 tracking-tight animate-fade-in-up animate-delay-200">
            DUC
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">PHAN</span>
          </h1>
          <p className="text-xl font-mono text-cyan-400/80 mb-8 tracking-wider animate-fade-in-up animate-delay-300">
            FULL STACK DEVELOPER
          </p>
          <p className="text-white/50 max-w-lg leading-relaxed mb-12 text-center animate-fade-in-up animate-delay-400">
            Building modern web applications with clean code and creative solutions.
            Specialized in React, TypeScript, and immersive frontend experiences.
          </p>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 animate-fade-in-up animate-delay-500"
          >
            <span className="text-sm font-mono text-white/70 group-hover:text-cyan-400 tracking-wider">VIEW WORK</span>
            <svg className="w-4 h-4 text-white/50 group-hover:text-cyan-400 transition-colors group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </HeroInteractive>

        {/* About / Skills */}
        <Section id="about" title="SKILLS">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <SkillCard
                  name={skill.name}
                  level={skill.level}
                  icon={<SkillIcon name={skill.name} />}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Work / Projects */}
        <Section id="work" title="WORK">
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                className="group relative p-8 bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h3 className="text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-white/50 mb-4">{project.description}</p>
                  <div className="flex gap-3">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-mono text-white/30 px-2 py-1 border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="CONTACT">
          <div className="max-w-2xl">
            <p className="text-white/50 mb-10 animate-fade-in-up animate-delay-100">
              Interested in working together? Let's connect.
            </p>
            <div className="grid gap-4">
              {contacts.map((contact, index) => (
                <a
                  key={contact.label}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <span className="text-sm font-mono text-white/40">{contact.label}</span>
                  <span className="text-sm font-mono text-white/60 group-hover:text-cyan-400 transition-colors">{contact.value}</span>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-8 px-8 border-t border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-white/30 tracking-widest">DUC/PHAN</span>
            <span className="text-xs font-mono text-white/30 tracking-wider">2026</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
