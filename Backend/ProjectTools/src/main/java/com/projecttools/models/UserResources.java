package com.projecttools.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.rmi.server.UID;
import java.util.UUID;

@Entity
@Getter
@Setter
public class UserResources {
    @Id
    private UUID id;
    private int amount;
    private boolean available;

    @ManyToOne
    Resource resource;


}
