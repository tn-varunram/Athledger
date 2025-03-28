package com.athledger.slotbooking.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CancelResponse {

    String userName;
    String bookingId;
    String status;
    String statusCode;
}
