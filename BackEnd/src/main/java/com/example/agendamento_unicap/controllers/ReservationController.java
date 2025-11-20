package com.example.agendamento_unicap.controllers;

import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.services.ReservationService;
import com.example.agendamento_unicap.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping
    public ResponseEntity<Page<ReservationDTO>> findAll(Pageable pageable) {
        Page<ReservationDTO> listreservations = reservationService.findAll(pageable);

        return ResponseEntity.ok(listreservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> findById(@PathVariable Integer id) {
        ReservationDTO reservation = reservationService.findById(id);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> save(@RequestBody ReservationDTO reservation) {
        reservation = reservationService.save(reservation);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> update(@PathVariable Integer id, @RequestBody ReservationDTO dto) {
        ReservationDTO updated = reservationService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}