package com.athledger.authorization.controller;

import com.athledger.authorization.dto.*;
import com.athledger.authorization.impl.UserManager;
import com.athledger.authorization.impl.UserSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private UserSessionManager userSessionManager;

    @Autowired
    private UserManager userManager;

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try{
           return userManager.login(loginRequest);
        } catch(Exception e){
            return ResponseEntity.status(500).body(new LoginResponse());
        }
        //return ResponseEntity.ok(new LoginResponse());
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

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String userId){
        try{
            logger.info("Got a new request for fetching user by id : {}", userId);
            UserDTO userDTO = userManager.getUserById(userId);
            logger.info("Finished fetching user : {}", userDTO);
            return ResponseEntity.status(200).body(userDTO);
        } catch(Exception e){
            logger.error("Error when fetchig user by id ", e);
            return ResponseEntity.status(500).body(new UserDTO());
        }
    }
}
