package com.projecttools.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    @JoinColumn(name = "user_id")
    @JsonIgnore

    private User user;
    @ManyToOne
    Resource resource;

    public UserResources(){}

    public UserResources(int amount, boolean available, User user, Resource resource) {
        this.id=UUID.randomUUID();
        this.amount = amount;
        this.available = available;
        this.user = user;
        this.resource = resource;
    }
}
