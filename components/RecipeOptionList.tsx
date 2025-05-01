import Colors from "@/constants/Colors";
import { GENERATE_COMPLETE_RECIPE_PROMPT } from "@/constants/Prompts";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { AIgeneratedIamge, AiGenerateRecipe } from "@/services/Aimodel";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LoadingDialouge from "./ui/LoadingDialouge";

const RecipeOptionList = ({ RecipieOptions }: any) => {
  const router = useRouter()
  const { user } = useContext(UserContext) as any;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const createRecipe = useMutation(api.Recipes.CreateRecipes);

  const onRecipeSelect = async (recipe: any, index: number) => {
    setLoading(true);
    setSelectedIndex(index);
    const PROMPT =
      "RecipeName:" +
      recipe?.recipeName +
      " Description:" +
      recipe?.description +
      " Ingredients:" +
      recipe?.ingredients.join(", ") +
      GENERATE_COMPLETE_RECIPE_PROMPT;

    try {
      const result = await AiGenerateRecipe(PROMPT);
      const extractJson = result.choices[0].message.content
        ?.replace("```json", "")
        .replace("```", "");
      const parsedJson = JSON.parse(extractJson as string);
      const aiImageResponse = await AIgeneratedIamge(parsedJson?.imagePrompt);      
      //save to db
      const saveRecipeResult = await createRecipe({
        jsonData: parsedJson,
        imageUrl: aiImageResponse?.data?.image,
        recipeName: parsedJson.recipeName,
        uid: user?._id,
      });      
      router.push({
        pathname: "/recipe-detail/DetailRecipePage",
        params: { recipeId: saveRecipeResult }
      })
    } catch (error) {
      console.log("Error in generating recipe", error);
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Select Recipe
      </Text>
      <View>
        {RecipieOptions?.map((item: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => onRecipeSelect(item, index)}
            style={{
              padding: 16,
              borderWidth: selectedIndex === index ? 2 : 1,
              borderColor:
                selectedIndex === index ? Colors.PRIMARY : Colors.GRAY + "30",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 12,
              backgroundColor:
                selectedIndex === index ? Colors.YELLOW + "10" : Colors.WHITE,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
                color: Colors.PRIMARY,
              }}
            >
              {item?.recipeName}
            </Text>

            <Text
              style={{
                color: Colors.GRAY,
                lineHeight: 20,
              }}
            >
              {item?.description}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold", color: Colors.PRIMARY }}>
                Ingredients:
              </Text>{" "}
              {item?.ingredients.join(", ")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoadingDialouge loading={loading} />
    </View>
  );
};

export default RecipeOptionList;
