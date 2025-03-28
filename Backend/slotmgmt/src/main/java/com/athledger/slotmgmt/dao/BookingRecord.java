package com.athledger.slotmgmt.dao;

import lombok.Getter;

@Getter
public class BookingRecord {

    String userId;
    String bookingId;
    String from;
    String end;
    String date;
    int ppl;
    String sfId;
    String sportId;
    String status;
}
