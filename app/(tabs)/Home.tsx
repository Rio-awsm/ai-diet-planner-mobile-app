import { UserContext } from '@/context/UserContext'
import { useRouter } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'

const Home = () => {
  const {user} = useContext(UserContext) as any
  const router = useRouter()

  useEffect(() => {
  if(!user?.weight) {
    router.replace("/preference/Preference")
  }
  }, [user])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home