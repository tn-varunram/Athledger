package com.athledger.slotmgmt.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sports")
public class Sport {

    @Id
    private String sportid;

    private String sport;
    private String facility;
    private int capacity;
    private String sfid;

    // Getters, Setters, Constructors
}

