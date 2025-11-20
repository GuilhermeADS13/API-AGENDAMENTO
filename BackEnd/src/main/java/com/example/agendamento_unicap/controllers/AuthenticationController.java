package com.example.agendamento_unicap.controllers;

import com.example.agendamento_unicap.Infra.security.TokenService;
import com.example.agendamento_unicap.dtos.LoginResposeDTO;
import com.example.agendamento_unicap.dtos.RegisterDTO;
import com.example.agendamento_unicap.entities.User;
import com.example.agendamento_unicap.repositories.UserRepository;
import jakarta.validation.Valid;
import com.example.agendamento_unicap.dtos.AuthenticationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.name(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResposeDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.userRepository.findByName(data.name()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword, data.role());

        System.out.println(newUser.toString());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
