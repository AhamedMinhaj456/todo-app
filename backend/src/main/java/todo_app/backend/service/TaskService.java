package todo_app.backend.service;

import org.springframework.stereotype.Service;
import todo_app.backend.dto.CreateTaskRequest;
import todo_app.backend.dto.TaskResponse;
import todo_app.backend.model.Task;
import todo_app.backend.repository.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskResponse createTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        Task saved = taskRepository.save(task);
        return mapToResponse(saved);
    }

    public List<TaskResponse> getLatestTasks() {
        return taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDescIdDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TaskResponse completeTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(true);
        task.setModifiedAt(LocalDateTime.now());
        Task updated = taskRepository.save(task);
        return mapToResponse(updated);
    }

    private TaskResponse mapToResponse(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setCompleted(task.isCompleted());
        response.setCreatedAt(task.getCreatedAt());
        return response;
    }
}
