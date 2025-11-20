package com.example.agendamento_unicap.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TimeOrderValidator.class)
public @interface TimeOrderValid {
    String message() default "O horário inicial não pode ser depois do horário final";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
