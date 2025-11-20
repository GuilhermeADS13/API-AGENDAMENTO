package com.example.agendamento_unicap.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.agendamento_unicap.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByName(String name);
}
