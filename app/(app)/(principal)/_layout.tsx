import { Stack } from "expo-router";

const PrincipalHome = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="newStaff" options={{ headerShown: false }} />
      <Stack.Screen name="mySchool" options={{ headerShown: false }} />
      <Stack.Screen name="schoolStaff" options={{ headerShown: false }} />
      <Stack.Screen name="schoolOrders" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PrincipalHome;
