package com.projecttools.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

// will just run when Basic and from Login able
public class ForUrbanDateils implements AuthenticationProvider {


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String authentication1 = authentication.getName();
        ArrayList arrayList=new ArrayList<GrantedAuthority>();
        arrayList.add(new SimpleGrantedAuthority("admin"));
        return new UsernamePasswordAuthenticationToken(authentication.getName(), authentication.getCredentials().toString(), arrayList);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}

//TODO complete this class and make authenticationToken Token
