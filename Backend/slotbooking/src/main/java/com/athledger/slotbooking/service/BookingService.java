package com.athledger.slotbooking.service;

import com.athledger.slotbooking.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingService {

    @PostMapping("/book")
    public ResponseEntity<BookingResponse> book(@RequestBody BookingRequest bookingRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(BookingResponse.builder().build());
        }
        return ResponseEntity.ok(BookingResponse.builder().bookingId(bookingRequest.getBookingId()).build());
    }

    @PostMapping("/cancel")
    public ResponseEntity<CancelResponse> cancel(@RequestBody CancelRequest cancelRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(CancelResponse.builder().build());
        }
        return ResponseEntity.ok(CancelResponse.builder().build());
    }

    @GetMapping("/booking/get")
    public ResponseEntity<BookingResponse> getBooking(@RequestBody FetchBookingRequest fetchBookingRequest) {
        try{

        } catch(Exception e){
            return ResponseEntity.status(500).body(BookingResponse.builder().build());
        }
        return ResponseEntity.ok(BookingResponse.builder().build());
    }
}
