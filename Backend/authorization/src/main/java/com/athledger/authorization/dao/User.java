package com.athledger.authorization.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "user")
public class User {

    String username;
    @Id
    String userid;
    String email;
    String dob;
    String role;
    String password;
}

