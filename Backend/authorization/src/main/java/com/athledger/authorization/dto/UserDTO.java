package com.athledger.authorization.dto;

import com.athledger.authorization.dao.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private String userId;
    private String username;
    private String email;
    private String dob;
    private String roleType;

    //constructor
    public UserDTO(User user) {
        this.userId = user.getUserid();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.dob = user.getDob();
        this.roleType = user.getRole();
    }

    public UserDTO(){

    }

    // getters and setters


}

