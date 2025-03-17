package com.athledger.authorization.dto;

import lombok.Getter;

@Getter
public class LogoutRequest {

    String userName;
    String sessionId;
}
