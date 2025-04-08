package com.code.api.config;

import com.code.api.entity.FoodItem;
import com.code.api.entity.User;
import com.code.api.repository.FoodItemRepository;
import com.code.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // Create users if not exist
        if (userRepository.findAll().isEmpty()) {
            User admin = new User("admin", passwordEncoder.encode("admin123"), "ADMIN");
            User customer = new User("john", passwordEncoder.encode("john123"), "CUSTOMER");
            userRepository.saveAll(Arrays.asList(admin, customer));
            System.out.println("Default users created.");
        }

        // Create food items if not exist
        if (foodItemRepository.findAll().isEmpty()) {
            FoodItem f1 = new FoodItem("Margherita Pizza", "Classic cheese pizza", 249.0);
            FoodItem f2 = new FoodItem("Veg Burger", "Fresh bun with veggie patty", 149.0);
            FoodItem f3 = new FoodItem("Paneer Tikka", "Spicy grilled paneer cubes", 199.0);
            FoodItem f4 = new FoodItem("Fried Rice", "Veg fried rice with soy sauce", 179.0);
            FoodItem f5 = new FoodItem("Choco Lava Cake", "Delicious molten chocolate cake", 99.0);

            foodItemRepository.saveAll(Arrays.asList(f1, f2, f3, f4, f5));
            System.out.println("Default food items created.");
        }
    }
}
