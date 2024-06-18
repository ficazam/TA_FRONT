import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";

const ImageCircle = (props: { image: string | undefined }) => {
  const { userColor } = useUserColor();
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        height: 60,
        width: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: userColor.color,
        borderRadius: 100,
      }}
    >
      {props.image ? (
        <Image
          style={{
            height: "100%",
            width: "100%",
            objectFit: "fill",
            borderRadius: 100,
          }}
          source={{ uri: props.image }}
          resizeMode="contain"
        />
      ) : (
        <SimpleLineIcons name="ghost" size={32} color={Colors.black} />
      )}
    </View>
  );
};

export default ImageCircle;
