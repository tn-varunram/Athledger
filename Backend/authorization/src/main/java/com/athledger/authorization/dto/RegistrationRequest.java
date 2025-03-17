package com.athledger.authorization.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {

    String userName;
    String password;
    String dob;
    String type;
    String email;

}
