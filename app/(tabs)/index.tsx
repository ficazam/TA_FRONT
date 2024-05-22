import { UserRole } from "@/core/enums/user-role.enum";
import { User } from "@/core/types/user.type";
import { getAuthentication } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userState);

  const handleLogin = async () => {
    try {
      const userInfo = await dispatch(
        getAuthentication({
          email: "felipeicaza@gmail.com",
          password: "Papitas123!",
        })
      ).unwrap();

      if (userInfo) {
        const loggedInUser: User = {
          name: userInfo.name,
          surname: userInfo.surname,
          status: userInfo.status,
          schoolId: userInfo.schoolId,
          id: userInfo.id,
          email: userInfo.email,
          role: userInfo.role,
          orders: userInfo.orders,
        };

        dispatch(setUser(loggedInUser));
        console.log(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("change", user.role);
    if (user.role !== UserRole.Empty) {
      console.log(user.name);

      router.navigate("/explore");
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
      <Text>Login Page</Text>
      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: "#d3d3d3",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
          borderColor: "#fff",
        }}
      >
        <Text>LOGIN</Text>
      </Pressable>
    </View>
  );
}
