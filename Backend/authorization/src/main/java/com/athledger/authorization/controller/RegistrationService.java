package com.athledger.authorization.controller;

import com.athledger.authorization.dto.RegistrationRequest;
import com.athledger.authorization.dto.RegistrationResponse;
import com.athledger.authorization.impl.PasswordManager;
import com.athledger.authorization.impl.UserManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
public class RegistrationService {

    @Autowired
    private PasswordManager passwordManager;

    @Autowired
    UserManager userManager;

    private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest) {
        try{
            logger.info("Got new registration request with username : {}", registrationRequest.getUsername());
            userManager.register(registrationRequest);
            logger.info("Processed registration request for user :{}", registrationRequest.getUsername());
            return ResponseEntity.ok(Collections.singletonMap("status", "User Successfuly created"));
        } catch(Exception e){
            logger.error("Registration request failed with exception ", e);
            return ResponseEntity.status(500).body(new RegistrationResponse());
        }
        //return ResponseEntity.ok(new RegistrationResponse());
    }
}
