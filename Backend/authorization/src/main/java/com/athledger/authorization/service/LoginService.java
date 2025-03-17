package com.athledger.authorization.service;

import com.athledger.authorization.dto.LoginRequest;
import com.athledger.authorization.dto.LoginResponse;
import com.athledger.authorization.dto.LogoutRequest;
import com.athledger.authorization.dto.LogoutResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginService {

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
}
