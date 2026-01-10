import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Backend-oriented Full-Stack Engineer crafting reliable systems.
        </h1>
        <p className="text-slate-300">
          I design and build full-stack products with solid backends, clean APIs,
          and thoughtful frontends. TaskForge is my flagship project.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/taskforge"
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
          >
            View TaskForge
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 hover:border-slate-300"
          >
            View all projects
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-slate-100">Backend</h2>
          <p className="mt-2 text-xs text-slate-400">
            APIs, databases, and systems with strong contracts and docs.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-slate-100">Full-Stack</h2>
          <p className="mt-2 text-xs text-slate-400">
            From Next.js frontends to Express/Go services wired with CI/CD.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-slate-100">DevOps & Quality</h2>
          <p className="mt-2 text-xs text-slate-400">
            Docker, testing, and documentation that make projects feel real.
          </p>
        </div>
      </div>
    </section>
  );
}
