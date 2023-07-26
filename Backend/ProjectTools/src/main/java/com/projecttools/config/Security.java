package com.projecttools.config;


import com.projecttools.filter.JWTTokenValidatorFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;


@Configuration
public class Security {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpRequest) throws Exception {

        httpRequest
                .cors(AbstractHttpConfigurer::disable).authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->

                {
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/auth/**", "/test/**")
                            .permitAll()
                            .requestMatchers("/admin/**", "/user/**")
                            .authenticated()
                            .anyRequest().permitAll();

                })
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(new JWTTokenValidatorFilter(), BasicAuthenticationFilter.class)
                .formLogin().disable()
                .httpBasic().disable()
                .httpBasic().disable();
        return httpRequest.build();

    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
