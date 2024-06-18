import { Colors } from "@/constants/Colors";
import { emptyUser } from "@/core/types/user.type";
import { useUserColor } from "@/hooks";
import { logout } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import ImageCircle from "../parts/ImageCircle";

const Navigation = () => {
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      dispatch(setUser(emptyUser));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: userColor.color,
        paddingTop: 75,
        maxHeight: 150,
      }}
    >
      <View style={{ position: "absolute", left: 20, top: 65 }}>
        <ImageCircle image={user.image} />
      </View>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: Colors.white,
          textAlign: "center",
        }}
      >
        {user.role.toLocaleUpperCase()}
      </Text>
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "transparent",
          borderRadius: 8,
          position: "absolute",
          right: 20,
          top: 75,
        }}
      >
        <SimpleLineIcons name="logout" size={24} color={Colors.white} />
      </Pressable>
    </View>
  );
};

export default Navigation;
