import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("renders title input, description input, and add button", () => {
    render(<TaskForm onAddTask={vi.fn()} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  it("shows validation error when submitted with empty fields", async () => {
    const user = userEvent.setup();

    render(<TaskForm onAddTask={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(
      screen.getByText(/title and description are required/i)
    ).toBeInTheDocument();
  });

  it("calls onAddTask with trimmed title and description", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn().mockResolvedValue(undefined);

    render(<TaskForm onAddTask={onAddTask} />);

    await user.type(screen.getByLabelText(/title/i), "   Buy books   ");
    await user.type(
      screen.getByLabelText(/description/i),
      "   Buy Java and Spring Boot books   "
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(onAddTask).toHaveBeenCalledTimes(1);
    });

    expect(onAddTask).toHaveBeenCalledWith(
      "Buy books",
      "Buy Java and Spring Boot books"
    );
  });

  it("clears inputs after successful submit", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn().mockResolvedValue(undefined);

    render(<TaskForm onAddTask={onAddTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, "Clean room");
    await user.type(descriptionInput, "Clean the room before evening");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(titleInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });
  });

  it("clears previous validation error after successful submit", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn().mockResolvedValue(undefined);

    render(<TaskForm onAddTask={onAddTask} />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(
      screen.getByText(/title and description are required/i)
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/title/i), "Task 1");
    await user.type(
      screen.getByLabelText(/description/i),
      "Task 1 description"
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(onAddTask).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.queryByText(/title and description are required/i)
    ).not.toBeInTheDocument();
  });

  it("shows submit failure error when onAddTask rejects", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn().mockRejectedValue(new Error("API failed"));

    render(<TaskForm onAddTask={onAddTask} />);

    await user.type(screen.getByLabelText(/title/i), "Task 1");
    await user.type(
      screen.getByLabelText(/description/i),
      "Task 1 description"
    );
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/failed to add task/i)
      ).toBeInTheDocument();
    });
  });

  it("disables inputs and button, and shows loading text when submitting", () => {
    render(<TaskForm onAddTask={vi.fn()} isSubmitting />);

    expect(screen.getByLabelText(/title/i)).toBeDisabled();
    expect(screen.getByLabelText(/description/i)).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /adding/i })
    ).toBeDisabled();
  });

  it("does not call onAddTask when submitting state is true", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();

    render(<TaskForm onAddTask={onAddTask} isSubmitting />);

    await user.click(screen.getByRole("button", { name: /adding/i }));

    expect(onAddTask).not.toHaveBeenCalled();
  });
});