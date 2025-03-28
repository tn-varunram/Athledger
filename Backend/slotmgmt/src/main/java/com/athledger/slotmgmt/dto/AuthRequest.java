package com.athledger.slotmgmt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthRequest {
    String userName;
    String userSessionId;
    String app;
}