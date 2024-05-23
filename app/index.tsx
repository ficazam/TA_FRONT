import { UserRole } from "@/core/enums/user-role.enum";
import { User } from "@/core/types/user.type";
import { getAuthentication } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userState);

  if (user.role !== UserRole.Empty) {
    return <Redirect href={"/(app)"} />;
  }

  const handleLogin = async () => {
    setLoading(true);

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
        router.push("/(app)");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        <ActivityIndicator size={50} color={"#d3d3d3"} />
      </View>
    );
  }

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
};

export default Login;
