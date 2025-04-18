package com.athledger.notificationservice.kafka;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NotificationRequest {
    @JsonProperty("recipientEmail")
    private String recipientEmail;
    @JsonProperty("subject")
    private String subject;
    @JsonProperty("body")
    private String body;
    @JsonProperty("username")
    private String username;

    // Constructors
    public NotificationRequest() {}

    public NotificationRequest(String recipientEmail, String subject, String body, String username) {
        this.recipientEmail = recipientEmail;
        this.subject = subject;
        this.body = body;
        this.username = username;
    }

    // Getters and Setters
    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}