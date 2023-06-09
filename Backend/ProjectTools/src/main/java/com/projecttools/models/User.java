package com.projecttools.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "user_table")
public class User {
    @Id
    private UUID id;
    private String name;
    private String email;
    private String password;
    private double budget;
    private boolean is_Admin;

    public User(){}

    public User(String name, String email, String password, double budget, boolean is_Admin, List<UserResources> resourcesNeeded, List<UserResources> resourcesAvailable, List<Network> networksNeeded, List<Network> networksAvailable) {
        this.id= UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.budget = budget;
        this.is_Admin = is_Admin;
        this.resourcesNeeded = resourcesNeeded;
        this.resourcesAvailable = resourcesAvailable;
        this.networksNeeded = networksNeeded;
        this.networksAvailable = networksAvailable;
    }

    public User(String name, String email, String password, double budget, boolean is_Admin) {
        this.id= UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.budget = budget;
        this.is_Admin = is_Admin;
    }

    @OneToMany(fetch = FetchType.EAGER)
    List<UserResources> resourcesNeeded;
    @OneToMany(fetch = FetchType.EAGER)
    List<UserResources> resourcesAvailable;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_network_needed",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "network_id"))
    List<Network> networksNeeded;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_network_available",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "network_id"))
    List<Network> networksAvailable;

}
