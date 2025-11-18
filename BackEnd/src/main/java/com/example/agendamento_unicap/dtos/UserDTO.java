package com.example.agendamento_unicap.dtos;

import java.util.List;

import com.example.agendamento_unicap.entities.Classroom;
import com.example.agendamento_unicap.entities.Resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private Long RA;
    private List<Classroom> classrooms;
    private List<Resource> resources;
}
