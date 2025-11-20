package com.example.agendamento_unicap.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_resource")
public class Resource extends Reservation{

    @Column(nullable = false)
    private int quantity;
    @Column(columnDefinition = "TEXT")
    private String description;
}
