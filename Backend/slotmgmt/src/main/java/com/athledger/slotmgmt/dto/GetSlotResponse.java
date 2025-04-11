package com.athledger.slotmgmt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetSlotResponse {
    private SlotDetails[] slotDetails;
}
