package com.example.agendamento_unicap.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<UserDTO> findById(@PathVariable Long RA) {
        UserDTO user = userService.findById(RA);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDTO> save(@RequestBody UserDTO user) {
        user = userService.save(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{RA}")
    public ResponseEntity<Void> delete(@PathVariable Long RA) {
        userService.delete(RA);
        return ResponseEntity.noContent().build();
    }
}
