package com.athledger.authorization.service;

import com.athledger.authorization.dto.AuthRequest;
import com.athledger.authorization.dto.AuthResponse;
import com.athledger.authorization.dto.LoginResponse;
import com.athledger.authorization.dto.RegistrationRequest;
import com.athledger.authorization.impl.UserSessionManager;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthService {

    @Autowired
    private UserSessionManager userSessionManager;

    @PostMapping("/auth")
    public ResponseEntity<AuthResponse> auth(@RequestBody AuthRequest authRequest) {
        try{
            Boolean authStatus = userSessionManager.authorizeBasedOnRole(authRequest);
            if (authStatus) {
                return ResponseEntity.ok(AuthResponse.builder().build());
            }
            else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch(Exception e){
            return ResponseEntity.status(500).body(AuthResponse.builder().build());
        }

    }
}
