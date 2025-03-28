package com.athledger.authorization.repository;

import com.athledger.authorization.dao.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDetails, Long> {
    // You can define custom query methods here if needed

}
