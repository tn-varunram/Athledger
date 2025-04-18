package com.athledger.slotmgmt.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BulkSlotsRequest {
    String sportid;
    String facility;
    String date;
}
