import type { Task } from "../types/task";

type TaskListProps = {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  completingTaskId?: string | null;
};

export default function TaskList({ tasks, onCompleteTask }: TaskListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Recent Tasks
          </h2>
          
        </div>

      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
          No active tasks. Add a new task to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-slate-900">
                    {task.title}
                  </h3>
                  <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                    {task.description}
                  </p>
                </div>

                <button
                  onClick={() => onCompleteTask(task.id)}
                  className="w-full rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100 sm:w-auto"
                >
                  Done
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}