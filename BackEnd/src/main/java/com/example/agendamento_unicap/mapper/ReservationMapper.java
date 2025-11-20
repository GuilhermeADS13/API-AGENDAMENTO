package com.example.agendamento_unicap.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.entities.Reservation;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ReservationMapper {
    Reservation mapToReservation(ReservationDTO dto);
    ReservationDTO mapToReservationDTO(Reservation reservation);
}
