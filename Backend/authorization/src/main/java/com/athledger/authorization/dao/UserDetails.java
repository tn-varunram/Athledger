package com.athledger.authorization.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "USER")
@Getter
public class UserDetails {

    String username;
    @Id
    String userid;
    String email;
    String dob;
}
