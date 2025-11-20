package com.example.agendamento_unicap.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private ReservationType reservationType;

    @ManyToOne
    @JoinColumn(name = "classroom_id", nullable = true)
    private Classroom classroom;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = true)
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
