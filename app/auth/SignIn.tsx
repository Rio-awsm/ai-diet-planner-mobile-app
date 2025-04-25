import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/firebaseConfig";
import { useConvex } from "convex/react";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const { user, setUser } = useContext(UserContext) as any;
  const convex = useConvex()

  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      const userData = await convex.query(api.User.GetUser, {
        email: email
      })
      setUser(userData)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Invalid Email or Password", errorMessage)
    })
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
