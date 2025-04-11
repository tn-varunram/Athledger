package com.athledger.authorization.repository;

import com.athledger.authorization.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can define custom query methods here if needed

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.role WHERE u.userid = :userid")
    User findByUserIdWithRole(String userid);

    Optional<User> findByUsername(String username);
}
