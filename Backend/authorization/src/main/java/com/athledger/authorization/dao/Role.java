package com.athledger.authorization.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;
    String type;
}
