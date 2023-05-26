package com.projecttools.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.rmi.server.UID;

@Entity
@Getter
@Setter
public class UserResources {
    @Id
    private UID id;
    private int amount;
    private boolean available;


}
