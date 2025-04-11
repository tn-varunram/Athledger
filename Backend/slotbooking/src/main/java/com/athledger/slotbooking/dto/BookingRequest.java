package com.athledger.slotbooking.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class BookingRequest {
    private String bookingid;

    private String bookingdate;
    private String bookingfrom;
    private String bookingto;
    private String sport;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingstatus;

    private String facility;
    private String userid;
    private String slotid;
}
