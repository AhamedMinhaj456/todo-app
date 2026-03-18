package todo_app.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import org.testcontainers.junit.jupiter.Testcontainers;
import todo_app.backend.model.Task;
import todo_app.backend.repository.TaskRepository;
//import org.testcontainers.junit.jupiter.Container;
//import org.testcontainers.containers.MySQLContainer;


@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class TaskControllerIntegrationTest {

//    @Container
//    static MySQLContainer<?> mysql =
//            new MySQLContainer<>("mysql:8.0")
//                    .withDatabaseName("testdb")
//                    .withUsername("test")
//                    .withPassword("test");
//
//    static {
//        mysql.start();
//    }
//
//    @DynamicPropertySource
//    static void configureProperties(DynamicPropertyRegistry registry) {
//        registry.add("spring.datasource.url", mysql::getJdbcUrl);
//        registry.add("spring.datasource.username", mysql::getUsername);
//        registry.add("spring.datasource.password", mysql::getPassword);
//        registry.add("spring.datasource.driver-class-name", mysql::getDriverClassName);
//        registry.add("spring.jpa.hibernate.ddl-auto", () -> "update");
//
//    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> "jdbc:mysql://db:3306/todo_app");
        registry.add("spring.datasource.username", () -> "root");
        registry.add("spring.datasource.password", () -> "root");
        registry.add("spring.datasource.driver-class-name", () -> "com.mysql.cj.jdbc.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "update");
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        taskRepository.deleteAll();
    }

    @Test
    void shouldCreateTaskViaApi() throws Exception {
        String requestBody = """
            {
              "title": "Learn Spring Boot",
              "description": "Practice testing"
            }
            """;

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Learn Spring Boot"))
                .andExpect(jsonPath("$.description").value("Practice testing"))
                .andExpect(jsonPath("$.completed").value(false));

        assertEquals(1, taskRepository.count());
    }

    @Test
    void shouldReturnOnlyIncompleteTasks() throws Exception {
        Task task1 = new Task();
        task1.setTitle("Active task");
        task1.setDescription("Visible");
        task1.setCompleted(false);

        Task task2 = new Task();
        task2.setTitle("Done task");
        task2.setDescription("Hidden");
        task2.setCompleted(true);

        taskRepository.save(task1);
        taskRepository.save(task2);

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Active task"));
    }

    @Test
    void shouldCompleteTaskViaApi() throws Exception {
        Task task = new Task();
        task.setTitle("Complete me");
        task.setDescription("Test complete");
        task.setCompleted(false);

        Task saved = taskRepository.save(task);

        mockMvc.perform(put("/api/tasks/" + saved.getId() + "/complete"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));

        Task updated = taskRepository.findById(saved.getId()).orElseThrow();
        assertTrue(updated.isCompleted());
    }

    @Test
    void shouldReturnBadRequestWhenTitleIsBlank() throws Exception {
        String requestBody = """
        {
          "title": "",
          "description": "Some description"
        }
        """;

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }


}