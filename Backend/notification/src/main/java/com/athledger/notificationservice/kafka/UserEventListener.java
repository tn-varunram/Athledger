package com.athledger.notificationservice.kafka;

import com.athledger.notificationservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserEventListener {

    private static final Logger logger = LoggerFactory.getLogger(UserEventListener.class);

    @Autowired
    private EmailService emailService;  // Service to send emails

    @KafkaListener(topics = "auth-notif-events", groupId = "notification-service-group", containerFactory = "notificationKafkaListenerFactory")
    public void handleUserNotification(NotificationRequest notification) {
        logger.info("Received new user event: {}", notification.getUsername());

        // Send email using the data in the notification
        emailService.sendEmail(
                notification.getRecipientEmail(),
                notification.getSubject(),
                notification.getBody()
        );
    }
}
