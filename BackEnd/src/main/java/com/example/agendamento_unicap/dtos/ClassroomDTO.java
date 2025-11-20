package com.example.agendamento_unicap.dtos;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomDTO {
    private Integer id;
    private String classNumber;
    private Character block;
    private Integer capacity;
    private List<LocalDateTime> schedules;
    private List<String> dates;
    private String status;
}
