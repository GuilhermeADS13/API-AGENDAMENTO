package com.example.agendamento_unicap.services;

import java.util.Optional;

import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.entities.Classroom;
import com.example.agendamento_unicap.entities.Resource;
import com.example.agendamento_unicap.enums.StatusEnum;
import com.example.agendamento_unicap.repositories.ClassroomRepository;
import com.example.agendamento_unicap.repositories.ResourceRepository;
import com.example.agendamento_unicap.services.exceptions.DatabaseException;
import com.example.agendamento_unicap.services.exceptions.ReservationNotAvailableException;
import com.example.agendamento_unicap.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.example.agendamento_unicap.dtos.UserDTO;
import com.example.agendamento_unicap.entities.User;
import com.example.agendamento_unicap.mapper.UserMapper;
import com.example.agendamento_unicap.repositories.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    ClassroomRepository classroomRepository;

    @Autowired
    ResourceRepository resourceRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(Pageable pageable) {
        Page<User> result = userRepository.findAll(pageable);

        return result.map(x -> userMapper.mapToUserDTO(x));
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Integer id) {
        Optional<User> obj = userRepository.findById(id);
        User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        return userMapper.mapToUserDTO(entity);
    }

    @Transactional
    public UserDTO save(UserDTO dto) {
        User entity = userRepository.save(userMapper.mapToUser(dto));

        return userMapper.mapToUserDTO(entity);
    }

    @Transactional
    public UserDTO update(Integer id, UserDTO dto) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario nao encontrado: " + id));

        if (dto.getName() != null) {
            entity.setName(dto.getName());
        }
        if (dto.getEmail() != null) {
            entity.setEmail(dto.getEmail());
        }
        if (dto.getClassrooms() != null) {
            entity.setClassrooms(dto.getClassrooms());
        }
        if (dto.getResources() != null) {
            entity.setResources(dto.getResources());
        }

        entity = userRepository.save(entity);

        return userMapper.mapToUserDTO(entity);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ra nao encontrado: " + id);
        }

        try {
            userRepository.deleteById(id);

        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Violacao de integridade");
        }
    }

    @Transactional
    public UserDTO classroomReservation(Integer userId, Integer classroomId, ReservationDTO reservationDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException("Sala de aula não encontrada"));

        if (!classroom.getStatus().equals("Disponivel")) {
            throw new ReservationNotAvailableException("Sala de aula indisponível");
        }

        classroom.setReservationDate(reservationDTO.getReservationDate());
        classroom.setStartTime(reservationDTO.getStartTime());
        classroom.setEndTime(reservationDTO.getEndTime());
        classroom.setStatus("Ocupado");

        user.getClassrooms().add(classroom);
        userRepository.save(user);

        return userMapper.mapToUserDTO(user);
    }

    @Transactional
    public UserDTO resourceReservation(Integer userId, Integer resourceId, ReservationDTO reservationDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Classroom not found"));

        if (resource.getQuantity() <= 0) {
            throw new ReservationNotAvailableException("Quantidade insuficiente do recurso");
        }

        resource.setReservationDate(reservationDTO.getReservationDate());
        resource.setStartTime(reservationDTO.getStartTime());
        resource.setEndTime(reservationDTO.getEndTime());
        resource.setQuantity(resource.getQuantity() - 1);

        user.getResources().add(resource);
        userRepository.save(user);

        return userMapper.mapToUserDTO(user);
    }
}
