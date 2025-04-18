package com.athledger.authorization.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/user")
    public Map<String, Object> getAuthenticatedUser(@AuthenticationPrincipal UserDetails user) {
        Map<String, Object> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("roles", user.getAuthorities()); // returns List of roles like [ROLE_USER]
        return response;
    }
}