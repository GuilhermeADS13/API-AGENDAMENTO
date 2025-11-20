package com.example.agendamento_unicap.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.agendamento_unicap.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate reservationDate;
    private LocalTime startTime;
    private LocalTime endTime;
}
