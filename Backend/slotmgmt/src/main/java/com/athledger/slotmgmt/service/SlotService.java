package com.athledger.slotmgmt.service;

import com.athledger.slotmgmt.dao.Slot;
import com.athledger.slotmgmt.repo.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    public Slot addSlot(Slot slot) {
        return slotRepository.save(slot);
    }

    public void deleteSlot(String slotid) {
        slotRepository.deleteById(slotid);
    }

    public List<Slot> getSlotsByDate(LocalDate date) {
        return slotRepository.findByDate(date);
    }

    public List<Slot> getSlotsBySportAndDate(String sport, LocalDate date) {
        return slotRepository.findBySportAndDate(sport, date);
    }

    public void deleteSlotsByDate(LocalDate date) {
        List<Slot> slots = slotRepository.findByDate(date);
        slotRepository.deleteAll(slots);
    }

    public void deleteSlotsBySportAndDate(String sport, LocalDate date) {
        List<Slot> slots = slotRepository.findBySportAndDate(sport, date);
        slotRepository.deleteAll(slots);
    }

    public List<Slot> createSlotsForDay(String sportid, LocalDate date, String facility) {
        List<Slot> slots = new ArrayList<>();

        // Use UUIDs for unique slot IDs
        for (int hour = 8; hour < 20; hour++) {
            Slot slot = new Slot();
            slot.setSlotid(UUID.randomUUID().toString());
            slot.setSport(sportid);
            slot.setFacility(facility); // Or fetch facility from sport table if needed
            slot.setDate(date);
            slot.setStart(LocalTime.of(hour, 0));
            slot.setEnd(LocalTime.of(hour + 1, 0));

            slots.add(slot);
        }

        return slotRepository.saveAll(slots);
    }

}

