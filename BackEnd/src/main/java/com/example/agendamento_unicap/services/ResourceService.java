package com.example.agendamento_unicap.services;

import java.util.Optional;

import com.example.agendamento_unicap.dtos.ResourceDTO;
import com.example.agendamento_unicap.entities.Resource;
import com.example.agendamento_unicap.services.exceptions.DatabaseException;
import com.example.agendamento_unicap.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.example.agendamento_unicap.dtos.ResourceDTO;
import com.example.agendamento_unicap.entities.Resource;
import com.example.agendamento_unicap.mapper.ResourceMapper;
import com.example.agendamento_unicap.repositories.ResourceRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class ResourceService {
    @Autowired
    ResourceRepository resourceRepository;

    @Autowired
    ResourceMapper resourceMapper;

    @Transactional(readOnly = true)
    public Page<ResourceDTO> findAll(Pageable pageable) {
        Page<Resource> result = resourceRepository.findAll(pageable);

        return result.map(x -> resourceMapper.mapToResourceDTO(x));
    }

    @Transactional(readOnly = true)
    public ResourceDTO findById(int id) {
        Optional<Resource> obj = resourceRepository.findById(id);
        Resource entity = obj.orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));

        return resourceMapper.mapToResourceDTO(entity);
    }

    @Transactional
    public ResourceDTO save(ResourceDTO dto) {
        Resource entity = resourceRepository.save(resourceMapper.mapToResource(dto));

        return resourceMapper.mapToResourceDTO(entity);
    }

    @Transactional
    public ResourceDTO update(Integer id, ResourceDTO dto) {
        Resource entity = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso nao encontrado: " + id));

        if (dto.getDescription() != null) {
            entity.setDescription(dto.getDescription());
        }
        if (dto.getQuantity() != 0) {
            entity.setQuantity(dto.getQuantity());
        }

        entity = resourceRepository.save(entity);

        return resourceMapper.mapToResourceDTO(entity);
    }
    
    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(int id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id not found " + id);
        }

        try {
            resourceRepository.deleteById(id);

        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
    
}
