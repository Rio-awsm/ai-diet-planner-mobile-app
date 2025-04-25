import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }
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
        <Input placeholder={"Email"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
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
