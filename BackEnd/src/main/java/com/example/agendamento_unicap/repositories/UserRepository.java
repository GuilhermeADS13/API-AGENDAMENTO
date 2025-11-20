package com.example.agendamento_unicap.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.agendamento_unicap.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    
}
