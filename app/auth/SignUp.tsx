import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/firebaseConfig";
import { useMutation } from "convex/react";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createNewUser = useMutation(api.User.CreateNewUser);

  const { user, setUser } = useContext(UserContext) as any;

  const onSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Fields", "Please fill all the values!!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (user) {
          const result = await createNewUser({ name: name, email: email });
          setUser(result);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Something went wrong", errorMessage);
      });
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
        Let's Get Started
      </Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Input placeholder={"Full name"} onChangeText={setName} />
        <Input placeholder={"Email"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <Button title="Create Account" onPress={() => onSignUp()} />
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
  );
};

export default SignUp;
