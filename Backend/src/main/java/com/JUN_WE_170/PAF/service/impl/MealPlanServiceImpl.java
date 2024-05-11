package com.JUN_WE_170.PAF.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.model.MealPlanModel;
import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.repository.MealPlanRepo;
import com.JUN_WE_170.PAF.repository.UserRepo;
import com.JUN_WE_170.PAF.service.MealPlanService;

@Service
public class MealPlanServiceImpl implements MealPlanService {

    @Autowired
    private MealPlanRepo mealPlanRepository;

    @Autowired
    private UserRepo userRepository;

    @Override
    public List<MealPlanModel> getAllMealPlans() {
        return mealPlanRepository.findAll();
    }

    @Override
    public Optional<MealPlanModel> getMealPlanById(String mealPlanId) {
        return mealPlanRepository.findById(mealPlanId);
    }

    @Override
    public MealPlanModel createMealPlan(MealPlanModel mealPlan) {
        Optional<UserModel> userOptional = userRepository.findById(mealPlan.getUserId());
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            mealPlan.setUserId(user.getId());
            mealPlan.setUsername(user.getName());
            mealPlan.setUserProfile(user.getProfileImage());
            return mealPlanRepository.save(mealPlan);
        } else {
            return null;
        }
    }

    @Override
    public MealPlanModel updatMealPlan(String mealPlanId, MealPlanModel mealPlan) {
        if (mealPlanRepository.existsById(mealPlanId)) {
            Optional<UserModel> userOptional = userRepository.findById(mealPlan.getUserId());
            if (userOptional.isPresent()) {
                UserModel user = userOptional.get();
                mealPlan.setUserId(user.getId());
                mealPlan.setUsername(user.getName());
                mealPlan.setUserProfile(user.getProfileImage());
                mealPlan.setMealPlanId(mealPlanId);
                mealPlan.setMealType(mealPlan.getMealType());
                mealPlan.setRecipes(mealPlan.getRecipes());
                mealPlan.setIngredients(mealPlan.getIngredients());
                mealPlan.setCookingInstruction(mealPlan.getCookingInstruction());
                mealPlan.setNutritionalInformation(mealPlan.getNutritionalInformation());
                mealPlan.setPortionSizes(mealPlan.getPortionSizes());
                mealPlan.setDietaryPreferences(mealPlan.getDietaryPreferences());
                mealPlan.setSource(mealPlan.getSource());
                mealPlan.setDate(mealPlan.getDate());
                return mealPlanRepository.save(mealPlan);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void deleteMealPlan(String mealPlanId) {
        mealPlanRepository.deleteById(mealPlanId);
    }

}
