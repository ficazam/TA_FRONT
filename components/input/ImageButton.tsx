import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks/useUserColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Image, Pressable } from "react-native";
import { View } from "react-native";

interface iImageButtonProps {
  image: string;
  loading: boolean;
  openTray: () => void;
}

const ImageButton = (props: iImageButtonProps) => {
  const { userColor } = useUserColor();

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={props.openTray}
        style={{
          backgroundColor: Colors.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          width: 100,
          borderWidth: 1,
          borderColor: userColor.color,
          borderRadius: 100,
          marginTop: 10,
        }}
      >
        {props.loading && (
          <ActivityIndicator size={16} color={userColor.color} />
        )}

        {props.image ? (
          <Image
            style={{
              height: 100,
              width: 100,
              objectFit: "fill",
              borderRadius: 100,
            }}
            source={{
              uri: props.image,
            }}
            resizeMode="contain"
          />
        ) : (
          <SimpleLineIcons name="camera" size={32} color={userColor.color} />
        )}
      </Pressable>
    </View>
  );
};

export default ImageButton;
