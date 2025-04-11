package com.athledger.slotmgmt.impl;

import com.athledger.slotmgmt.dto.GetSlotResponse;
import com.athledger.slotmgmt.dto.SlotDetails;
import org.springframework.stereotype.Component;

@Component
public class SlotManager {

    public GetSlotResponse getSlotsForSport(String sportId){
        if(sportId.equalsIgnoreCase("badminton")){
            return getSlotsForBadminton();
        }
        else if(sportId.equalsIgnoreCase("football")){
            return getSlotsForFootball();
        } else if(sportId.equalsIgnoreCase("tennis")){
            return getSlotsForTennis();
        }
        return GetSlotResponse.builder().build();
    }

    private GetSlotResponse getSlotsForTennis(){
        SlotDetails slotDetails1 = SlotDetails.builder()
                .slotId("slot1t")
                .sfId("sc1c1")
                .from("9:00AM")
                .end("10:00AM")
                .date("02-05-2025")
                .center("SC")
                .facility("SC-Tennis")
                .sport("tennis")
                .sportId("tennis")
                .build();

        SlotDetails slotDetails2 = SlotDetails.builder()
                .slotId("slot2t")
                .sfId("sc1c1")
                .from("10:00AM")
                .end("11:00AM")
                .date("02-05-2025")
                .center("SC")
                .facility("SC-Tennis")
                .sport("tennis")
                .sportId("tennis")
                .build();

        SlotDetails slotDetails3 = SlotDetails.builder()
                .slotId("slot3t")
                .sfId("sc1c1")
                .from("7:00PM")
                .end("9:00PM")
                .date("02-05-2025")
                .center("SC")
                .facility("SC-Tennis")
                .sport("tennis")
                .sportId("tennis")
                .build();
        SlotDetails[] slotst = {slotDetails1, slotDetails2, slotDetails3};
        return GetSlotResponse.builder().slotDetails(slotst).build();
    }

    private GetSlotResponse getSlotsForFootball(){
        SlotDetails slotDetails1 = SlotDetails.builder()
                .slotId("slot1t")
                .sfId("sc1c1")
                .from("9:00AM")
                .end("10:00AM")
                .date("02-05-2025")
                .center("SC")
                .facility("SC-Football")
                .sport("Football")
                .sportId("Football")
                .build();

        SlotDetails slotDetails2 = SlotDetails.builder()
                .slotId("slot2t")
                .sfId("sc1c1")
                .from("10:00AM")
                .end("11:00AM")
                .date("02-05-2025")
                .center("SC")
                .facility("SC-Football")
                .sport("Football")
                .sportId("Football")
                .build();

        SlotDetails slotDetails3 = SlotDetails.builder()
                .slotId("slot3t")
                .sfId("sc1c1")
                .from("7:00PM")
                .end("9:00PM")
                .date("02-05-2025")
                .center("SC")
                .facility("SC-Football")
                .sport("Football")
                .sportId("Football")
                .build();
        SlotDetails[] slotDetails = {slotDetails1, slotDetails2, slotDetails3};
        return GetSlotResponse.builder().slotDetails(slotDetails).build();
    }

    private GetSlotResponse getSlotsForBadminton(){
        SlotDetails[] slotDetails = {};
        return GetSlotResponse.builder().slotDetails(slotDetails).build();
    }
}
