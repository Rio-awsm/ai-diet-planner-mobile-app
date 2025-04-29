import Colors from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

const LoadingDialouge = ({ loading = false }: { loading: boolean }) => {
  return (
    <Modal transparent={true} visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000070",
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: Colors.YELLOW,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
              color: Colors.PRIMARY,
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingDialouge;
