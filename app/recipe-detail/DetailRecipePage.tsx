import RecipeIngredients from '@/components/RecipeIngredients'
import RecipeIntro from '@/components/RecipeIntro'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const DetailRecipePage = () => {
    const { recipeId } = useLocalSearchParams()
    console.log('Recipe ID:', recipeId)
    
    // Properly handle the recipeId parameter
    const actualRecipeId = recipeId || "jd7422bgx2y4q99gy7n1pnc07s7f7adg"
    
    const recipeDetail = useQuery(api.Recipes.getRecipeById, {
        id: actualRecipeId
    })
    
    console.log('Recipe Detail:', recipeDetail)
    
    return (
        <View>
            <RecipeIntro recipeDetail={recipeDetail} />
            <RecipeIngredients recipeDetail={recipeDetail} />
        </View>
    )
}

export default DetailRecipePage