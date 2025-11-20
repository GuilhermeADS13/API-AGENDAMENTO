package com.example.agendamento_unicap.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.agendamento_unicap.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

}
