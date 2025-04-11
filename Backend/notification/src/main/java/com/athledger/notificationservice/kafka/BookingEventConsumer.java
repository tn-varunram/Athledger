package com.athledger.notificationservice.kafka;

import com.athledger.notificationservice.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BookingEventConsumer {

    private final EmailService emailService;

    @Autowired
    public BookingEventConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(topics = "booking-events", groupId = "notification-service-group")
    public void handleBookingEvent(String message) {
        log.info("📥 Received booking event: {}", message);

        String emailTo = "test@inbox.mailtrap.io"; // Can be anything, Mailtrap will catch it
        String subject = "Mailtrap Test Notification";
        String body = "Test email sent from Notification Service using Kafka.";
        emailService.sendEmail(emailTo, subject, body);
        log.info("📧 Sending booking confirmation email for: {}", message);
    }
}
