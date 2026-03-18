import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import TaskList from "../components/TaskList";
import type { Task } from "../types/task";
import { completeTask, getTasks } from "../services/taskService";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      await completeTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const recentTasks = useMemo(() => {
    return tasks
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <>
      <Hero />

      <section
        id="recent-tasks"
        className="w-full px-4 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Most Recent Tasks
            </h2>
          </div>

          <Link
            to="/tasks"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Open Task Manager
          </Link>
        </div>

        <TaskList tasks={recentTasks} onCompleteTask={handleCompleteTask} />
      </section>
    </>
  );
}