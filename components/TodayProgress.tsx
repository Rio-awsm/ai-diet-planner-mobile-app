import Colors from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import moment from "moment";
import React, { useContext } from "react";
import { Text, View } from "react-native";

const TodayProgress = () => {
  const { user } = useContext(UserContext) as any;
  return (
    <View
      style={{
        padding: 15,
        marginTop: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Today's Goal
        </Text>
        <Text style={{ fontSize: 18 }}>{moment().format("MMM DD, yyyy")}</Text>
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 14,
          color: Colors.PRIMARY,
        }}
      >
        1500/{user?.calories} Kcal
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        You'r doing great!
      </Text>

      <View
        style={{
          backgroundColor: Colors.GRAY,
          height: 10,
          borderRadius: 99,
          marginTop: 20,
          opacity: 0.7,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            height: 10,
            width: "75%",
            borderRadius: 99,
          }}
        ></View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text>Calories consumed</Text>
        <Text>Keep it up! 🔥</Text>
      </View>
    </View>
  );
};

export default TodayProgress;
