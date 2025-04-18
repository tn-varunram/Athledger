package com.athledger.slotbooking.service;


import com.athledger.slotbooking.dao.Booking;
import com.athledger.slotbooking.dao.Slot;
import com.athledger.slotbooking.dto.BookingStatus;
import com.athledger.slotbooking.repo.BookingRepository;
import com.athledger.slotbooking.repo.SlotRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SlotRepository slotRepository;

    public Booking bookSlot(Booking booking) {
        // Save booking
        booking.setBookingid(UUID.randomUUID().toString());
        booking.setBookingstatus(BookingStatus.BOOKED);
        Booking saved = bookingRepository.save(booking);

        // Remove slot from slots table
        slotRepository.deleteBySlotid(
                booking.getSlotid()
        );

        return saved;
    }

    public Booking cancelBooking(String bookingid) {
        Booking booking = bookingRepository.findById(bookingid)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBookingstatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Reinsert slot
        Slot newSlot = new Slot();
        newSlot.setSlotid(UUID.randomUUID().toString());
        newSlot.setSport(booking.getSport());
        newSlot.setDate(booking.getBookingdate());
        newSlot.setStart(booking.getBookingfrom());
        newSlot.setEnd(booking.getBookingto());
        newSlot.setFacility(booking.getFacility()); // or fetch if needed

        slotRepository.save(newSlot);

        return booking;
    }

    public List<Booking> getBookingsByUser(String userid) {
        return bookingRepository.findByUserid(userid);
    }

    public List<Booking> getActiveBookings() {
        return bookingRepository.findByBookingstatus(BookingStatus.BOOKED);
    }

}

