import GenerateMealRecipeCard from '@/components/GenerateMealRecipeCard'
import HomeHeader from '@/components/HomeHeader'
import TodayProgress from '@/components/TodayProgress'
import TodaysMealPlan from '@/components/TodaysMealPlan'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { ScrollView } from 'react-native'

const Home = () => {
  const {user} = useContext(UserContext) as any
  const router = useRouter()

  useEffect(() => {
  if(!user?.weight) {
    router.replace("/preference/Preference")
  }
  }, [user])

  return (
    <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
      <HomeHeader />
      <TodayProgress />
      <GenerateMealRecipeCard />
      <TodaysMealPlan />
    </ScrollView>
  )
}

export default Home