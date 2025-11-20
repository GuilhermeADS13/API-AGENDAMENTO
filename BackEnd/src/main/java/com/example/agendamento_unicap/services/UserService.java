package com.example.agendamento_unicap.services;

import java.util.Optional;

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
import org.springframework.web.bind.annotation.PathVariable;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(Pageable pageable) {
        Page<User> result = userRepository.findAll(pageable);

        return result.map(x -> userMapper.mapToUserDTO(x));
    }

    @Transactional(readOnly = true)
    public UserDTO findById(Integer RA) {
        Optional<User> obj = userRepository.findById(RA);
        User entity = obj.orElseThrow();

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
                .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado: " + id));

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
    public void delete(Integer RA) {
        if (!userRepository.existsById(RA)) {
            throw new IllegalArgumentException("Ra nao encontrado:" + RA);
        }

        try {
            userRepository.deleteById(RA);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Violacao de integridade");
        }
    }
    
}
