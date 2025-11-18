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

import com.example.agendamento_unicap.dtos.ClassroomDTO;
import com.example.agendamento_unicap.services.ClassroomService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/classroom")
public class ClassroomController {

    @Autowired
    ClassroomService classroomService;

    @GetMapping
    public ResponseEntity<Page<ClassroomDTO>> findAll(Pageable pageable) {
        Page<ClassroomDTO> listclassrooms = classroomService.findAll(pageable);

        return ResponseEntity.ok(listclassrooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomDTO> findById(@PathVariable int id) {
        ClassroomDTO classroom = classroomService.findById(id);
        return ResponseEntity.ok(classroom);
    }

    @PostMapping
    public ResponseEntity<ClassroomDTO> save(@RequestBody ClassroomDTO classroom) {
        classroom = classroomService.save(classroom);
        return ResponseEntity.ok(classroom);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        classroomService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
