package com.example.agendamento_unicap.annotations;

import com.example.agendamento_unicap.dtos.ReservationDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalTime;

public class TimeOrderValidator implements ConstraintValidator<TimeOrderValid, ReservationDTO> {

    @Override
    public boolean isValid(ReservationDTO dto, ConstraintValidatorContext context) {

        LocalTime start = dto.getStartTime();
        LocalTime end = dto.getEndTime();

        if (start == null || end == null) {
            return true;
        }
        if (start.isAfter(end)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("O horário inicial não pode ser depois do horário final")
                    .addPropertyNode("startTime")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
