package com.projecttools.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class Resource {
    @Id
    UUID id;
    String name;
    String description;
    double cost;
    @ManyToOne
    Category category;

    public Resource() {
    }

    public Resource(String name, String description, double cost, Category category) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.category = category;
    }
}
