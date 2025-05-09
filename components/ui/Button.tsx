import Colors from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={title === "Generating..."}
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: Colors.WHITE, textAlign: "center" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
