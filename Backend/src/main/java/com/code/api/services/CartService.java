package com.code.api.services;

import com.code.api.entity.Cart;
import com.code.api.entity.FoodItem;
import com.code.api.entity.User;
import com.code.api.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService implements ICartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addToCart(User user, FoodItem foodItem) {
        Cart cart = cartRepository.findByUser(user);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setFoodItems(new ArrayList<>());
        }

        List<FoodItem> items = cart.getFoodItems();

        if (items == null) {
            items = new ArrayList<>();
        }

        if (!items.contains(foodItem)) {
            items.add(foodItem);
        }

        cart.setFoodItems(items);
        return cartRepository.save(cart);
    }

    @Override
    public Cart removeFromCart(User user, FoodItem foodItem) {
        Cart cart = cartRepository.findByUser(user);
        if (cart != null) {
            List<FoodItem> items = cart.getFoodItems();
            if (items != null) {
                items.remove(foodItem);
                cart.setFoodItems(items);
                return cartRepository.save(cart);
            }
        }
        return null;
    }

    @Override
    public List<FoodItem> getCartItems(int userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return cart != null && cart.getFoodItems() != null ? cart.getFoodItems() : List.of();
    }

    @Override
    public Cart findByUser(User user) {
        return cartRepository.findByUser(user);
    }

    @Override
    public void clearCart(User user) {
        Cart cart = cartRepository.findByUser(user);
        if (cart != null) {
            cart.getFoodItems().clear();
            cartRepository.save(cart);
        }
    }
}
