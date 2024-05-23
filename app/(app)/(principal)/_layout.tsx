import { Stack } from "expo-router";

const PrincipalHome = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PrincipalHome;
