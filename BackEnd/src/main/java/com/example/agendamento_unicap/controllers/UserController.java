package com.example.agendamento_unicap.controllers;

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

    @GetMapping("/{RA}")
    public ResponseEntity<UserDTO> findById(@PathVariable Integer RA) {
        UserDTO user = userService.findById(RA);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDTO> save(@RequestBody UserDTO user) {
        user = userService.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Integer id, @RequestBody UserDTO dto) {
        UserDTO updated = userService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{RA}")
    public ResponseEntity<Void> delete(@PathVariable Integer RA) {
        userService.delete(RA);
        return ResponseEntity.noContent().build();
    }
}
