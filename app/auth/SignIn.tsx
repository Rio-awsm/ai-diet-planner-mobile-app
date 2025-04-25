import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const SignIn = () => {
  const onSignIn = () => {
    console.log("Sign In Pressed");
  };

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
        Welcome Back
      </Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Input placeholder={"Email"} />
        <Input placeholder={"Password"} password={true} />
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <Button title="Sign In" onPress={() => onSignIn()} />
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          Dont't have an account?{" "}
        </Text>
        <Link href={"/auth/SignUp"} asChild>
          <Text
            style={{
              textAlign: "center",
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Create New Account
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
