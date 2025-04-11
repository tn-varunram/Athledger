package com.athledger.slotmgmt.repo;

import com.athledger.slotmgmt.dao.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot, String> {
    List<Slot> findByDate(LocalDate date);  // ✅ Query all slots for a day
    List<Slot> findBySportAndDate(String sport, LocalDate date);
}

