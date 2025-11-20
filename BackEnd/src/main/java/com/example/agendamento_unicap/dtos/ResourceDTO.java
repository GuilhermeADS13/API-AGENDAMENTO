package com.example.agendamento_unicap.dtos;

import com.example.agendamento_unicap.entities.Reservation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
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

    @PositiveOrZero(message = "Quantidade deve ser um valor positivo")
    private int quantity;

    @Size(min = 5, max = 60, message = "Deve ter entre 5 e 60 caracteres")
    @NotBlank(message = "Campo requerido")
    private String description;
}
