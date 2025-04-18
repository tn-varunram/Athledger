package com.athledger.authorization.controller;

import com.athledger.authorization.dto.*;
import com.athledger.authorization.impl.UserManager;
import com.athledger.authorization.impl.UserSessionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Authentication", description = "Auth API including login, register, JWT")
@RestController
public class LoginController {

    @Autowired
    private UserSessionManager userSessionManager;

    @Autowired
    private UserManager userManager;

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Operation(summary = "Login user", description = "Authenticate user with credentials")
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try{
            logger.info("Got new request for login from user : {}", loginRequest.getUsername());
            ResponseEntity<?> response = userManager.login(loginRequest);
            logger.info("Processed login request for user : {}", loginRequest.getUsername());
            return response;
        } catch(Exception e){
            logger.error("Error processing login request for user : {}", loginRequest.getUsername(), e);
            return ResponseEntity.status(500).body(new LoginResponse());
        }
        //return ResponseEntity.ok(new LoginResponse());
    }

    @Operation(summary = "View users", description = "View all users")
    @GetMapping("/users")
    public ResponseEntity<Object> register() {
        try{
            return ResponseEntity.status(200).body(userManager.getAllEntities());
        } catch(Exception e){
            return ResponseEntity.status(500).body(new RegistrationResponse());
        }
        //return ResponseEntity.ok(new RegistrationResponse());
    }

    @Operation(summary = "View user", description = "Get user by id")
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
