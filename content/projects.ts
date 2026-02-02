export type ProjectType = 'frontend' | 'backend' | 'fullstack';

export type CaseStudySection = {
  title: string;
  bullets: string[];
};

export type CaseStudy = {
  sections: CaseStudySection[];
};

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
  caseStudy?: CaseStudy;
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
    caseStudy: {
      sections: [
        {
          title: 'Problem',
          bullets: [
            'Needed a backend-first task system that could scale beyond a UI demo into a real API-driven product.',
            'Wanted predictable, milestone-driven delivery to ship core workflows (auth, boards, tasks) before polish.',
          ],
        },
        {
          title: 'Solution',
          bullets: [
            'Designed an Express API as the source of truth and layered a Next.js client for Kanban planning.',
            'Implemented JWT auth with OAuth-ready seams plus Swagger/OpenAPI docs for fast handoffs.',
            'Tracked delivery with scoped milestones, ADRs, and checklists to show progress transparently.',
          ],
        },
        {
          title: 'Architecture',
          bullets: [
            'Next.js frontend consumes the Express REST API for board, task, and auth workflows.',
            'PostgreSQL + Prisma handle relational task data and migrations.',
            'Dockerized services keep local dev, testing, and future deployment consistent.',
          ],
        },
        {
          title: 'Testing',
          bullets: [
            'API routes and auth flows are covered with Jest + Supertest integration tests.',
            'Test coverage prioritizes task lifecycle, permissions, and edge cases before UI polish.',
          ],
        },
        {
          title: 'CI',
          bullets: [
            'GitHub Actions run lint, test, and build checks on every push and pull request.',
            'Milestone checklists and docs are reviewed alongside CI status to keep delivery on track.',
          ],
        },
      ],
    },
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
