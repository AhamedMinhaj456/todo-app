import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="text-center lg:text-left">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Smart Todo Management
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Organize your tasks and stay productive every day
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Manage your daily work with a clean and modern todo app built using
            React, TypeScript, Vite, and Tailwind CSS.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/tasks"
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Go to Tasks
            </Link>

            <a
              href="#recent-tasks"
              className="rounded-xl border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              View Recent Tasks
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
              <h2 className="text-2xl font-bold">Manage better</h2>
              <p className="mt-3 text-blue-100">
                Add tasks, track progress, and focus on what matters most with a
                clean and responsive interface.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-sm text-blue-100">Recent Tasks View</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-blue-100">Responsive</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-3xl font-bold">TS</p>
                  <p className="text-sm text-blue-100">Type Safe</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-3xl font-bold">Fast</p>
                  <p className="text-sm text-blue-100">Easy Workflow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}