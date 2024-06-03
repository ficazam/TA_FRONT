import Button from "@/components/input/Button";
import InputTextComponent from "@/components/input/InputTextComponent";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { Colors } from "@/constants/Colors";
import { UserRole } from "@/core/enums/user-role.enum";
import { User } from "@/core/types/user.type";
import { getAuthentication } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userState);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  if (user.role !== UserRole.Empty) {
    return <Redirect href={"/(app)"} />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError("Please complete all fields!");
      return;
    }

    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.split(".")[1].length < 2
    ) {
      setLoginError("Email isn't valid; please make sure it's a valid email!");
      return;
    }

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
          image: userInfo.image,
        };

        dispatch(setUser(loggedInUser));
        router.push("/(app)");
      }
    } catch (error: any) {
      console.error(error);
      setLoginError(error.description);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
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
      <View
        style={{
          borderStyle: "solid",
          borderRadius: 18,
          borderWidth: 1,
          minHeight: 450,
          padding: 10,
          minWidth: 350,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 32,
            fontWeight: "semibold",
            textAlign: "center",
          }}
        >
          LOGIN
        </Text>
        <View style={{ minHeight: 20 }}>
          <Text
            style={{
              color: "#ff0000",
              textAlign: "left",
              fontWeight: "semibold",
            }}
          >
            {loginError}
          </Text>
        </View>

        <InputTextComponent
          label="Email: "
          onChange={setEmail}
          placeholder="Your email"
          keyboardType="email-address"
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
