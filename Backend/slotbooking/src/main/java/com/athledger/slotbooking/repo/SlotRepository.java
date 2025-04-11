package com.athledger.slotbooking.repo;

import com.athledger.slotbooking.dao.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot, String> {
    List<Slot> findByDate(LocalDate date);  // ✅ Query all slots for a day
    List<Slot> findBySportAndDate(String sport, LocalDate date);
    void deleteBySlotid(String slotid);

}

