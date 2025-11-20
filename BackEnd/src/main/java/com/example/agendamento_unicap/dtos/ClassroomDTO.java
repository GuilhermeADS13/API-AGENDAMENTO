package com.example.agendamento_unicap.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.example.agendamento_unicap.enums.StatusEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomDTO extends ReservationDTO{

    @NotBlank(message = "Campo obrigatório")
    private String classNumber;
    @NotBlank(message = "Campo obrigatório")
    private Character block;

    @Positive(message = "Capacidade deve ser um valor positivo")
    private Integer capacity;
    private List<LocalDateTime> schedules;
    private List<String> dates;
    private String status;
}
