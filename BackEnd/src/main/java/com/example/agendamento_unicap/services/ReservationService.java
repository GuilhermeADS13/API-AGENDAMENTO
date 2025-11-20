package com.example.agendamento_unicap.services;

import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.dtos.ReservationDTO;
import com.example.agendamento_unicap.entities.Reservation;
import com.example.agendamento_unicap.entities.Reservation;
import com.example.agendamento_unicap.mapper.ReservationMapper;
import com.example.agendamento_unicap.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ReservationService{
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    ReservationMapper reservationMapper;

    @Transactional(readOnly = true)
    public Page<ReservationDTO> findAll(Pageable pageable) {
        Page<Reservation> result = reservationRepository.findAll(pageable);

        return result.map(x -> reservationMapper.mapToReservationDTO(x));
    }

    @Transactional(readOnly = true)
    public ReservationDTO findById(Integer RA) {
        Optional<Reservation> obj = reservationRepository.findById(RA);
        Reservation entity = obj.orElseThrow();

        return reservationMapper.mapToReservationDTO(entity);
    }

    @Transactional
    public ReservationDTO save(ReservationDTO dto) {
        Reservation entity = reservationRepository.save(reservationMapper.mapToReservation(dto));

        return reservationMapper.mapToReservationDTO(entity);
    }

    @Transactional
    public ReservationDTO update(Integer id, ReservationDTO dto) {
        Reservation entity = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado: " + id));

        if (dto.getReservationDate() != null) {
            entity.setReservationDate(dto.getReservationDate());
        }
        if (dto.getStartTime() != null) {
            entity.setStartTime(dto.getStartTime());
        }
        if (dto.getEndTime() != null) {
            entity.setEndTime(dto.getEndTime());
        }
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }

        entity = reservationRepository.save(entity);

        return reservationMapper.mapToReservationDTO(entity);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Integer RA) {
        if (!reservationRepository.existsById(RA)) {
            throw new IllegalArgumentException("Id not found " + RA);
        }

        try {
            reservationRepository.deleteById(RA);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Integrity violation");
        }
    }
}