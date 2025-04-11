package com.athledger.slotmgmt.service;

import com.athledger.slotmgmt.dao.Sport;
import com.athledger.slotmgmt.repo.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportService {

    @Autowired
    private SportRepository sportRepository;

    public Sport addSport(Sport sport) {
        return sportRepository.save(sport);
    }

    public void deleteSport(String sportid) {
        sportRepository.deleteById(sportid);
    }

    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }
}

