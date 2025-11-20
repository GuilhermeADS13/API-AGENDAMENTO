package com.example.agendamento_unicap.dtos;

import java.util.List;

import com.example.agendamento_unicap.entities.Classroom;
import com.example.agendamento_unicap.entities.Resource;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer id;

    @NotBlank(message = "Campo obrigatório")
    private String name;

    @Email(message = "Favor entrar um email válido")
    private String email;

    private List<Classroom> classrooms;
    private List<Resource> resources;
}
