package com.example.agendamento_unicap.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.agendamento_unicap.entities.Classroom;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
    
}
