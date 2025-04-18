package com.athledger.authorization.kafka;

import com.athledger.authorization.impl.UserManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


@Service
public class UserEventProducer {

    private static final String TOPIC = "auth-notif-events";  // Kafka topic name

    private static final Logger logger = LoggerFactory.getLogger(UserEventProducer.class);

    @Autowired
    private KafkaTemplate<String, NotificationRequest> kafkaTemplate;  // Use KafkaTemplate with NotificationRequest POJO

    public void sendNewUserEvent(NotificationRequest request) {
        logger.info("Got new request for producing a notification request for user : {}", request.getUsername());
        kafkaTemplate.send(TOPIC, request);  // Send the POJO as a Kafka message
        logger.info("Produced event into kafka for user : {}", request.getUsername());
    }
}
