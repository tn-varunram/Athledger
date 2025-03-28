package com.athledger.slotmgmt.impl;

import com.athledger.slotmgmt.dto.AuthRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@Service
public class AuthorizationService {

    private String authBaseUrl = "http://localhost:8083/auth";

    public Boolean authorizeRequestBasedOnRole(String userName, String userSessionId, String app){
        RestClient restClient = RestClient.create();
        AuthRequest authRequest = AuthRequest.builder()
                .app(app)
                .userName(userName)
                .userSessionId(userSessionId).build();
        ResponseEntity<Void> response = restClient.post()
                .uri(authBaseUrl)
                .contentType(APPLICATION_JSON)
                .body(authRequest)
                .retrieve()
                .toBodilessEntity();
        if (response.getStatusCode().is2xxSuccessful()) {
            return true;
        } else
            return false;
    }
}
