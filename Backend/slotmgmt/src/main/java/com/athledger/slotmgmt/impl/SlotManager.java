package com.athledger.slotmgmt.impl;

import com.athledger.slotmgmt.dto.GetSlotResponse;
import com.athledger.slotmgmt.dto.Slot;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Arrays;

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
        Slot slot1 = Slot.builder()
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

        Slot slot2 = Slot.builder()
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

        Slot slot3 = Slot.builder()
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
        Slot [] slotst = {slot1, slot2, slot3};
        return GetSlotResponse.builder().slots(slotst).build();
    }

    private GetSlotResponse getSlotsForFootball(){
        Slot slot1 = Slot.builder()
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

        Slot slot2 = Slot.builder()
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

        Slot slot3 = Slot.builder()
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
        Slot [] slots = {slot1, slot2, slot3};
        return GetSlotResponse.builder().slots(slots).build();
    }

    private GetSlotResponse getSlotsForBadminton(){
        Slot [] slots = {};
        return GetSlotResponse.builder().slots(slots).build();
    }
}
