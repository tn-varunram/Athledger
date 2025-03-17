package com.athledger.authorization.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {

    String userName;
    String newPassword;
    String confirmPassword;
    String oldPassword;

}
