package com.example.agendamento_unicap.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.example.agendamento_unicap.dtos.ClassroomDTO;
import com.example.agendamento_unicap.entities.Classroom;
import com.example.agendamento_unicap.mapper.ClassroomMapper;
import com.example.agendamento_unicap.repositories.ClassroomRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class ClassroomService {
    @Autowired
    ClassroomRepository classroomRepository;

    @Autowired
    ClassroomMapper classroomMapper;

    @Transactional(readOnly = true)
    public Page<ClassroomDTO> findAll(Pageable pageable) {
        Page<Classroom> result = classroomRepository.findAll(pageable);

        return result.map(x -> classroomMapper.mapToClassroomDTO(x));
    }

    @Transactional(readOnly = true)
    public ClassroomDTO findById(int id) {
        Optional<Classroom> obj = classroomRepository.findById(id);
        Classroom entity = obj.orElseThrow();

        return classroomMapper.mapToClassroomDTO(entity);
    }

    @Transactional
    public ClassroomDTO save(ClassroomDTO dto) {
        Classroom entity = classroomRepository.save(classroomMapper.mapToClassroom(dto));

        return classroomMapper.mapToClassroomDTO(entity);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(int id) {
        if (!classroomRepository.existsById(id)) {
            throw new IllegalArgumentException("Id not found " + id);
        }

        try {
            classroomRepository.deleteById(id);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Integrity violation");
        }
    }
    
}
