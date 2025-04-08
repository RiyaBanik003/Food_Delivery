package com.code.api.services;

import com.code.api.entity.FoodItem;
import com.code.api.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService implements IFoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepo;

    @Override
    public List<FoodItem> findAll() {
        return foodItemRepo.findAll();
    }

    @Override
    public FoodItem findById(int id) {
        Optional<FoodItem> optional = foodItemRepo.findById(id);
        return optional.orElse(null);  // Return null if the food item is not found
    }

    @Override
    public FoodItem save(FoodItem foodItem) {
        return foodItemRepo.save(foodItem);
    }

    @Override
    public String deleteById(int id) {
        if (foodItemRepo.existsById(id)) {
            foodItemRepo.deleteById(id);
            return "Food item deleted successfully";
        } else {
            return "Food item not found";  // Return a message if the item does not exist
        }
    }
}
