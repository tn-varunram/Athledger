package com.athledger.slotbooking.controller;

import com.athledger.slotbooking.dao.Booking;
import com.athledger.slotbooking.dto.BookingRequest;
import com.athledger.slotbooking.service.BookingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/booking/admin")
public class AdminController {

    @Autowired
    private BookingService bookingService;

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @GetMapping("/")
    public ResponseEntity<List<Booking>> book() {
        try {
            logger.info("Got new request to fetch all bookings");
            List<Booking> bookings = bookingService.getActiveBookings();
            logger.info("Fetched all bookings");
            return ResponseEntity.status(200).body(bookings);
        }
        catch (Exception e) {
            logger.error("Exception when getting all bookings ", e);
            return ResponseEntity.status(500).body(null);
        }
    }
}
