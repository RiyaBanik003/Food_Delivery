package com.code.api.controller;

import com.code.api.entity.Cart;
import com.code.api.entity.FoodItem;
import com.code.api.entity.User;
import com.code.api.repository.FoodItemRepository;
import com.code.api.repository.UserRepository;
import com.code.api.services.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000") // Update this if needed
public class CartController {

    @Autowired
    private ICartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    // ➕ Add item to cart
    @PostMapping("/add")
    public Cart addToCart(@RequestParam int userId, @RequestParam int foodItemId) {
        User user = userRepository.findById(userId).orElse(null);
        FoodItem foodItem = foodItemRepository.findById(foodItemId).orElse(null);
        if (user != null && foodItem != null) {
            return cartService.addToCart(user, foodItem);
        }
        return null;
    }

    // ➖ Remove item from cart
    @PostMapping("/remove")
    public Cart removeFromCart(@RequestParam int userId, @RequestParam int foodItemId) {
        User user = userRepository.findById(userId).orElse(null);
        FoodItem foodItem = foodItemRepository.findById(foodItemId).orElse(null);
        if (user != null && foodItem != null) {
            return cartService.removeFromCart(user, foodItem);
        }
        return null;
    }

    // 🛒 View all items in cart
    @GetMapping("/items/{userId}")
    public List<FoodItem> getCartItems(@PathVariable int userId) {
        return cartService.getCartItems(userId);
    }
}
