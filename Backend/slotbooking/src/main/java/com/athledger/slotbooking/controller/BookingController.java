package com.athledger.slotbooking.controller;

import com.athledger.slotbooking.dao.Booking;
import com.athledger.slotbooking.dto.BookingRequest;
import com.athledger.slotbooking.service.BookingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @PostMapping("/create")
    public ResponseEntity<Booking> book(@RequestBody BookingRequest bookingRequest) {
        Booking booking = new Booking(bookingRequest);
        return ResponseEntity.ok(bookingService.bookSlot(booking));
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<Booking> cancel(@PathVariable String id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @GetMapping("/user/{userid}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable String userid) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userid));
    }

}

