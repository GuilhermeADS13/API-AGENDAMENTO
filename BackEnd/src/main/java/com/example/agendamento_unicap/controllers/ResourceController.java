package com.example.agendamento_unicap.controllers;

import com.example.agendamento_unicap.dtos.ResourceDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.agendamento_unicap.services.ResourceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    ResourceService resourceService;

    @GetMapping
    public ResponseEntity<Page<ResourceDTO>> findAll(Pageable pageable) {
        Page<ResourceDTO> listResources = resourceService.findAll(pageable);

        return ResponseEntity.ok(listResources);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceDTO> findById(@PathVariable Integer id) {
        ResourceDTO resource = resourceService.findById(id);
        return ResponseEntity.ok(resource);
    }

    @PostMapping
    public ResponseEntity<ResourceDTO> save(@Valid @RequestBody ResourceDTO resource) {
        resource = resourceService.save(resource);
        return ResponseEntity.ok(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceDTO> update(@PathVariable Integer id, @Valid @RequestBody ResourceDTO dto) {
        ResourceDTO updated = resourceService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        resourceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
