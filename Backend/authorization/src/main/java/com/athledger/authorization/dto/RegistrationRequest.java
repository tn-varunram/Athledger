package com.athledger.authorization.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {

    String username;
    String password;
    String dob;
    String email;
    String role;

}
