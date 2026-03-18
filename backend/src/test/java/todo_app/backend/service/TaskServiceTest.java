package todo_app.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;


import todo_app.backend.dto.CreateTaskRequest;
import todo_app.backend.dto.TaskResponse;
import todo_app.backend.model.Task;
import todo_app.backend.repository.TaskRepository;

import java.util.List;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    public void shouldCreateTaskSuccessfully() {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Buy books");
        request.setDescription("Buy Java book");

        Task savedTask = new Task();
        savedTask.setId(1L);
        savedTask.setTitle("Buy books");
        savedTask.setDescription("Buy Java book");
        savedTask.setCompleted(false);

        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        TaskResponse response = taskService.createTask(request);

        assertNotNull(response);
        assertEquals("Buy books", response.getTitle());
        assertEquals("Buy Java book", response.getDescription());
        assertFalse(response.isCompleted());

        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void shouldReturnLatestFiveIncompleteTasks() {
        Task task1 = new Task();
        task1.setId(1L);
        task1.setTitle("Task 1");
        task1.setDescription("Desc 1");
        task1.setCompleted(false);

        Task task2 = new Task();
        task2.setId(2L);
        task2.setTitle("Task 2");
        task2.setDescription("Desc 2");
        task2.setCompleted(false);

        when(taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDescIdDesc())
                .thenReturn(List.of(task1, task2));

        List<TaskResponse> result = taskService.getLatestTasks();

        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        verify(taskRepository).findTop5ByCompletedFalseOrderByCreatedAtDescIdDesc();
    }

    @Test
    void shouldMarkTaskAsCompleted() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Task");
        task.setDescription("Desc");
        task.setCompleted(false);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponse response = taskService.completeTask(1L);

        assertTrue(task.isCompleted());
        assertTrue(response.isCompleted());
        verify(taskRepository).findById(1L);
        verify(taskRepository).save(task);
    }

    @Test
    void shouldThrowExceptionWhenTaskNotFound() {
        when(taskRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskService.completeTask(99L);
        });

        assertEquals("Task not found", exception.getMessage());
        verify(taskRepository).findById(99L);
    }
}
