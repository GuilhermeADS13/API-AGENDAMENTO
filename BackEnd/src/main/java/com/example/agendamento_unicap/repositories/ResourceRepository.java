package com.example.agendamento_unicap.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.agendamento_unicap.entities.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    
}
