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
        backgroundColor: userColor.transparentColor,
        maxWidth: "50%",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: userColor.color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: Colors.white }}>{props.buttonTitle}</Text>
    </Pressable>
  );
};

export default Button;
