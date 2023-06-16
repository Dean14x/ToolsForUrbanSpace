package com.projecttools.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projecttools.models.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCredentials {

    private String email;
    private String password;
    private double budget;
    private String name;
    @JsonIgnore
    private boolean isAdmin;


    public static User userCreditingToUser(UserCredentials userCredentials){
        return  new User(userCredentials.getName(), userCredentials.getEmail(), userCredentials.getPassword(), userCredentials.getBudget(), userCredentials.isAdmin());
    }
}
