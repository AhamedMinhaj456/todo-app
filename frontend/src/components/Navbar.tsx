import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Todo App
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Manage your tasks efficiently
          </p>
        </div>

        <nav className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/tasks"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Tasks
          </Link>

          <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 sm:text-sm">
            Ahamed Minhaj
          </div>
        </nav>
      </div>
    </header>
  );
}