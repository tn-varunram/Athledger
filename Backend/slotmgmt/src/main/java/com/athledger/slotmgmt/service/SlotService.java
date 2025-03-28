package com.athledger.slotmgmt.service;

import com.athledger.slotmgmt.dto.GetSlotResponse;
import com.athledger.slotmgmt.impl.SlotManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlotService {

    @Autowired
    private SlotManager slotManager;

    @GetMapping("/sport/{sportId}")
    public ResponseEntity<Object> getSlot(@PathVariable String sportId) {
        try{
            return ResponseEntity.ok(slotManager.getSlotsForSport(sportId));
        } catch(Exception e){
            return ResponseEntity.status(500).body(GetSlotResponse.builder().build());
        }
        //return ResponseEntity.ok(GetSlotResponse.builder().build());
    }
}
