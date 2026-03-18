import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white shadow">
      <div className="flex w-full items-center items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div>
            <h1 className="text-lg font-semibold tracking-wide sm:text-xl">
              Todo App
            </h1>
            <p className="text-xs text-slate-300 sm:text-sm">
              Smart task manager
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-white transition hover:text-emerald-400"
          >
            Home
          </Link>
          <Link
            to="/tasks"
            className="text-sm font-medium text-white transition hover:text-emerald-400"
          >
            Manage Tasks
          </Link>
          
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 sm:block">
            Ahamed Minhaj
          </div>

        </div>
      </div>
    </header>
  );
}