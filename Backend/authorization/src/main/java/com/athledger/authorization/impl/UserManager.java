package com.athledger.authorization.impl;

import com.athledger.authorization.dao.UserDetails;
import com.athledger.authorization.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManager {

    @Autowired
    private UserRepository userRepository;

    public List<UserDetails> getAllEntities() {
        return userRepository.findAll();
    }
}
