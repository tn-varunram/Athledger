package com.athledger.slotbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    String bookingId;
    String userName;
    String sport;
    String sportId;
    String date;
    String fromTime;
    String endTime;
    String court;
    int noOfPeople;
}
