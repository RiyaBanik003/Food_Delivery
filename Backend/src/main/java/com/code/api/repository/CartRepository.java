package com.code.api.repository;

import com.code.api.entity.Cart;
import com.code.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUser(User user);
    Cart findByUserId(int userId);
}
