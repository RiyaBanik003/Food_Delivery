package com.code.api.services;

import com.code.api.entity.Cart;
import com.code.api.entity.FoodItem;
import com.code.api.entity.User;

import java.util.List;

public interface ICartService {
    Cart addToCart(User user, FoodItem foodItem);
    Cart removeFromCart(User user, FoodItem foodItem);
    List<FoodItem> getCartItems(int userId);

    // Newly added methods
    Cart findByUser(User user);
    void clearCart(User user);
}
