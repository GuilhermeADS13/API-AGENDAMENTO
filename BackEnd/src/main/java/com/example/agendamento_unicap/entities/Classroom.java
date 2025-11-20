package com.example.agendamento_unicap.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.example.agendamento_unicap.enums.StatusEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_classroom")
public class Classroom extends Reservation{
    private String classNumber;
    private char block;
    private Integer capacity;
    private List<LocalDateTime> schedules;
    private List<String> dates;
    private String status;

}
