package com.code.api.controller;

import com.code.api.entity.FoodItem;
import com.code.api.services.IFoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin
public class FoodItemController {

    @Autowired
    private IFoodItemService foodItemService;

    @GetMapping("/all")
    public List<FoodItem> getAll() {
        return foodItemService.findAll();
    }

    @PostMapping("/add")
    public FoodItem addFood(@RequestBody FoodItem item) {
        return foodItemService.save(item);
    }

    // New delete endpoint
    @DeleteMapping("/delete/{id}")
    public String deleteFood(@PathVariable int id) {
        return foodItemService.deleteById(id);
    }
}
