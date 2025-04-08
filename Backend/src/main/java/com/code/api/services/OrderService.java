package com.code.api.services;

import com.code.api.entity.Cart;
import com.code.api.entity.FoodItem;
import com.code.api.entity.Order;
import com.code.api.entity.User;
import com.code.api.repository.OrderRepository;
import com.code.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartService cartService;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order findById(int id) {
        Optional<Order> optional = orderRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public String deleteById(int id) {
        orderRepository.deleteById(id);
        return "Order deleted successfully";
    }

    @Override
    public List<Order> findByUserId(int userId) {
        // Fetch the user first, then find the orders related to that user
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) return new ArrayList<>();
        return orderRepository.findByUser(user);
    }

    @Override
    public Order placeOrder(int userId) {
        // Fetch user from userRepo
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) return null;

        // Fetch the user's cart from cartService
        Cart cart = cartService.findByUser(user);
        if (cart == null || cart.getFoodItems() == null || cart.getFoodItems().isEmpty()) return null;

        // Collect the food items from the cart
        List<FoodItem> foodItems = new ArrayList<>(cart.getFoodItems());

        // Create the order object and save it
        Order order = new Order();
        order.setUser(user);
        order.setFoodItems(foodItems);
        order.setDateTime(LocalDateTime.now());
        order.setStatus("Placed");

        Order savedOrder = orderRepository.save(order);

        // Clear the cart after placing the order
        cartService.clearCart(user);

        return savedOrder;
    }
}
