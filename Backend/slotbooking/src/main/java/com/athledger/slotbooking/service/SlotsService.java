package com.athledger.slotbooking.service;

import com.athledger.slotbooking.impl.SlotManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlotsService {

    @Autowired
    private SlotManager slotManager;

    @GetMapping("/sport/{sportId}")
    public ResponseEntity<Object> getSlot(@PathVariable String sportId) {
        try{
            return ResponseEntity.ok(slotManager.getSlotsForSport(sportId));
        } catch(Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }
}
