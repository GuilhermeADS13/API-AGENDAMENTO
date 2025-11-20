package com.example.agendamento_unicap.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceDTO {
    private Integer id;
    private int quantity;
    private String description;
    private String status;
}
