package com.example.agendamento_unicap.dtos;

import com.example.agendamento_unicap.annotations.TimeOrderValid;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TimeOrderValid
public class ReservationDTO {
    private Integer id;

    @FutureOrPresent(message = "A data da reserva não pode estar no passado")
    private LocalDate reservationDate;

    private LocalTime startTime;
    private LocalTime endTime;
}
