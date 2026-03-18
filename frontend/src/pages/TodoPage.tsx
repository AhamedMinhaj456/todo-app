import { useEffect, useMemo, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { Task } from "../types/task";
import { createTask, getTasks, completeTask } from "../services/taskService";

export default function TodoPage() {
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

  const handleAddTask = async (title: string, description: string) => {
    try {
      await createTask(title, description);
      await loadTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
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
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Task Manager</h2>
        <p className="mt-2 text-sm text-slate-500">
          Add new tasks and manage your current work.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={visibleTasks} onCompleteTask={handleCompleteTask} />
      </section>
    </section>
  );
}