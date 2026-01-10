export type ProjectType = 'frontend' | 'backend' | 'fullstack';

export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  type: ProjectType;
  technologies: string[];
  role: string;
  timeframe: string;
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  highlightBullets: string[];
  status?: 'active' | 'planned' | 'in-progress';
};

export const projects: Project[] = [
  {
    slug: 'taskforge',
    name: 'TaskForge',
    shortDescription: 'Full-stack task manager with Kanban, auth, docs, and CI/CD.',
    type: 'fullstack',
    technologies: ['Next.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker'],
    role: 'Solo',
    timeframe: '≈1 week (scoped milestones)',
    links: {
      github: 'https://github.com/naf1s66/taskforge',
      // TODO: Replace demo/docs placeholders once TaskForge is deployed.
      demo: 'https://taskforge-placeholder.example.com',
      docs: 'https://taskforge-placeholder-docs.example.com',
    },
    highlightBullets: [
      'Monorepo: Next.js frontend, Express API, PostgreSQL, Dockerized infra.',
      'JWT + OAuth-ready authentication, Swagger/OpenAPI, Jest + Supertest.',
      'CI workflows, ADRs, and detailed milestone documentation.',
    ],
    status: 'in-progress',
  },
  {
    slug: 'craftedbynafis',
    name: 'CraftedByNafis',
    shortDescription: 'This portfolio, built to showcase backend-first full-stack work.',
    type: 'frontend',
    technologies: ['Next.js', 'TailwindCSS', 'shadcn/ui', 'Framer Motion'],
    role: 'Solo',
    timeframe: '≤1 week',
    links: {
      github: 'https://github.com/naf1s66/craftedbynafis',
    },
    highlightBullets: [
      'Portfolio focused on systems experience and real-world projects.',
      'Includes Resend-powered contact form and CI/CD.',
      'Projects modeled as data, making it easy to scale content.',
    ],
    status: 'in-progress',
  },
];
