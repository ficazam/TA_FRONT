import { useUserColor } from "@/hooks/useUserColor";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Pressable, Text } from "react-native";

interface iButtonProps {
  buttonTitle: string;
  onPress: () => void;
}

const Button = (props: iButtonProps) => {
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor(user.role);

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
      <Text style={{ color: "#fcfcfc" }}>{props.buttonTitle}</Text>
    </Pressable>
  );
};

export default Button;
