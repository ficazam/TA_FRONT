import { useUserColor } from "@/hooks/useUserColor";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {
  const { userColor } = useUserColor();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 250,
      }}
    >
      <ActivityIndicator size={50} color={userColor.color} />
    </View>
  );
};

export default LoadingScreen;
