package com.projecttools.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class User {
    @Id
    private UUID id;
    private String name;
    private String email;
    private String password;
    private double budget;
    private boolean is_Admin;
    @OneToMany
    List<UserResources> resourcesNeeded;
    @OneToMany
    List<UserResources> resourcesAvailable;
    @ManyToMany
    List<Network> networksNeeded;
    @ManyToMany
    List<Network> networksAvailable;

}
