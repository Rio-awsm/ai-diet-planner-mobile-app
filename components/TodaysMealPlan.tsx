import Colors from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./ui/Button";

const TodaysMealPlan = () => {
  const [mealPlan, SetMealPlan] = useState<any>();
  const router = useRouter();
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
    const mealOrder: { [key: string]: number } = {
      Breakfast: 1,
      Lunch: 2,
      Dinner: 3,
      Snack: 4,
    };

    return [...mealPlan].sort(
      (a: any, b: any) =>
        mealOrder[a.mealPlan.mealType as keyof typeof mealOrder] -
        mealOrder[b.mealPlan.mealType as keyof typeof mealOrder]
    );
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case "Breakfast":
        return "sunny";
      case "Lunch":
        return "restaurant";
      case "Dinner":
        return "moon";
      case "Snack":
        return "nutrition";
      default:
        return "restaurant";
    }
  };

  const toggleMealStatus = async (
    mealPlanId: string,
    currentStatus: boolean | undefined,
    calories: number
  ) => {
    const newStatus = currentStatus === true ? false : true;

    await convex.mutation(api.MealPlan.MarkStatus, {
      id: mealPlanId,
      status: newStatus,
      calories: calories,
    });
    GetTodaysMealPlan();
  };

  const renderMealCard = ({ item }: { item: any }) => (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <View style={styles.mealTypeContainer}>
          <Ionicons
            name={getMealIcon(item.mealPlan.mealType)}
            style={styles.mealTypeIcon}
          />
          <Text style={styles.mealTypeText}>{item.mealPlan.mealType}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() =>
            toggleMealStatus(
              item.mealPlan._id,
              item.mealPlan.status,
              item.recipe.jsonData.calories
            )
          }
        >
          <View
            style={[
              styles.checkbox,
              item.mealPlan.status && styles.checkboxChecked,
            ]}
          >
            {item.mealPlan.status && (
              <Ionicons name="checkmark" size={16} color={Colors.WHITE} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.recipeContainer}>
        <Image
          source={{ uri: item.recipe.imageUrl }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeName}>{item.recipe.recipeName}</Text>
          <Text style={styles.CalorieText}>
            Calories : {item.recipe.jsonData.calories}
          </Text>
          <TouchableOpacity
            style={styles.viewRecipeButton}
            onPress={() => {
              router.push({
                pathname: "/added-recipe-deatil/AddedRecipeDetail",
                params: { recipeId: item.recipe._id },
              });
            }}
          >
            <Text style={styles.viewRecipeText}>View Recipe</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleCreateMealPlan = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Meal Plan</Text>

      {!mealPlan || mealPlan.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant" style={styles.emptyIcon} />
          <Text style={styles.emptyText}>
            You don't have any meal plan for today.
          </Text>
          <Button title="Create New Meal Plan" onPress={handleCreateMealPlan} />
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
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  mealTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  checkboxContainer: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  checkboxChecked: {
    backgroundColor: Colors.PRIMARY,
  },
  CalorieText: {
    fontSize: 12,
    fontWeight: "400",
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
