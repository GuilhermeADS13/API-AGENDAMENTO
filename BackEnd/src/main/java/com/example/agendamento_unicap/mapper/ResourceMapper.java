package com.example.agendamento_unicap.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.example.agendamento_unicap.dtos.ResourceDTO;
import com.example.agendamento_unicap.entities.Resource;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ResourceMapper {
    Resource mapToResource(ResourceDTO resourceDTO);
    ResourceDTO mapToResourceDTO(Resource resource);
}
