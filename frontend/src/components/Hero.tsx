import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1600&auto=format&fit=crop"
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            You Deserve To
            <br />
            Organize Your Work Best
          </h1>

          <p className="mt-6 text-base text-slate-200 sm:text-lg">
            Manage Tasks | Stay Focused | Improve Productivity
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/tasks"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Go to Task Manager
            </Link>

            <a
              href="#recent-tasks"
              className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              View Recent Tasks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}