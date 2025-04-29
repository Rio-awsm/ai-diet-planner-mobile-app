import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "./ui/Button";

const TodaysMealPlan = () => {
  const [mealPlan, SetMealPlan] = useState();
  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Today's Meal Plan
      </Text>

      {!mealPlan && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            padding: 20,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            marginBottom: 20,
            marginTop: 10,
          }}
        >
            <Ionicons name="restaurant" style={{
                fontSize: 50,
                color: Colors.PRIMARY,
                marginBottom: 20,
            }} />
          <Text
            style={{
              fontSize: 18,
              color: Colors.GRAY,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            You Don't have any Meal Plan for Today.
          </Text>
          <Button title="Create New Meal Plan" />
        </View>
      )}
    </View>
  );
};

export default TodaysMealPlan;
