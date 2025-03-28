package com.athledger.slotmgmt.dao;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SportsFacilityRecord {

    String sport;
    String facility;
    String capacity;
    String center;
    String sfId;
    String sportId;
    String slotId;
}
