import GenerateMealRecipeCard from '@/components/GenerateMealRecipeCard'
import HomeHeader from '@/components/HomeHeader'
import TodayProgress from '@/components/TodayProgress'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'

const Home = () => {
  const {user} = useContext(UserContext) as any
  const router = useRouter()

  useEffect(() => {
  if(!user?.weight) {
    router.replace("/preference/Preference")
  }
  }, [user])

  return (
    <View style={{padding: 20}}>
      <HomeHeader />
      <TodayProgress />
      <GenerateMealRecipeCard />
    </View>
  )
}

export default Home