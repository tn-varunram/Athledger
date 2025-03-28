package com.athledger.authorization.impl;

import com.athledger.authorization.dto.AuthRequest;
import org.springframework.stereotype.Component;

@Component
public class UserSessionManager {

    //dummy implementation, actual implementation will talk to DB and based on Roles would decide whether to allow or not.
    public Boolean authorizeBasedOnRole(AuthRequest authRequest) {
        return authRequest.getUserSessionId().contains("admin");
    }
}
