import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { Image, Text, View } from "react-native";

const HomeHeader = () => {
  const { user } = useContext(UserContext) as any;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={require("./../assets/images/react-logo.png")}
        style={{ width: 60, height: 60, borderRadius: 99 }}
      />
      <View>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Hello,👋
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {user?.name}
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;
