package com.athledger.slotbooking.dao;

import com.athledger.slotbooking.dto.BookingRequest;
import com.athledger.slotbooking.dto.BookingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    private String bookingid;

    private LocalDate bookingdate;
    private LocalTime bookingfrom;
    private LocalTime bookingto;
    private String sport;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingstatus;

    private String facility;
    private String userid;
    private String slotid;

    // Getters, Setters, Constructors
    public Booking(BookingRequest bookingRequest) {
        this.bookingid = bookingRequest.getBookingid();
        this.sport = bookingRequest.getSport();
        this.bookingstatus = bookingRequest.getBookingstatus();
        this.facility = bookingRequest.getFacility();
        this.userid = bookingRequest.getUserid();
        this.slotid = bookingRequest.getSlotid();
        this.bookingdate = LocalDate.parse(bookingRequest.getBookingdate());
        this.bookingfrom = LocalTime.parse(bookingRequest.getBookingfrom());
        this.bookingto = LocalTime.parse(bookingRequest.getBookingto());
    }

    public Booking(){
    }
}

