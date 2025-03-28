package com.athledger.slotmgmt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Slot {

    String sportId;
    String slotId;
    String sport;
    String facility;
    String center;
    String sfId;
    String from;
    String end;
    String date;
}
