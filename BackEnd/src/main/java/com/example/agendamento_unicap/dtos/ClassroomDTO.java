package com.example.agendamento_unicap.dtos;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomDTO extends ReservationDTO{

    private String classNumber;
    private Character block;
    private Integer capacity;
    private List<LocalDateTime> schedules;
    private List<String> dates;

}
