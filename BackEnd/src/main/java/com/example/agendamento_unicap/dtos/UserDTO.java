package com.example.agendamento_unicap.dtos;

import java.util.List;

import com.example.agendamento_unicap.entities.Classroom;
import com.example.agendamento_unicap.entities.Resource;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String name;
    private String email;

    private List<Classroom> classrooms;
    private List<Resource> resources;
}
