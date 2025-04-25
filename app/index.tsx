import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { auth } from "@/services/firebaseConfig";
import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Dimensions, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext) as any;
  const convex = useConvex();

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, async (userInfo) => {
      const userData = await convex.query(api.User.GetUser, {
        email: userInfo?.email as string,
      });
      setUser(userData);
    });
    return () => unsubscribe()
  })

 
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("./../assets/images/landing.jpg")}
        style={{ width: "100%", height: Dimensions.get("screen").height }}
      />
      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("./../assets/images/logo.jpg")}
          style={{ width: 150, height: 150, marginTop: 100 }}
        />
        <Text style={{ fontSize: 30, color: Colors.WHITE, fontWeight: "bold" }}>
          AI Diet Planner
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          Craft delicious food menu for your healthy calorie count
        </Text>
      </View>
      <View
        style={{ position: "absolute", bottom: 25, width: "100%", padding: 20 }}
      >
        <Button
          title={"Get Started"}
          onPress={() => router.push("/auth/SignIn")}
        />
      </View>
    </View>
  );
}
