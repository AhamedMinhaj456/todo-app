package todo_app.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTaskRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

}