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

import com.example.agendamento_unicap.dtos.ResourceDTO;
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
    public ResponseEntity<ResourceDTO> findById(@PathVariable int id) {
        ResourceDTO resource = resourceService.findById(id);
        return ResponseEntity.ok(resource);
    }

    @PostMapping
    public ResponseEntity<ResourceDTO> save(@RequestBody ResourceDTO resource) {
        resource = resourceService.save(resource);
        return ResponseEntity.ok(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        resourceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
