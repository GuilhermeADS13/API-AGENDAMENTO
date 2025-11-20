package com.example.agendamento_unicap.services.exceptions;

public class ReservationNotAvailableException extends RuntimeException {
    public ReservationNotAvailableException(String message) {
        super(message);
    }
}
