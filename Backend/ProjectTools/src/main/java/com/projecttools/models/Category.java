package com.projecttools.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;

@Entity
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
@Setter
public class Category {

    @Id
    UUID id;
    @NonNull
    String name;

    public Category(){}

    public Category(String name){
        this.name = name;
    }
}
