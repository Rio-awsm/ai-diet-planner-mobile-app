import RecipeIntro from '@/components/RecipeIntro'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const DetailRecipePage = () => {
    const {recipeId} = useLocalSearchParams()
    console.log(recipeId);
    
  return (
    <View>
      <RecipeIntro />
    </View>
  )
}

export default DetailRecipePage