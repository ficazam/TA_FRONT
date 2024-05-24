import Button from "@/components/input/Button";
import InputTextComponent from "@/components/input/TextInput";
import { UserRole } from "@/core/enums/user-role.enum";
import { User } from "@/core/types/user.type";
import { getAuthentication } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userState);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (user.role !== UserRole.Empty) {
    return <Redirect href={"/(app)"} />;
  }

  const handleLogin = async () => {
    setLoading(true);

    try {
      const userInfo = await dispatch(
        getAuthentication({ email, password })
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
    <KeyboardAvoidingView
      behavior="position"
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 250,
      }}
    >
      <Text
        style={{
          color: "#5f5f5f",
          fontSize: 32,
          fontWeight: "semibold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        LOGIN
      </Text>
      <View
        style={{
          borderStyle: "solid",
          borderRadius: 18,
          borderWidth: 1,
          minHeight: 250,
          padding: 10,
          minWidth: 350,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <InputTextComponent
          label="Email: "
          onChange={setEmail}
          placeholder="Your email"
          value={email}
        />
        <InputTextComponent
          label="Password: "
          onChange={setPassword}
          placeholder="Your password"
          value={password}
          isPassword={true}
        />
        <Button buttonTitle="LOGIN" onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
