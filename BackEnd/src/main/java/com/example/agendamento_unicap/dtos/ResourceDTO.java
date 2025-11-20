package com.example.agendamento_unicap.dtos;

import com.example.agendamento_unicap.entities.Reservation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceDTO extends ReservationDTO {
    private Integer id;
    private int quantity;
    private String description;
    private String status;
}
