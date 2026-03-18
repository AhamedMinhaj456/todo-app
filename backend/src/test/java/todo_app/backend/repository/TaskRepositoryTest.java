package todo_app.backend.repository;

import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.testcontainers.junit.jupiter.Testcontainers;
import todo_app.backend.model.Task;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    @DisplayName("Should return latest 5 incomplete tasks")
    void shouldReturnLatestFiveIncompleteTasks() {
        for (int i = 1; i <= 6; i++) {
            Task task = new Task();
            task.setTitle("Task " + i);
            task.setDescription("Description " + i);
            task.setCompleted(false);
            task.setCreatedAt(LocalDateTime.now().plusMinutes(i));
            taskRepository.save(task);
        }

        Task completedTask = new Task();
        completedTask.setTitle("Done Task");
        completedTask.setDescription("Should not appear");
        completedTask.setCompleted(true);
        completedTask.setCreatedAt(LocalDateTime.now().plusMinutes(10));
        taskRepository.save(completedTask);

        List<Task> tasks = taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDescIdDesc();

        assertEquals(5, tasks.size());
        assertFalse(tasks.stream().anyMatch(Task::isCompleted));
        assertEquals("Task 6", tasks.get(0).getTitle());
    }
}