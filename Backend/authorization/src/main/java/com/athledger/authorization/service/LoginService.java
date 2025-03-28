package com.athledger.authorization.service;

import com.athledger.authorization.dto.*;
import com.athledger.authorization.impl.UserManager;
import com.athledger.authorization.impl.UserSessionManager;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginService {

    @Autowired
    private UserSessionManager userSessionManager;

    @Autowired
    private UserManager userManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(new LoginResponse());
        }
        return ResponseEntity.ok(new LoginResponse());
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(@RequestBody LogoutRequest logoutRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(new LogoutResponse());
        }
        return ResponseEntity.ok(new LogoutResponse());
    }

    @GetMapping("/users/get")
    public ResponseEntity<Object> register() {
        try{
            return ResponseEntity.status(200).body(userManager.getAllEntities());
        } catch(Exception e){
            return ResponseEntity.status(500).body(new RegistrationResponse());
        }
        //return ResponseEntity.ok(new RegistrationResponse());
    }
}
