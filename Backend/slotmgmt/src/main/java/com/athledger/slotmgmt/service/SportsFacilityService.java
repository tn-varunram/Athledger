package com.athledger.slotmgmt.service;

import com.athledger.slotmgmt.dao.SportsFacilityRecord;
import com.athledger.slotmgmt.dto.GetSportsFacilityRecord;
import com.athledger.slotmgmt.impl.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SportsFacilityService {

    @Autowired
    private AuthorizationService authorizationService;

    @GetMapping("/sportsFacility/get")
    public ResponseEntity<SportsFacilityRecord> getSportsFacility(GetSportsFacilityRecord getSportsFacilityRecord) {
        try{
            Boolean authStatus = authorizationService.authorizeRequestBasedOnRole(
                    getSportsFacilityRecord.getUserName(),
                    getSportsFacilityRecord.getUserSessionId(),
                    "SMS"
            );
            if(!authStatus){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch(Exception e){
            //e.printStackTrace();
            return ResponseEntity.status(500).body(SportsFacilityRecord.builder().build());
        }
        return ResponseEntity.ok(SportsFacilityRecord.builder().build());
    }
}
