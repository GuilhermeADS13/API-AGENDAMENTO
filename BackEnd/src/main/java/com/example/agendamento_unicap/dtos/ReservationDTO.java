package com.example.agendamento_unicap.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.agendamento_unicap.entities.Classroom;
import com.example.agendamento_unicap.entities.Resource;
import com.example.agendamento_unicap.entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Integer id;
    private User user;
    private ReservationType reservationType;
    private Classroom classroom;
    private Resource resource;
    private LocalDate reservationDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;

    public enum ReservationType {
        CLASSROOM,
        RESOURCE
    }
}
