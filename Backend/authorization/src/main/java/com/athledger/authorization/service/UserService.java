package com.athledger.authorization.service;

import com.athledger.authorization.dao.UserDetails;
import com.athledger.authorization.dto.RegistrationRequest;
import com.athledger.authorization.dto.RegistrationResponse;
import com.athledger.authorization.impl.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserService {

    /*@Autowired
    private UserManager userManager;

    @GetMapping("/users/get")
    public ResponseEntity<Object> register(@RequestBody RegistrationRequest registrationRequest) {
        try{
            return ResponseEntity.status(200).body(userManager.getAllEntities());
        } catch(Exception e){
            return ResponseEntity.status(500).body(new RegistrationResponse());
        }
        //return ResponseEntity.ok(new RegistrationResponse());
    }*/
}
