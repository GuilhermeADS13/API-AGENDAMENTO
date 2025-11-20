package com.example.agendamento_unicap.dtos;

import com.example.agendamento_unicap.entities.UserRole;

public record RegisterDTO(String name, String email, String password, UserRole role) {
}
