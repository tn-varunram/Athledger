package com.athledger.authorization.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthRequest {
    String userName;
    String userSessionId;
    String app;
}
