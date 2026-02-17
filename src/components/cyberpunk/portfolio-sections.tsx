import {
  NeonCard,
  CyberButton,
  GlitchText,
  SectionHeader,
  SkillBadge,
  ProjectCard,
  ContactLink,
  GradientText
} from './cyberpunk-ui';

// Sample data
const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Three.js', icon: '🎮' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'GraphQL', icon: '🔷' }
];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with real-time inventory management',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: '#'
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time chat with LLM integration and vector search',
    tags: ['TypeScript', 'OpenAI', 'Redis'],
    link: '#'
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Interactive analytics dashboard with 3D visualizations',
    tags: ['Three.js', 'D3.js', 'React'],
    link: '#'
  }
];

// Hero Section
export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6">
          <span className="text-[var(--neon-cyan)] text-sm tracking-[0.3em] uppercase">
            Full-Stack Developer
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <GlitchText text="DUC PHAN" />
        </h1>

        <p className="text-xl md:text-2xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
          Building digital experiences that
          <GradientText text=" transcend boundaries" />
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <CyberButton variant="pink">View Work</CyberButton>
          <CyberButton variant="outline">Contact Me</CyberButton>
        </div>

        <div className="mt-16 animate-bounce">
          <span className="text-[var(--muted-foreground)] text-sm">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--neon-pink)] to-transparent mx-auto mt-4" />
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--neon-purple)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}

// About Section
export function AboutSection() {
  return (
    <section className="py-20 relative" id="about">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          subtitle="The person behind the code"
        />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <NeonCard className="order-2 md:order-1">
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              I'm a passionate developer with a knack for creating innovative solutions.
              My journey in tech has led me to work on diverse projects, from
              <span className="text-[var(--neon-cyan)]"> scalable web applications</span> to
              <span className="text-[var(--neon-pink)]"> immersive 3D experiences</span>.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source, or designing digital art.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              Let's create something
              <span className="text-[var(--neon-purple)]"> extraordinary together</span>.
            </p>
          </NeonCard>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <NeonCard glowColor="cyan" className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-cyan)]">5+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Years Experience</div>
            </NeonCard>
            <NeonCard glowColor="pink" className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-pink)]">50+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Projects Done</div>
            </NeonCard>
            <NeonCard glowColor="purple" className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-purple)]">30+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Happy Clients</div>
            </NeonCard>
            <NeonCard glowColor="cyan" className="text-center">
              <div className="text-4xl font-bold text-[var(--neon-cyan)]">100%</div>
              <div className="text-sm text-[var(--muted-foreground)]">Satisfaction</div>
            </NeonCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
export function SkillsSection() {
  return (
    <section className="py-20 relative" id="skills">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="Tools I use to bring ideas to life"
        />

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <SkillBadge key={skill.name} name={skill.name} icon={<span>{skill.icon}</span>} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
export function ProjectsSection() {
  return (
    <section className="py-20 relative" id="projects">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Featured Projects"
          subtitle="Some things I've built"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <CyberButton variant="outline">View All Projects</CyberButton>
        </div>
      </div>
    </section>
  );
}

// Contact Section
export function ContactSection() {
  return (
    <section className="py-20 relative" id="contact">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Get In Touch"
          subtitle="Let's build something amazing together"
        />

        <div className="max-w-2xl mx-auto">
          <NeonCard className="text-center mb-8">
            <p className="text-[var(--foreground)] mb-6">
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <CyberButton variant="pink" className="w-full md:w-auto">
              Start a Conversation
            </CyberButton>
          </NeonCard>

          <div className="flex flex-wrap justify-center gap-4">
            <ContactLink
              icon="📧"
              label="duc@example.com"
              href="mailto:duc@example.com"
            />
            <ContactLink
              icon="💼"
              label="LinkedIn"
              href="https://linkedin.com"
            />
            <ContactLink
              icon="🐙"
              label="GitHub"
              href="https://github.com"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
export function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)]">
      <div className="container mx-auto px-4 text-center">
        <p className="text-[var(--muted-foreground)] text-sm">
          © 2024 <span className="text-[var(--neon-pink)]">Duc Phan</span>.
          Built with <span className="text-[var(--neon-cyan)]">Three.js</span> & React.
        </p>
      </div>
    </footer>
  );
}

export default {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  Footer
};
