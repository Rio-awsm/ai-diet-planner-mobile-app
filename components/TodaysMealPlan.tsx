import Colors from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useConvex } from "convex/react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./ui/Button";

const TodaysMealPlan = () => {
  const [mealPlan, SetMealPlan] = useState<any>();
  const { user } = useContext(UserContext) as any;
  const convex = useConvex();
  const GetTodaysMealPlan = async () => {
    const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
      date: moment().format("DD/MM/YYYY"),
      uid: user?._id,
    });
    SetMealPlan(result);
  };

  useEffect(() => {
    user && GetTodaysMealPlan();
  }, [user]);

  const getSortedMeals = () => {
      if (!mealPlan) return [];
      const mealOrder: { [key: string]: number } = { "Breakfast": 1, "Lunch": 2, "Dinner": 3, "Snack": 4 };
      
      return [...mealPlan].sort((a: any, b: any) => 
        mealOrder[a.mealPlan.mealType as keyof typeof mealOrder] - mealOrder[b.mealPlan.mealType as keyof typeof mealOrder]
      );
    };

  const getMealIcon = (mealType : string) => {
    switch(mealType) {
      case "Breakfast": return "sunny";
      case "Lunch": return "restaurant";
      case "Dinner": return "moon";
      case "Snack": return "nutrition";
      default: return "restaurant";
    }
  };

  const renderMealCard = ({ item } : {item: any}) => (
    <View style={styles.mealCard}>
      <View style={styles.mealTypeContainer}>
        <Ionicons name={getMealIcon(item.mealPlan.mealType)} style={styles.mealTypeIcon} />
        <Text style={styles.mealTypeText}>{item.mealPlan.mealType}</Text>
      </View>
      
      <View style={styles.recipeContainer}>
        <Image 
          source={{ uri: item.recipe.imageUrl }} 
          style={styles.recipeImage} 
          resizeMode="cover"
        />
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeName}>{item.recipe.recipeName}</Text>
          <TouchableOpacity style={styles.viewRecipeButton}>
            <Text style={styles.viewRecipeText}>View Recipe</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Meal Plan</Text>

      {!mealPlan ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="restaurant"
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>
            You don't have any meal plan for today.
          </Text>
          <Button title="Create New Meal Plan" />
        </View>
      ) : (
        <View style={styles.mealPlanContainer}>
          <FlatList
            data={getSortedMeals()}
            renderItem={renderMealCard}
            keyExtractor={(item) => item.mealPlan._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mealList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  emptyContainer: {
    display: "flex",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 50,
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.GRAY,
    textAlign: "center",
    marginBottom: 20,
  },
  mealPlanContainer: {
    marginTop: 10,
  },
  mealList: {
    paddingBottom: 10,
  },
  mealCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  mealTypeIcon: {
    fontSize: 20,
    color: Colors.PRIMARY,
    marginRight: 8,
  },
  mealTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.PRIMARY,
  },
  recipeContainer: {
    flexDirection: "row",
  },
  recipeImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  recipeDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.PRIMARY,
    flexShrink: 1,
  },
  viewRecipeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewRecipeText: {
    fontSize: 14,
    color: Colors.YELLOW,
    fontWeight: "500",
    marginRight: 4,
  },
});

export default TodaysMealPlan;