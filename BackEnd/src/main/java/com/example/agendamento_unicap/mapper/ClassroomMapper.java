package com.example.agendamento_unicap.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.example.agendamento_unicap.dtos.ClassroomDTO;
import com.example.agendamento_unicap.entities.Classroom;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ClassroomMapper {
    Classroom mapToClassroom(ClassroomDTO classroomDTO);
    ClassroomDTO mapToClassroomDTO(Classroom classroom);
}
