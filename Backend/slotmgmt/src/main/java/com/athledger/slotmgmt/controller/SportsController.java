package com.athledger.slotmgmt.controller;

import com.athledger.slotmgmt.dao.Slot;
import com.athledger.slotmgmt.dao.Sport;
import com.athledger.slotmgmt.service.SlotService;
import com.athledger.slotmgmt.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/user")
public class SportsController {

    @Autowired
    private SportService sportService;

    @Autowired
    private SlotService slotService;

    @GetMapping("/sports")
    public ResponseEntity<List<Sport>> getAllSports() {
        return ResponseEntity.ok(sportService.getAllSports());
    }

    @GetMapping("/slots/by-sport")
    public ResponseEntity<List<Slot>> getSlotsBySportAndDate(
            @RequestParam("sportid") String sportid,
            @RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        return ResponseEntity.ok(slotService.getSlotsBySportAndDate(sportid, date));
    }
}
