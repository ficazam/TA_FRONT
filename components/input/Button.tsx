import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks/useUserColor";
import React from "react";
import { Pressable, Text } from "react-native";

interface iButtonProps {
  buttonTitle: string;
  onPress: () => void;
}

const Button = (props: iButtonProps) => {
  const { userColor } = useUserColor();

  return (
    <Pressable
      onPress={props.onPress}
      style={{
          height: 50,
          width: 200,
          backgroundColor: userColor.transparentColor,
          borderColor: userColor.color,
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
    >
      <Text style={{ color: Colors.white, fontSize: 18 }}>{props.buttonTitle}</Text>
    </Pressable>
  );
};

export default Button;
