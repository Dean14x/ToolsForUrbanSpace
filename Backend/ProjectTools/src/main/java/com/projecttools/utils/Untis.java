package com.projecttools.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class Untis {

    public static String getUserName(){
        Object user = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        return user.toString();
    }
}
