package com.projecttools.service;


import com.projecttools.exception.NotFoundException;
import com.projecttools.models.User;
import com.projecttools.repository.UserRepository;
import com.projecttools.request.UserCredentials;
import com.projecttools.utils.Untis;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    public static final String JWT_KEY = "jxgEQeXHuPq8VdbyYFNkANdudQ53YUn4";
    public static final String JWT_HEADER = "Authorization";
    private UserRepository useRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthService(UserRepository useRepository) {
        this.useRepository = useRepository;
    }

    public String getToken(Map<String, String> authentication) {
        String email=authentication.get("username");
        Optional<User> user = useRepository.findByEmail(authentication.get("username"));
        if (user.isPresent()&& bCryptPasswordEncoder.matches(authentication.get("password"),user.get().getPassword())) {
            String role = user.get().is_Admin() ? "admin" : "user";
            String jwt = "";
            SecretKey key = Keys.hmacShaKeyFor(JWT_KEY.getBytes(StandardCharsets.UTF_8));
            jwt = Jwts.builder().setIssuer("Eazy Bank").setSubject("JWT Token")
                    .claim("username", authentication.get("username"))
                    .claim("authorities", role)
                    .signWith(key).compact();
            return jwt;
        }

        throw new NotFoundException("Email or password are Wrong");

    }


    public void registerUser(UserCredentials userCredentials) {
        userCredentials.setPassword(bCryptPasswordEncoder.encode( userCredentials.getPassword()));
        useRepository.save(UserCredentials.userCreditingToUser(userCredentials));
    }

    public User getUser(Authentication authentication) {
        return useRepository.findByEmail(Untis.getUserName()).get();
    }
}
