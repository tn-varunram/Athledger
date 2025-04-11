package com.athledger.slotbooking.repo;

import com.athledger.slotbooking.dao.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByBookingdate(LocalDate date);
    List<Booking> findByUserid(String userid);

}

