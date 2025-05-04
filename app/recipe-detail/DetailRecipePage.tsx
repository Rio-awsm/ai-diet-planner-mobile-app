import CookingSteps from "@/components/CookingSteps";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeIntro from "@/components/RecipeIntro";
import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const DetailRecipePage = () => {
  const { recipeId } = useLocalSearchParams();
  const [open, setopen] = useState(false);
  const [dateList, setDateList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const mealOptions = [
    { title: "🍵 Break Fast", value: "Breakfast" },
    { title: "🍜 Lunch", value: "Lunch" },
    { title: "🍽️ Dinner", value: "Dinner" },
  ];

  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, "days").format("DD/MM/YYYY");
      result.push(nextDate);
    }
    setDateList(result);
  };

  useEffect(() => {
    GenerateDates();
  }, []);

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
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 30,
        }}
      >
        {open === false ? (
          <Button title="Add to Meal Plan" onPress={() => setopen(true)} />
        ) : (
          <View style={{ padding: 20, backgroundColor: "#fff" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "left",
                  color: "#333",
                }}
              >
                Add to Meal
              </Text>

              <TouchableOpacity
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: "#eee",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setopen(false);
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            <Text>Select Date</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              {dateList.map((date, index) => {
                const isSelected = selectedDate === date;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDate(date)}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 18,
                      marginRight: 10,
                      borderRadius: 10,
                      borderWidth: isSelected ? 2 : 1,
                      borderColor: isSelected ? "#388e3c" : "#ccc",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.PRIMARY,
                        fontWeight: isSelected ? "700" : "500",
                        fontSize: 16,
                      }}
                    >
                      {moment(date, "DD/MM/YYYY").format("ddd")},
                      {moment(date, "DD/MM/YYYY").format("DD")}{" "}
                      {moment(date, "DD/MM/YYYY").format("MMM")}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Text>Select Meal</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              {mealOptions.map((meal, index) => {
                const isSelected = selectedMeal === meal.value;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedMeal(meal.value)}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 18,
                      marginRight: 10,
                      borderRadius: 10,
                      borderWidth: isSelected ? 2 : 1,
                      borderColor: isSelected ? "#388e3c" : "#ccc",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.PRIMARY,
                        fontWeight: isSelected ? "700" : "500",
                        fontSize: 16,
                      }}
                    >
                      {meal.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View
              style={{ marginHorizontal: 20, marginBottom: 30, marginTop: 15 }}
            >
              <Button title="Add To Meal Paln" />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default DetailRecipePage;
