package com.projecttools.request;

import com.projecttools.models.User;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserCrediting {

    private String email;
    private String password;
    private double budget;
    private String name;


    public static User userCreditingToUser(UserCrediting userCrediting){
        return  new User(userCrediting.getName(),userCrediting.getEmail(),userCrediting.getPassword(),userCrediting.getBudget(),false);
    }
}
