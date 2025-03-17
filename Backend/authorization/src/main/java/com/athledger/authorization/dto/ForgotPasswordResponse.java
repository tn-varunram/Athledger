package com.athledger.authorization.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ForgotPasswordResponse {
    String userName;
    String message;
    String status;
}
