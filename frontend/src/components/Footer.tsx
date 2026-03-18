export default function Footer() {
  return (
    <footer className="w-full bg-black text-slate-300">
      <div className="flex w-full items-center flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row lg:px-8">
        <p>© 2026 Todo App. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <a href="#" className="transition hover:text-emerald-400">
            Home
          </a>
          <a href="#recent-tasks" className="transition hover:text-emerald-400">
            Recent Tasks
          </a>
          <a href="#" className="transition hover:text-emerald-400">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}