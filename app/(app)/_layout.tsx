import { UserRole } from "@/core/enums/user-role.enum";
import { useAppSelector } from "@/store/hooks";
import { Redirect, Stack } from "expo-router";
import Navigation from "@/components/navigation/Navigation";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";

const RootLayout = () => {
  const { user } = useAppSelector((state) => state.userState);

  if (user.role === UserRole.Empty) {
    return <Redirect href={"/"} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Navigation />

      <View
        style={{
          zIndex: 1,
          height: 20,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: Colors.white,
          marginTop: -20,
        }}
      />

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
  );
};

export default RootLayout;
