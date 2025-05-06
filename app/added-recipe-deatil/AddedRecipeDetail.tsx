import CookingSteps from "@/components/CookingSteps";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeIntro from "@/components/RecipeIntro";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const AddedDetailRecipePage = () => {
  const { recipeId } = useLocalSearchParams();
  

  // Properly handle the recipeId parameter
  const actualRecipeId = recipeId || "jd7422bgx2y4q99gy7n1pnc07s7f7adg";

  const recipeDetail = useQuery(api.Recipes.getRecipeById, {
    id: actualRecipeId,
  });

  return (
    <ScrollView>
    <RecipeIntro recipeDetail={recipeDetail} />
    <RecipeIngredients recipeDetail={recipeDetail} />
    <CookingSteps recipeDetail={recipeDetail} />
  </ScrollView>
  );
};

export default AddedDetailRecipePage;
