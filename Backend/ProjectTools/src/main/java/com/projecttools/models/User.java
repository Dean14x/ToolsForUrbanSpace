package com.projecttools.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class User {
    @Id
    private UUID id;
    private char name;
    private char email;
    private char password;
    private double budget;
    private boolean is_Admin;

}
