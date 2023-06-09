package com.projecttools.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Network {
    @Id
    private UUID id;
    String name;
    String email;
    double rating;
    String contact;
    String city;
    String street;
    @ManyToOne
    Category category;

    public Network(){}

    public Network(String name,String email,double rating,String contact,String city,String street,Category category){
        this.id=UUID.randomUUID();
        this.name = name;
        this.email=email;
        this.rating=rating;
        this.contact = contact;
        this.city = city;
        this.street = street;
        this.category = category;
    }

}
