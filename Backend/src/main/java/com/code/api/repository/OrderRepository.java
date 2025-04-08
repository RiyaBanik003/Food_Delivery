package com.code.api.repository;

import com.code.api.entity.Order;
import com.code.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);  // Finds orders based on the user entity
}
