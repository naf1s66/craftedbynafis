import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '../../../content/projects';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const statusLabel =
    project.status === 'in-progress'
      ? 'In progress'
      : project.status === 'planned'
      ? 'Planned'
      : 'Active';

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          {statusLabel}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
          {project.name}
        </h1>
        <p className="text-sm text-slate-300">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-slate-100">Overview</h2>
          <p className="text-sm text-slate-300">{project.shortDescription}</p>
        </div>
        <div className="space-y-4 text-xs text-slate-300">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Role
            </p>
            <p className="text-sm text-slate-200">{project.role}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Timeframe
            </p>
            <p className="text-sm text-slate-200">{project.timeframe}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-200">
        <h2 className="text-base font-semibold text-slate-100">Highlights</h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
          {project.highlightBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {project.caseStudy && (
        <div className="space-y-4 text-sm text-slate-200">
          <h2 className="text-base font-semibold text-slate-100">Case study</h2>
          <div className="space-y-4">
            {project.caseStudy.sections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {section.title}
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.slug === 'taskforge' && (
        <div className="space-y-2 rounded-lg border border-amber-500/40 bg-amber-950/20 p-4 text-xs text-amber-100">
          <h2 className="text-sm font-semibold text-amber-200">
            Note: TaskForge deployment in progress
          </h2>
          <p>
            TaskForge is still being wired for deployment. Demo and docs links
            are currently placeholders and will be updated once the full stack is
            live. The portfolio intentionally documents this gap so reviewers can
            see the deployment work in progress.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-xs">
        {project.links.github && (
          <Link
            href={project.links.github}
            className="rounded-full border border-slate-700 px-3 py-1 text-slate-100 hover:border-sky-400"
          >
            View code
          </Link>
        )}
        {project.links.demo && (
          <Link
            href={project.links.demo}
            className="rounded-full border border-slate-700 px-3 py-1 text-slate-100 hover:border-sky-400"
          >
            Live demo (placeholder)
          </Link>
        )}
        {project.links.docs && (
          <Link
            href={project.links.docs}
            className="rounded-full border border-slate-700 px-3 py-1 text-slate-100 hover:border-sky-400"
          >
            Docs (placeholder)
          </Link>
        )}
      </div>
    </section>
  );
}
