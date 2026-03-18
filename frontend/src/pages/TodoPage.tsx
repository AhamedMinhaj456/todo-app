import { useEffect, useMemo, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { Task } from "../types/task";
import { createTask, getTasks, completeTask } from "../services/taskService";

type ToastType = "success" | "error";

type ToastState = {
  message: string;
  type: ToastType;
} | null;

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [toast, setToast] = useState<ToastState>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletingId, setIsCompletingId] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const loadTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setToast({
        message: "Failed to load tasks.",
        type: "error",
      });
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      setIsSubmitting(true);
      await createTask(title, description);
      await loadTasks();

      setToast({
        message: "Task added successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      setToast({
        message: "Failed to add task.",
        type: "error",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      setIsCompletingId(id);
      await completeTask(id);
      await loadTasks();

      setToast({
        message: "Task marked as completed.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to complete task:", error);

      setToast({
        message: "Failed to complete task.",
        type: "error",
      });
    } finally {
      setIsCompletingId(null);
    }
  };

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.completed)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <section className="relative w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
      {toast && (
        <div className="fixed right-4 top-24 z-[60] w-full max-w-sm sm:right-6 lg:right-8">
          <div
            className={`rounded-2xl border px-4 py-3 shadow-xl transition-all ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {toast.type === "success" ? "Success" : "Error"}
                </p>
                <p className="mt-1 text-sm">{toast.message}</p>
              </div>

              <button
                onClick={() => setToast(null)}
                className="text-lg leading-none opacity-70 transition hover:opacity-100"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
       

        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Task Manager
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Add new tasks, manage your active work, and keep track of your latest priorities.
        </p>
      </div>

      {isLoadingTasks ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-600" />
            <span className="text-sm font-medium">Loading tasks...</span>
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
          <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />
          <TaskList
            tasks={visibleTasks}
            onCompleteTask={handleCompleteTask}
            completingTaskId={isCompletingId}
          />
        </section>
      )}
    </section>
  );
}