import RecipeOptionList from "@/components/RecipeOptionList";
import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";
import { AI_GENERATE_RECIPE_OPTION_PROMPT } from "@/constants/Prompts";
import { AiGenerateRecipeOptions } from "@/services/Aimodel";
import React, { useState } from "react";
import { Platform, ScrollView, Text, TextInput, View } from "react-native";

const GenerateRecipe = () => {
  const [input, SetInput] = useState("");
  const [loading, SetLoading] = useState(false);
  const [recipeOptions, SetRecipeOptions] = useState([]);
  const GenerateRecipeOptions = async () => {
    SetLoading(true);
    try {
      const PROMPT = input + AI_GENERATE_RECIPE_OPTION_PROMPT;
      const result = await AiGenerateRecipeOptions(PROMPT);
      const extractJson = result.choices[0].message.content
        ?.replace("```json", "")
        .replace("```", "");
      const parsedJson = JSON.parse(extractJson as string);
      SetRecipeOptions(parsedJson);
    } catch (err) {
      console.log(err);
    }
    SetLoading(false);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingTop: Platform.OS === "ios" ? 50 : 25,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Generate AI Recipe
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
          color: Colors.GRAY,
        }}
      >
        Generate Personalized recipes using AI
      </Text>

      <TextInput
        onChange={(event) => SetInput(event.nativeEvent.text)}
        style={{
          padding: 15,
          borderRadius: 10,
          borderWidth: 2,
          fontSize: 17,
          height: 150,
          textAlignVertical: "top",
          backgroundColor: Colors.WHITE,
          borderColor: Colors.PRIMARY,
        }}
        placeholder="Enter your ingridient or recipe name"
      />

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Button
          title={loading === true ? "Generating..." : "Generate Recipe"}
          onPress={GenerateRecipeOptions}
        />
      </View>
      {recipeOptions && <RecipeOptionList RecipieOptions={recipeOptions} />}
    </ScrollView>
  );
};

export default GenerateRecipe;
