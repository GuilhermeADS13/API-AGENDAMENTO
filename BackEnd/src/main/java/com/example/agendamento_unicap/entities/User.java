package com.example.agendamento_unicap.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_user")
public class User {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer RA;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToMany
    @JoinTable(
            name = "tb_users_classrooms",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "classroom_id")
    )
    private List<Classroom> classrooms;

    @ManyToMany
    @JoinTable(
            name = "tb_users_resources",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "resource_id")
    )
    private List<Resource> resources;
}
