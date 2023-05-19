package com.projecttools.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.UUID;

@Entity
public class Address {
    @Id
    UUID id;
    String zipcode;
    String street;
    String number;
    @ManyToOne
    Network network;
}
