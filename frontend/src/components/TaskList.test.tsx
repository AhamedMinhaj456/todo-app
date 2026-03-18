import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import TaskList from "./TaskList";
import type { Task } from "../types/task";

describe("TaskList", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Buy books",
      description: "Buy books for next semester",
      completed: false,
      createdAt: "2026-03-18T10:00:00",
    },
    {
      id: "2",
      title: "Clean room",
      description: "Clean the room before guests arrive",
      completed: false,
      createdAt: "2026-03-18T11:00:00",
    },
  ];

  it("renders heading and visible task count", () => {
    render(<TaskList tasks={mockTasks} onCompleteTask={vi.fn()} />);

    expect(screen.getByText(/recent tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/2 visible/i)).toBeInTheDocument();
  });

  it("shows empty state when there are no tasks", () => {
    render(<TaskList tasks={[]} onCompleteTask={vi.fn()} />);

    expect(
      screen.getByText(/no active tasks\. add a new task to get started\./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/0 visible/i)).toBeInTheDocument();
  });

  it("renders all tasks passed as props", () => {
    render(<TaskList tasks={mockTasks} onCompleteTask={vi.fn()} />);

    expect(screen.getByText("Buy books")).toBeInTheDocument();
    expect(screen.getByText("Buy books for next semester")).toBeInTheDocument();

    expect(screen.getByText("Clean room")).toBeInTheDocument();
    expect(
      screen.getByText("Clean the room before guests arrive")
    ).toBeInTheDocument();
  });

  it("calls onCompleteTask with correct task id when Done is clicked", async () => {
    const user = userEvent.setup();
    const onCompleteTask = vi.fn();

    render(<TaskList tasks={mockTasks} onCompleteTask={onCompleteTask} />);

    const doneButtons = screen.getAllByRole("button", { name: /done/i });
    await user.click(doneButtons[0]);

    expect(onCompleteTask).toHaveBeenCalledTimes(1);
    expect(onCompleteTask).toHaveBeenCalledWith("1");
  });

  it("calls onCompleteTask with second task id when second Done button is clicked", async () => {
    const user = userEvent.setup();
    const onCompleteTask = vi.fn();

    render(<TaskList tasks={mockTasks} onCompleteTask={onCompleteTask} />);

    const doneButtons = screen.getAllByRole("button", { name: /done/i });
    await user.click(doneButtons[1]);

    expect(onCompleteTask).toHaveBeenCalledTimes(1);
    expect(onCompleteTask).toHaveBeenCalledWith("2");
  });
});