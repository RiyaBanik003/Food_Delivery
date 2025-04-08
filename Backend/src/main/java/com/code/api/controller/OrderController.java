package com.code.api.controller;

import com.code.api.entity.Order;
import com.code.api.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    // 🔍 Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.findAll();
    }

    // 🔍 Get order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.findById(id);
    }

    // 💾 Save new order manually (not from cart)
    @PostMapping
    public Order saveOrder(@RequestBody Order order) {
        return orderService.save(order);
    }

    // ❌ Delete order by ID
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable int id) {
        return orderService.deleteById(id);
    }

    // 📦 Get all orders by user ID
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable int userId) {
        return orderService.findByUserId(userId);
    }

    // ✅ Place an order from cart
    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable int userId) {
    	System.out.println("Placing order for user ID: " + userId);
        return orderService.placeOrder(userId);
    }
}
