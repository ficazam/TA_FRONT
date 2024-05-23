import { UserRole } from "@/core/enums/user-role.enum";
import { useUserColor } from "@/hooks/useUserColor";
import { useAppSelector } from "@/store/hooks";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RootLayout = () => {
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor(user.role);

  if (user.role === UserRole.Empty) {
    return <Redirect href={'/'} />
  }

  return (
    <View style={{ flex: 1, backgroundColor: userColor.color }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          color: "#fcfcfc",
          marginTop: 75,
        }}
      >
        {user.role.toLocaleUpperCase()}
      </Text>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: "87%",
          width: "100%",
          backgroundColor: "#fff",
          borderTopRightRadius: 18,
          borderTopLeftRadius: 18,
        }}
      >
        <Stack>
          <Stack.Screen
            name="(admin)"
            options={{ headerShown: false }}
            redirect={user.role !== UserRole.Admin}
          />
          <Stack.Screen
            name="(principal)"
            options={{ headerShown: false }}
            redirect={user.role !== UserRole.Principal}
          />
          <Stack.Screen
            name="(teacher)"
            options={{ headerShown: false }}
            redirect={user.role !== UserRole.Teacher}
          />
          <Stack.Screen
            name="(coordinator)"
            options={{ headerShown: false }}
            redirect={user.role !== UserRole.Coordinator}
          />
          <Stack.Screen
            name="(inventory)"
            options={{ headerShown: false }}
            redirect={user.role !== UserRole.Inventory}
          />
        </Stack>
      </View>
    </View>
  );
};

export default RootLayout;
