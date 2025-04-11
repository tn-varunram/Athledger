package com.athledger.authorization.controller;

import com.athledger.authorization.dto.*;
import com.athledger.authorization.impl.PasswordManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordUtilsService {

    @Autowired
    private PasswordManager passwordManager;

    @PostMapping("/forgot")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(ForgotPasswordResponse.builder().build());
        }
        return ResponseEntity.ok(ForgotPasswordResponse.builder().build());
    }

    @PostMapping("/reset")
    public ResponseEntity<ResetPasswordResponse> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(new ResetPasswordResponse());
        }
        return ResponseEntity.ok(new ResetPasswordResponse());
    }
}
