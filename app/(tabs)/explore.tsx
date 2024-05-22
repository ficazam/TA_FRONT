import { UserRole } from "@/core/enums/user-role.enum";
import { emptyUser } from "@/core/types/user.type";
import { logout } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function TabTwoScreen() {
  const { user } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      dispatch(setUser(emptyUser));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.role === UserRole.Empty) {
      router.navigate("/");
    }
  }, [user]);

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
      <Text>
        Welcome, {user.role} {user.name}
      </Text>
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#d3d3d3",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
          borderColor: "#fff",
        }}
      >
        <Text>LOGOUT</Text>
      </Pressable>
    </View>
  );
}
