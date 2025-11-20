package com.example.agendamento_unicap.controllers;

import com.example.agendamento_unicap.dtos.ClassroomDTO;
import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.entities.User;
import com.example.agendamento_unicap.services.ClassroomService;
import com.example.agendamento_unicap.services.ResourceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.agendamento_unicap.dtos.UserDTO;
import com.example.agendamento_unicap.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable) {
        Page<UserDTO> listUsers = userService.findAll(pageable);

        return ResponseEntity.ok(listUsers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Integer id) {
        UserDTO user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDTO> save(@Valid @RequestBody UserDTO user) {
        user = userService.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Integer id, @Valid @RequestBody UserDTO dto) {
        UserDTO updated = userService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{userId}/classroom/{classroomId}")
    public ResponseEntity<UserDTO> classroomReservation(@PathVariable Integer userId, @PathVariable Integer classroomId, @Valid @RequestBody ReservationDTO reservationDTO) {
        UserDTO dto = userService.classroomReservation(userId, classroomId, reservationDTO);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("{userId}/resource/{resourceId}")
    public ResponseEntity<UserDTO> resourceReservation(@PathVariable Integer userId, @PathVariable Integer resourceId, @Valid @RequestBody ReservationDTO reservationDTO) {
        UserDTO dto = userService.resourceReservation(userId, resourceId, reservationDTO);
        return ResponseEntity.ok(dto);
    }
}
