package com.JUN_WE_170.PAF.service;

import java.util.List;
import java.util.Optional;

import com.JUN_WE_170.PAF.model.MealPlanModel;

public interface MealPlanService {
    List<MealPlanModel> getAllMealPlans();

    Optional<MealPlanModel> getMealPlanById(String mealPlanId);

    MealPlanModel createMealPlan(MealPlanModel mealPlan);

    MealPlanModel updatMealPlan(String mealPlanId, MealPlanModel mealPlan);

    void deleteMealPlan(String mealPlanId);
}
