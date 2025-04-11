package com.athledger.authorization.impl;

import com.athledger.authorization.dao.User;
import com.athledger.authorization.dto.LoginRequest;
import com.athledger.authorization.dto.RegistrationRequest;
import com.athledger.authorization.dto.UserDTO;
import com.athledger.authorization.repository.UserRepository;
import com.athledger.authorization.utils.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserManager {

    private static final Logger logger = LoggerFactory.getLogger(UserManager.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public List<User> getAllEntities() {
        return userRepository.findAll();
    }

    public UserDTO getUserById(String userid){
        User user = userRepository.findByUserIdWithRole(userid);
        logger.info("Fetched user : {}", user);
        return new UserDTO(user);
    }

    public String register(RegistrationRequest request){
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists!";
        }
        User user = new User();
        user.setUserid(request.getUsername());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered!";
    }

    public ResponseEntity<?> login(LoginRequest request) throws Exception {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}
