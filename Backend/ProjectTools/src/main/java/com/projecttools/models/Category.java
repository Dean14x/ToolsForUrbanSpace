package com.projecttools.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity
public class Category {
    @Id
    UUID id;
    String name;

    public Category(){}

    public Category(String name){
        this.name = name;
    }
}
