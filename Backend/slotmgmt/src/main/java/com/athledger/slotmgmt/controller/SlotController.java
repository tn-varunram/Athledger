package com.athledger.slotmgmt.controller;

import com.athledger.slotmgmt.dao.Slot;
import com.athledger.slotmgmt.dao.Sport;
import com.athledger.slotmgmt.service.SlotService;
import com.athledger.slotmgmt.service.SportService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/admin")
public class SlotController {

    @Autowired
    private SportService sportService;

    @Autowired
    private SlotService slotService;

    // ---------------------- SPORTS -----------------------

    @PostMapping("/sports")
    public ResponseEntity<Sport> addSport(@RequestBody Sport sport) {
        return ResponseEntity.ok(sportService.addSport(sport));
    }

    @DeleteMapping("/sports/{id}")
    public ResponseEntity<Void> deleteSport(@PathVariable String id) {
        sportService.deleteSport(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sports")
    public ResponseEntity<List<Sport>> getAllSports() {
        return ResponseEntity.ok(sportService.getAllSports());
    }

    // ---------------------- SLOTS ------------------------

    @PostMapping("/slots")
    public ResponseEntity<Slot> addSlot(@RequestBody Slot slot) {
        return ResponseEntity.ok(slotService.addSlot(slot));
    }

    @DeleteMapping("/slots/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable String id) {
        slotService.deleteSlot(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/slots")
    public ResponseEntity<List<Slot>> getSlotsByDate(@RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        return ResponseEntity.ok(slotService.getSlotsByDate(date));
    }

    @GetMapping("/slots/by-sport")
    public ResponseEntity<List<Slot>> getSlotsBySportAndDate(
            @RequestParam("sportid") String sportid,
            @RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        return ResponseEntity.ok(slotService.getSlotsBySportAndDate(sportid, date));
    }

    @DeleteMapping("/slots/by-date")
    public ResponseEntity<String> deleteSlotsByDate(@RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        slotService.deleteSlotsByDate(date);
        return ResponseEntity.ok("Slots for " + date + " deleted successfully");
    }

    @DeleteMapping("/slots/by-sport-and-date")
    public ResponseEntity<String> deleteSlotsBySportAndDate(
            @RequestParam("sportid") String sportid,
            @RequestParam("date") String dateStr) {

        LocalDate date = LocalDate.parse(dateStr);
        slotService.deleteSlotsBySportAndDate(sportid, date);
        return ResponseEntity.ok("Slots for sport " + sportid + " on " + date + " deleted.");
    }

    @PostMapping("/slots/bulk")
    public ResponseEntity<List<Slot>> createSlotsForDay(
            @RequestParam("sportid") String sportid,
            @RequestParam("date") String dateStr,
            @RequestParam("facility") String facility) {

        LocalDate date = LocalDate.parse(dateStr);
        List<Slot> createdSlots = slotService.createSlotsForDay(sportid, date, facility);
        return ResponseEntity.ok(createdSlots);
    }

}

