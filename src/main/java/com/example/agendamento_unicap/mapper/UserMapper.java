package com.example.agendamento_unicap.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.example.agendamento_unicap.dtos.UserDTO;
import com.example.agendamento_unicap.entities.User;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User mapToUser(UserDTO userDTO);
    UserDTO mapToUserDTO(User user);
}
