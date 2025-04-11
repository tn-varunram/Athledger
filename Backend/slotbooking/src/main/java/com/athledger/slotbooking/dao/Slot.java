package com.athledger.slotbooking.dao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "slots")
public class Slot {

    @Id
    private String slotid;

    private String sport;
    private String facility;

    @Column(name = "start")
    private LocalTime start;

    @Column(name = "end")
    private LocalTime end;

    private LocalDate date;

    // Getters, Setters, Constructors
}

