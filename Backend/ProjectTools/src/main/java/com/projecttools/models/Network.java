package com.projecttools.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Network {
    @Id
    private UUID id;
    String name;
    String email;
    double rating;
    String contact;
    @ManyToOne
    Category category;
    @OneToMany
    List<Address> address;

}
