package com.athledger.authorization.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordRequest {

    String userName;
    String userId;
    String emailId;
}
