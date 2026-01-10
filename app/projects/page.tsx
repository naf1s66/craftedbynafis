import Link from 'next/link';
import { projects } from '../../content/projects';

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-slate-300">
          A selection of frontend, backend, and full-stack projects. TaskForge is currently
          in active development and will be wired here with a live demo link once deployed.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition hover:border-sky-500"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-100">
                {project.name}
              </h2>
              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-300">
                {project.type}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {project.shortDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
