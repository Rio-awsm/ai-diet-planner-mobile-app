import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const GenerateMealRecipeCard = () => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={[Colors.YELLOW, Colors.PRIMARY]}
      style={{
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 23,
          fontWeight: "bold",
          color: Colors.WHITE,
        }}
      >
        Need Meal Ideas? 🤔
      </Text>

      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 15,
          marginTop: 5,
          opacity: 0.8,
        }}
      >
        Let our AI Generate Personalized Recipies Just For You
      </Text>

      <TouchableOpacity
      onPress={() => router.push("/generate-ai-recipe/GenerateRecipe")}
        style={{
          padding: 12,
          backgroundColor: Colors.WHITE,
          borderRadius: 10,
          marginTop: 15,
          width: 170
        }}
      >
        <Text style={{
            fontSize: 15,
            color: Colors.PRIMARY,
        }}>Generate With AI 🪄</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GenerateMealRecipeCard;
