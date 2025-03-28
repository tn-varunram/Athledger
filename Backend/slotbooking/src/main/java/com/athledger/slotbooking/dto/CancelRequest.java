package com.athledger.slotbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelRequest {

    String userName;
    String bookingId;
}
