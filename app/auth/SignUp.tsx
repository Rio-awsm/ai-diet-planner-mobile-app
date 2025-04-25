import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const SignUp = () => {
  const onSignUp = () => {
    console.log('Sign Up Pressed')
  }

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("../../assets/images/logo.jpg")}
        style={{ width: 150, height: 150, marginTop: 60 }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        Let's Get Started
      </Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Input placeholder={"Full name"} />
        <Input placeholder={"Email"} />
        <Input placeholder={"Password"} password={true} />
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <Button title="Sign Up" onPress={() => onSignUp()} />
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          Already have an account?{" "}
        </Text>
        <Link href={"/auth/SignIn"} asChild>
          <Text
            style={{
              textAlign: "center",
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Login to your account
          </Text>
        </Link>
      </View>
    </View>
  )
}

export default SignUp