/**
 * Portfolio Context Data for Gemini AI Chat
 * This file contains all the information about Duc Phan's portfolio
 * that the AI can use to answer visitor questions.
 */

export interface ProjectInfo {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  techDetails: string[];
  features: string[];
}

export interface SkillInfo {
  name: string;
  level: number;
}

export interface ContactInfo {
  label: string;
  value: string;
  url: string;
}

export interface PortfolioContext {
  about: string;
  skills: SkillInfo[];
  projects: ProjectInfo[];
  contact: ContactInfo[];
}

export const portfolioContext: PortfolioContext = {
  about: `Full Stack Developer with 8+ years of experience specializing in React, TypeScript, Node.js, and Go.
Currently focused on building modern web applications with clean code and creative solutions.
Experienced in AI integration, cloud architecture, and building scalable systems.`,

  skills: [
    { name: 'React / Next.js', level: 90 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js / NestJS', level: 85 },
    { name: 'Go', level: 75 },
    { name: 'Tailwind CSS / MUI', level: 85 },
    { name: 'PostgreSQL / Redis', level: 80 },
    { name: 'Docker / AWS', level: 75 },
    { name: 'AI Integration', level: 80 }
  ],

  projects: [
    {
      slug: 'drprompt',
      title: 'drprompt',
      description: 'AI Prompt Management Platform - Build, manage, and optimize AI prompts with collaboration features, analytics, and seamless integration with Claude and OpenAI.',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Zustand', 'Prisma', 'PostgreSQL'],
      techDetails: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Prisma ORM', 'PostgreSQL', 'Anthropic SDK', 'OpenAI', 'wavesurfer.js', 'JWT', 'Swagger UI'],
      features: ['Prompt management & organization', 'AI integration (Claude, OpenAI)', 'Audio processing', 'User authentication', 'Admin dashboard', 'Search functionality']
    },
    {
      slug: 'spsoft',
      title: 'SPSOFT Portal',
      description: 'Microsoft 365 and SPLA Service Provider Portal - Comprehensive portal for managing subscriptions, orders, invoices, and customer support.',
      tech: ['React 18', 'Vite', 'Tailwind 4', 'Zustand', 'Radix UI'],
      techDetails: ['React 18', 'Vite', 'Tailwind CSS 4', 'Zustand', 'Radix UI', 'TanStack Query', 'FullCalendar', 'ApexCharts', 'i18next', 'Framer Motion'],
      features: ['User product management', 'Order processing', 'Invoice handling', 'Support ticket system', 'Analytics dashboard', 'Multi-language support']
    },
    {
      slug: 'beautypay',
      title: 'BeautyPay Agency',
      description: 'Payment and Agency Web Application - Platform for managing agency operations, client relationships, and payment processing.',
      tech: ['React', 'Webpack', 'CKEditor 5'],
      techDetails: ['React', 'Webpack', 'CKEditor 5', 'Sentry', 'air-datepicker', 'JS Year Calendar'],
      features: ['Agency management', 'Payment processing', 'Client portal', 'Rich text editing', 'Error tracking']
    },
    {
      slug: 'minnobomcore',
      title: 'Minno BOM Core',
      description: 'Bill of Materials Management System - Manufacturing BOM management with advanced data grids, charting, and multi-language support.',
      tech: ['React 18', 'Vite', 'MUI', 'Redux'],
      techDetails: ['React 18', 'Vite', 'Material UI', 'Redux Toolkit', 'TanStack Query', 'ApexCharts', 'Recharts', 'i18next', 'Tiptap', 'Sentry', 'Supabase'],
      features: ['BOM management', 'Advanced data grids', 'Charting & analytics', 'PDF generation', 'Map integration', 'Multi-language']
    },
    {
      slug: 'ceroms',
      title: 'CER OMS',
      description: 'Order Management System - Modern order processing system with inventory tracking, customer management, and analytics.',
      tech: ['React 19', 'Vite', 'Tailwind', 'shadcn/ui'],
      techDetails: ['React 19', 'Vite', 'Tailwind CSS', 'Radix UI', 'shadcn/ui', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'TanStack Table', 'Recharts', 'Framer Motion'],
      features: ['Order processing', 'Inventory tracking', 'Customer management', 'Analytics dashboard', 'Data tables', 'Form validation']
    },
    {
      slug: 'dwtech-api',
      title: 'DW Tech API',
      description: 'Backend API Services - Comprehensive Go-based backend with database, caching, messaging, and cloud storage.',
      tech: ['Go', 'PostgreSQL', 'Redis'],
      techDetails: ['Go', 'PostgreSQL', 'Redis', 'RabbitMQ', 'GORM', 'AWS S3', 'JWT', 'Google OAuth', 'Swagger'],
      features: ['RESTful API', 'Database management', 'Caching layer', 'Message queue', 'File storage', 'Authentication', 'Email automation', 'Cron jobs']
    },
    {
      slug: 'dwtech-admin',
      title: 'DW Tech Admin',
      description: 'Admin Dashboard - React Admin based management interface for data administration and monitoring.',
      tech: ['React 18', 'React Admin', 'MUI'],
      techDetails: ['React 18', 'React Admin', 'Material UI', 'Axios', 'JSON Server'],
      features: ['Data management', 'Admin interface', 'REST API integration', 'Rich text input', 'JSON viewer']
    },
    {
      slug: 'dwtech-ui',
      title: 'DW Tech Customer Portal',
      description: 'Customer-Facing Web Application - Feature-rich portal with scheduling, charting, document viewing, and payment integration.',
      tech: ['React 18', 'Redux', 'MUI'],
      techDetails: ['React 18', 'Redux Toolkit', 'Material UI', 'React Router', 'SCSS', 'Framer Motion', 'ApexCharts', 'FullCalendar', 'Google OAuth', 'reCAPTCHA'],
      features: ['Calendar scheduling', 'Charting & visualization', 'Document/PDF viewing', 'QR code generation', 'Image compression', 'Payment integration']
    },
    {
      slug: 'vxcoin',
      title: 'VXCoin Exchange',
      description: 'Vietnamese Cryptocurrency Exchange - Full-featured crypto exchange with NFT marketplace, trading, and wallet management.',
      tech: ['Java 17', 'Spring Boot 3'],
      techDetails: ['Java 17', 'Spring Boot 3.2.6', 'Gradle', 'Lombok', 'SpringDoc OpenAPI'],
      features: ['Crypto trading', 'Wallet integration', 'NFT marketplace', 'Real-time charts', 'User management', 'Security features']
    },
    {
      slug: 'filmsite',
      title: 'Film Site',
      description: 'Film Platform - NestJS-based film streaming and management platform with Turbo monorepo architecture.',
      tech: ['NestJS', 'TypeScript', 'Turbo'],
      techDetails: ['TypeScript', 'NestJS', 'Turbo', 'Node.js 22+', 'Zod'],
      features: ['Film management', 'Streaming support', 'User authentication', 'Admin panel', 'Database integration']
    }
  ],

  contact: [
    { label: 'GitHub', value: 'github.com/phancthanhduc', url: 'https://github.com/phancthanhduc' },
    { label: 'Email', value: 'phancthanhduc@gmail.com', url: 'mailto:phancthanhduc@gmail.com' },
    { label: 'LinkedIn', value: 'golander01', url: 'https://linkedin.com/in/golander01' }
  ]
};

/**
 * Generate system prompt for Gemini API
 */
export function generateSystemPrompt(): string {
  return `You are an AI assistant for Duc Phan's portfolio website.
Your role is to help visitors learn about his work, skills, and projects.

## About Duc Phan
${portfolioContext.about}

## Skills
${portfolioContext.skills.map(s => `- ${s.name}: ${s.level}% proficiency`).join('\n')}

## Projects
${portfolioContext.projects.map(p => `
### ${p.title}
- Description: ${p.description}
- Tech Stack: ${p.tech.join(', ')}
- Key Features: ${p.features.join(', ')}
`).join('\n')}

## Contact
${portfolioContext.contact.map(c => `- ${c.label}: ${c.value}`).join('\n')}

Guidelines:
- Be friendly, concise, and helpful
- Answer questions about Duc's work, skills, and experience
- If you don't know something, say so honestly
- Don't make up information about projects not listed above
- Keep responses brief but informative`;
}
