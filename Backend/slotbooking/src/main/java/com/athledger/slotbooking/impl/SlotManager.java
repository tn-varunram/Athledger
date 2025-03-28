package com.athledger.slotbooking.impl;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class SlotManager {

    private String slotManagerBaseUrl = "http://localhost:8081/sport/";
    public Object getSlotsForSport(String sportId){
        RestClient restClient = RestClient.create();
        String result = restClient.get()
                .uri(slotManagerBaseUrl + sportId)
                .retrieve()
                .body(String.class);
        return result;
    }
}
