package com.athledger.slotbooking.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookingResponse {
    String bookingId;
    String userName;
    String sport;
    String date;
    String fromTime;
    String endTime;
    String court;
    int noOfPeople;
    String status;
    String statusCode;
}
