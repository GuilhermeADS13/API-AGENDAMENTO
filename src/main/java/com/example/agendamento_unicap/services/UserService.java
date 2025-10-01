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
    public UserDTO findById(Long RA) {
        Optional<User> obj = userRepository.findById(RA);
        User entity = obj.orElseThrow();

        return userMapper.mapToUserDTO(entity);
    }

    @Transactional
    public UserDTO save(UserDTO dto) {
        User entity = userRepository.save(userMapper.mapToUser(dto));

        return userMapper.mapToUserDTO(entity);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long RA) {
        if (!userRepository.existsById(RA)) {
            throw new IllegalArgumentException("Id not found " + RA);
        }

        try {
            userRepository.deleteById(RA);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Integrity violation");
        }
    }
    
}
