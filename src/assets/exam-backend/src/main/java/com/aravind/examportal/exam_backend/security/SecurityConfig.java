package com.aravind.examportal.exam_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/users/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic();  // Basic Auth enabled only for protected endpoints

        http.headers().frameOptions().disable(); // for H2 console if needed
        return http.build();
    }
}
