package com.code.api.services;

import com.code.api.entity.FoodItem;
import java.util.List;

public interface IFoodItemService {

    List<FoodItem> findAll();
    FoodItem findById(int id);
    FoodItem save(FoodItem foodItem);
    String deleteById(int id);
}
