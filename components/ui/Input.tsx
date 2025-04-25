import React from "react";
import { TextInput } from "react-native";

const Input = ({
  placeholder,
  password = false,
}: {
  placeholder: string;
  password?: boolean;
}) => {
  return (
    <TextInput
      secureTextEntry={password}
      placeholder={placeholder}
      style={{
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        fontSize: 18,
        paddingVertical: 20,
        marginTop: 15,
      }}
    />
  );
};

export default Input;
